import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "Free",
    sub: "forever",
    description: "For solo devs and small experiments.",
    cta: "Get started",
    ctaStyle: "border",
    features: [
      "Up to 3 projects",
      "AI code review (50 PRs/mo)",
      "Basic dashboard",
      "Community support",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "$29",
    sub: "per seat / month",
    description: "For growing teams that ship constantly.",
    cta: "Start free trial",
    ctaStyle: "primary",
    features: [
      "Unlimited projects",
      "Unlimited AI code reviews",
      "Unified dashboard + metrics",
      "In-line editor suggestions",
      "One-click deploys",
      "Priority email support",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    sub: "volume pricing",
    description: "For organizations with security & compliance needs.",
    cta: "Talk to sales",
    ctaStyle: "border",
    features: [
      "Everything in Pro",
      "SSO & SAML",
      "RBAC & audit logs",
      "SOC 2 compliance docs",
      "Dedicated Slack channel",
      "SLA guarantee",
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
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Pricing</p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Simple, transparent pricing.
          </h2>
          <p className="mt-4 text-muted-foreground text-base">No hidden fees. Cancel anytime.</p>
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
