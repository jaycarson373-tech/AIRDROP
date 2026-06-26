const logos = [
  "Stripe",
  "Notion",
  "Linear",
  "Figma",
  "Vercel",
  "GitHub",
  "Slack",
  "Retool",
  "Loom",
  "Intercom",
]

export function LogoTicker() {
  const doubled = [...logos, ...logos]

  return (
    <section className="border-y border-border py-10 overflow-hidden">
      <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground mb-8">
        Trusted by teams at
      </p>
      <div className="relative flex overflow-hidden">
        {/* Left fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{ background: "linear-gradient(to right, var(--background), transparent)" }}
        />
        {/* Right fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{ background: "linear-gradient(to left, var(--background), transparent)" }}
        />

        <div className="flex animate-ticker gap-16 whitespace-nowrap" aria-hidden="true">
          {doubled.map((name, i) => (
            <span
              key={i}
              className="text-sm font-semibold tracking-tight text-muted-foreground hover:text-foreground transition-colors cursor-default select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
