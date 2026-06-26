import { Check } from "lucide-react"

const plans = [
  {
    name: "Holder",
    price: "0%",
    sub: "buy tax",
    description: "Buy $AIRDROP with zero fees.",
    cta: "Buy Now",
    ctaStyle: "border",
    features: [
      "Zero buy tax",
      "5-minute airdrops",
      "Full PUMP rewards",
      "On-chain transparency",
    ],
    highlight: false,
  },
  {
    name: "Top 50",
    price: "2x",
    sub: "rewards",
    description: "The top 50 holders earn double drops.",
    cta: "Stake Now",
    ctaStyle: "primary",
    features: [
      "2x drop multiplier",
      "Priority distributions",
      "Governance voting",
      "Exclusive holder perks",
      "Leaderboard recognition",
      "Community benefits",
    ],
    highlight: true,
  },
  {
    name: "Liquidity",
    price: "2%",
    sub: "sell tax",
    description: "Fee structure supports the ecosystem.",
    cta: "View Pair",
    ctaStyle: "border",
    features: [
      "2% sell tax to treasury",
      "Funds future airdrops",
      "Liquidity protection",
      "Community vote on use",
      "Full audit transparency",
      "Anti-rug guarantees",
    ],
    highlight: false,
  },
]

export function Pricing() {
  return (
    <section className="py-24 border-b border-border">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Tokenomics</p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Built to reward holders.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-xl border p-8 ${
                p.highlight
                  ? "border-primary bg-card shadow-[0_0_40px_-4px_oklch(0.76_0.18_195_/_20%)]"
                  : "border-border bg-card"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                  Most popular
                </span>
              )}

              <div className="mb-6">
                <p className="text-sm font-medium text-muted-foreground mb-1">{p.name}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold tracking-tight text-foreground">{p.price}</span>
                  {p.price !== "Custom" && (
                    <span className="mb-1 text-xs text-muted-foreground">{p.sub}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              </div>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className={`w-full rounded-md py-3 text-center text-sm font-semibold transition-opacity ${
                  p.ctaStyle === "primary"
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-border text-foreground hover:bg-surface"
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
