import { ArrowRight, Play } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      {/* Grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 4%) 1px, transparent 1px), linear-gradient(to right, oklch(1 0 0 / 4%) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3 h-[600px] w-[800px] rounded-full"
        style={{ background: "radial-gradient(ellipse at center, oklch(0.76 0.18 195 / 12%) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground font-medium">Now in public beta &mdash; free forever</span>
        </div>

        {/* Headline */}
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-foreground md:text-7xl leading-[1.08]">
          Your team ships
          <br />
          <span className="text-primary">10x faster.</span>
          <br />
          No excuses.
        </h1>

        {/* Subheading */}
        <p className="mt-6 mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Veloce connects your code, tasks, and docs into one AI-powered workspace. Stop context-switching. Start shipping.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="group flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Start building free
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#"
            className="flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium text-foreground hover:bg-surface transition-colors"
          >
            <Play className="h-4 w-4 text-primary" />
            Watch 2-min demo
          </a>
        </div>

        {/* Social proof blurb */}
        <p className="mt-8 text-xs text-muted-foreground">
          Trusted by <span className="text-foreground font-medium">4,200+</span> engineering teams worldwide
        </p>
      </div>
    </section>
  )
}
