export const dynamic = "force-dynamic"

type EpochRow = {
  epoch_id: string
  status: string
  eligible_count: number | null
  mcdx_bought: string | number | null
  mcdx_distributed: string | number | null
  started_at: string | null
  completed_at: string | null
  error: string | null
}

type BuyRow = {
  epoch_id: string
  base_spent: string | number | null
  mcdx_received: string | number | null
  tx_sig: string | null
  created_at: string | null
}

type PayoutRow = {
  epoch_id: string
  wallet: string
  mcdx_amount: string | number | null
  status: string
  tx_sig: string | null
  updated_at: string | null
}

type DashboardState = {
  configured: boolean
  error: string | null
  epochs: EpochRow[]
  buys: BuyRow[]
  payouts: PayoutRow[]
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "")
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const REWARD_SYMBOL = "PUMP"
const SOURCE_SYMBOL = "AIRDROP"
const REWARD_DECIMALS = 6
const SOL_DECIMALS = 9
const EPOCH_MS = 5 * 60 * 1000

async function fetchTable<T>(path: string): Promise<T[]> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return []

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    cache: "no-store",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`Supabase read failed: ${response.status} ${detail}`)
  }

  return response.json() as Promise<T[]>
}

async function loadDashboard(): Promise<DashboardState> {
  const configured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
  if (!configured) {
    return { configured, error: null, epochs: [], buys: [], payouts: [] }
  }

  try {
    const [epochs, buys, payouts] = await Promise.all([
      fetchTable<EpochRow>(
        "epochs?select=epoch_id,status,eligible_count,mcdx_bought,mcdx_distributed,started_at,completed_at,error&order=epoch_id.desc&limit=200",
      ),
      fetchTable<BuyRow>("buys?select=epoch_id,base_spent,mcdx_received,tx_sig,created_at&order=created_at.desc&limit=20"),
      fetchTable<PayoutRow>(
        "payouts?select=epoch_id,wallet,mcdx_amount,status,tx_sig,updated_at&order=updated_at.desc&limit=30",
      ),
    ])

    return { configured, error: null, epochs, buys, payouts }
  } catch (error) {
    return {
      configured,
      error: error instanceof Error ? error.message : String(error),
      epochs: [],
      buys: [],
      payouts: [],
    }
  }
}

function numeric(value: unknown): number {
  const result = Number(value ?? 0)
  return Number.isFinite(result) ? result : 0
}

function formatRawToken(value: unknown, maximumFractionDigits = 2) {
  const amount = numeric(value) / 10 ** REWARD_DECIMALS
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
    minimumFractionDigits: amount > 0 && amount < 1 ? 4 : 0,
  }).format(amount)
}

function formatLamports(value: unknown) {
  const amount = numeric(value) / 10 ** SOL_DECIMALS
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 4,
    minimumFractionDigits: amount > 0 && amount < 1 ? 3 : 0,
  }).format(amount)
}

function formatInteger(value: unknown) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(numeric(value))
}

function formatTime(value: string | null | undefined) {
  if (!value) return "Pending"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "Pending"
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date)
}

function nextEpochLabel() {
  const next = Math.ceil(Date.now() / EPOCH_MS) * EPOCH_MS
  return formatTime(new Date(next).toISOString())
}

function shortAddress(value: string | null | undefined) {
  if (!value) return "Pending"
  if (value.length <= 12) return value
  return `${value.slice(0, 4)}...${value.slice(-4)}`
}

function statusClass(status: string | null | undefined) {
  switch (status) {
    case "completed":
    case "settled":
      return "border-emerald-400/25 bg-emerald-400/10 text-emerald-200"
    case "running":
    case "planned":
      return "border-cyan-400/25 bg-cyan-400/10 text-cyan-200"
    case "skipped":
    case "dry_run":
      return "border-amber-400/25 bg-amber-400/10 text-amber-200"
    case "failed":
      return "border-red-400/25 bg-red-400/10 text-red-200"
    default:
      return "border-white/10 bg-white/5 text-muted-foreground"
  }
}

function solscanTx(txSig: string | null | undefined) {
  return txSig ? `https://solscan.io/tx/${txSig}` : null
}

function StatCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-2xl shadow-black/20">
      <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
    </div>
  )
}

function StatusPill({ status }: { status: string | null | undefined }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${statusClass(status)}`}>
      {status ?? "unknown"}
    </span>
  )
}

function EmptyState({ configured, error }: { configured: boolean; error: string | null }) {
  if (error) {
    return (
      <div className="rounded-2xl border border-red-400/20 bg-red-400/10 p-5 text-sm text-red-100">
        <p className="font-semibold">Supabase is connected, but the dashboard could not read the tables.</p>
        <p className="mt-2 break-words text-red-100/80">{error}</p>
      </div>
    )
  }

  if (!configured) {
    return (
      <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5 text-sm text-amber-100">
        <p className="font-semibold">Add the two public Supabase envs in Vercel to turn on live data.</p>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-black/35 p-4 text-xs text-amber-50">
{`NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=`}
        </pre>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-card/70 p-5 text-sm text-muted-foreground">
      No epochs yet. Once Railway runs the worker, this page will fill itself from Supabase.
    </div>
  )
}

export default async function Page() {
  const { configured, error, epochs, buys, payouts } = await loadDashboard()
  const latestEpoch = epochs[0]
  const latestBuy = buys[0]
  const totalBought = epochs.reduce((sum, epoch) => sum + numeric(epoch.mcdx_bought), 0)
  const totalDistributed = epochs.reduce((sum, epoch) => sum + numeric(epoch.mcdx_distributed), 0)
  const completedEpochs = epochs.filter((epoch) => epoch.status === "completed").length
  const settledPayouts = payouts.filter((payout) => payout.status === "settled")

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(circle at 20% 10%, oklch(0.76 0.18 195 / 18%), transparent 28%), radial-gradient(circle at 80% 0%, oklch(0.7 0.2 300 / 12%), transparent 30%), linear-gradient(oklch(1 0 0 / 4%) 1px, transparent 1px), linear-gradient(to right, oklch(1 0 0 / 4%) 1px, transparent 1px)",
          backgroundSize: "auto, auto, 48px 48px, 48px 48px",
        }}
      />

      <header className="sticky top-0 z-30 border-b border-border bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-3 font-semibold">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-06-26_11-17-49-ADRvjT68NPxLVR2NMQ9uDY6gseZBdU.jpg"
              alt="Where Is The Airdrop"
              className="h-9 w-9 rounded-full border border-white/10"
            />
            <span>$AIRDROP</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#dashboard" className="transition hover:text-foreground">Dashboard</a>
            <a href="#proof" className="transition hover:text-foreground">Proof</a>
            <a href="#how" className="transition hover:text-foreground">How it works</a>
          </nav>
          <a href="#proof" className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Live every 5 min
          </a>
        </div>
      </header>

      <main id="top" className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-16 md:pt-24">
        <section className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Pump rewards for holders
            </div>
            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold tracking-tight md:text-7xl">
              Where is the airdrop?
              <span className="block text-primary">Right here, every 5 minutes.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Creator fees buy {REWARD_SYMBOL} and send it to the top 50 eligible ${SOURCE_SYMBOL} holders. Wallets over 5% are excluded, and every settled payout links back to Solscan.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#dashboard" className="rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                View live stats
              </a>
              <a href="#proof" className="rounded-full border border-border px-6 py-3 text-center text-sm font-semibold text-foreground transition hover:bg-surface">
                Check proof
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card/80 p-6 shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="text-sm text-muted-foreground">Latest epoch</p>
                <p className="mt-1 font-mono text-sm text-foreground">{latestEpoch?.epoch_id ?? "Waiting for first run"}</p>
              </div>
              <StatusPill status={latestEpoch?.status ?? (configured ? "pending" : "setup")} />
            </div>
            <div className="grid gap-4 py-5 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Next drop window</p>
                <p className="mt-2 text-lg font-semibold">{nextEpochLabel()}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Eligible holders</p>
                <p className="mt-2 text-lg font-semibold">{latestEpoch ? formatInteger(latestEpoch.eligible_count) : "0"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Last buy</p>
                <p className="mt-2 text-lg font-semibold">
                  {latestBuy ? `${formatRawToken(latestBuy.mcdx_received)} ${REWARD_SYMBOL}` : "Pending"}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">SOL spent</p>
                <p className="mt-2 text-lg font-semibold">{latestBuy ? `${formatLamports(latestBuy.base_spent)} SOL` : "Pending"}</p>
              </div>
            </div>
            <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-muted-foreground">
              Railway runs the worker. Supabase stores epochs, buys, and payouts. This page only reads public dashboard data.
            </p>
          </div>
        </section>

        <section id="dashboard" className="mt-14 grid gap-4 md:grid-cols-4">
          <StatCard label="Total bought" value={`${formatRawToken(totalBought)} ${REWARD_SYMBOL}`} detail="From completed and recorded epochs" />
          <StatCard label="Total airdropped" value={`${formatRawToken(totalDistributed)} ${REWARD_SYMBOL}`} detail="Raw payouts converted for display" />
          <StatCard label="Epochs loaded" value={formatInteger(completedEpochs)} detail="Recent completed epochs from Supabase" />
          <StatCard label="Recent settled" value={formatInteger(settledPayouts.length)} detail="Latest payout rows with tx proof" />
        </section>

        {(error || !configured || epochs.length === 0) && (
          <section className="mt-6">
            <EmptyState configured={configured} error={error} />
          </section>
        )}

        <section className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-border bg-card/80 p-5 shadow-2xl shadow-black/20">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Epoch tape</h2>
                <p className="mt-1 text-sm text-muted-foreground">The newest 5-minute runs from the worker.</p>
              </div>
              <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">auto refresh on load</span>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[680px] text-left text-sm">
                <thead className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <tr>
                    <th className="py-3 pr-4 font-medium">Epoch</th>
                    <th className="py-3 pr-4 font-medium">Status</th>
                    <th className="py-3 pr-4 font-medium">Eligible</th>
                    <th className="py-3 pr-4 font-medium">Bought</th>
                    <th className="py-3 pr-4 font-medium">Dropped</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {epochs.slice(0, 10).map((epoch) => (
                    <tr key={epoch.epoch_id} className="text-foreground">
                      <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{formatTime(epoch.epoch_id)}</td>
                      <td className="py-3 pr-4"><StatusPill status={epoch.status} /></td>
                      <td className="py-3 pr-4">{formatInteger(epoch.eligible_count)}</td>
                      <td className="py-3 pr-4">{formatRawToken(epoch.mcdx_bought)} {REWARD_SYMBOL}</td>
                      <td className="py-3 pr-4">{formatRawToken(epoch.mcdx_distributed)} {REWARD_SYMBOL}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div id="how" className="rounded-3xl border border-border bg-card/80 p-6 shadow-2xl shadow-black/20">
            <h2 className="text-xl font-semibold tracking-tight">How rewards are picked</h2>
            <div className="mt-6 space-y-4">
              {[
                ["1", "Claim", "Creator fees are collected by the Railway worker when claiming is enabled."],
                ["2", "Buy", "Treasury SOL swaps into PUMP while keeping the gas reserve untouched."],
                ["3", "Snapshot", "The worker finds holders with at least 1,000,000 AIRDROP and excludes 5%+ wallets."],
                ["4", "Airdrop", "The top 50 eligible holders receive PUMP proportionally by holder balance."],
              ].map(([step, title, body]) => (
                <div key={step} className="flex gap-4 rounded-2xl border border-border bg-background/45 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{step}</div>
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="proof" className="mt-14 rounded-3xl border border-border bg-card/80 p-5 shadow-2xl shadow-black/20">
          <div className="flex flex-col justify-between gap-4 border-b border-border pb-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Latest payout proof</h2>
              <p className="mt-1 text-sm text-muted-foreground">Wallets, amounts, and Solscan transaction links from recent payout rows.</p>
            </div>
            <p className="text-sm text-muted-foreground">Showing newest 30 rows</p>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <tr>
                  <th className="py-3 pr-4 font-medium">Wallet</th>
                  <th className="py-3 pr-4 font-medium">Amount</th>
                  <th className="py-3 pr-4 font-medium">Status</th>
                  <th className="py-3 pr-4 font-medium">Updated</th>
                  <th className="py-3 pr-4 font-medium">Proof</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {payouts.map((payout) => {
                  const txLink = solscanTx(payout.tx_sig)
                  return (
                    <tr key={`${payout.epoch_id}:${payout.wallet}`}>
                      <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{shortAddress(payout.wallet)}</td>
                      <td className="py-3 pr-4">{formatRawToken(payout.mcdx_amount, 4)} {REWARD_SYMBOL}</td>
                      <td className="py-3 pr-4"><StatusPill status={payout.status} /></td>
                      <td className="py-3 pr-4 text-muted-foreground">{formatTime(payout.updated_at)}</td>
                      <td className="py-3 pr-4">
                        {txLink ? (
                          <a href={txLink} target="_blank" rel="noreferrer" className="text-primary underline-offset-4 hover:underline">
                            Solscan
                          </a>
                        ) : (
                          <span className="text-muted-foreground">Pending</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}
