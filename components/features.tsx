import { Gift, TrendingUp, Lock, Clock, Zap, Coins } from "lucide-react"

const features = [
  {
    icon: Gift,
    title: "Automatic Airdrops",
    description:
      "Every 5 minutes, $AIRDROP purchases real PUMP tokens and distributes them to top 50 holders. No claims needed.",
    badge: "Core",
  },
  {
    icon: TrendingUp,
    title: "Sustainable Rewards",
    description:
      "Creator fees fuel the system forever. As more people buy and sell, the airdrop pool grows. It&apos;s self-sustaining.",
    badge: null,
  },
  {
    icon: Lock,
    title: "Transparent On-Chain",
    description:
      "Every transaction is verifiable on-chain. Watch your rewards get bought and distributed in real-time.",
    badge: null,
  },
  {
    icon: Clock,
    title: "Passive Income",
    description:
      "Hold tokens, earn rewards. No staking, no lockups, no minimum. Just buy and watch the drops roll in.",
    badge: "Live",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Drops execute every 300 seconds like clockwork. You never miss a reward window—it&apos;s all automatic.",
    badge: null,
  },
  {
    icon: Coins,
    title: "Real PUMP Tokens",
    description:
      "Not vouchers, not IOUs. You get actual PUMP tokens sent to your wallet. Full control, full custody.",
    badge: null,
  },
]

export function Features() {
  return (
    <section className="py-24 border-b border-border">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">How It Works</p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Real rewards. Real tokens. Real easy.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3 rounded-xl overflow-hidden">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <article
                key={f.title}
                className="group relative bg-background p-8 flex flex-col gap-4 hover:bg-surface transition-colors"
              >
                {/* Icon */}
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-muted text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Badge */}
                {f.badge && (
                  <span className="absolute top-6 right-6 rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {f.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
