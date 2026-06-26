import { BrainCircuit, GitMerge, LayoutDashboard, MessageSquareCode, ShieldCheck, Zap } from "lucide-react"

const features = [
  {
    icon: BrainCircuit,
    title: "AI-native workspace",
    description:
      "Every action — write, review, deploy — is powered by context-aware AI that understands your codebase end to end.",
    badge: "Core",
  },
  {
    icon: GitMerge,
    title: "Auto PR reviews",
    description:
      "Catch bugs, style issues, and security holes before they reach main. Veloce reviews every pull request in seconds.",
    badge: null,
  },
  {
    icon: LayoutDashboard,
    title: "Unified dashboard",
    description:
      "Tasks, deploys, incidents, and metrics in one place. No more tab-switching between five tools just to ship one feature.",
    badge: null,
  },
  {
    icon: MessageSquareCode,
    title: "In-line suggestions",
    description:
      "Real-time code suggestions inside your editor, powered by your own repo history — not generic LLM training data.",
    badge: "Beta",
  },
  {
    icon: ShieldCheck,
    title: "Zero-trust security",
    description:
      "SOC 2 Type II certified. All data encrypted at rest and in transit. SSO, RBAC, and audit logs included on every plan.",
    badge: null,
  },
  {
    icon: Zap,
    title: "One-click deploys",
    description:
      "Push to any cloud provider in under 30 seconds with automatic rollbacks if anything goes sideways.",
    badge: "New",
  },
]

export function Features() {
  return (
    <section className="py-24 border-b border-border">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Features</p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Everything your team needs. Nothing it doesn&apos;t.
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
