const testimonials = [
  {
    quote:
      "We cut our release cycle from two weeks to two days. Veloce is the reason our team feels unstoppable.",
    author: "Sarah Kim",
    role: "CTO at Arcflow",
    initials: "SK",
  },
  {
    quote:
      "The AI review caught a critical auth bug before it went live. That alone paid for the entire year.",
    author: "Marcus Webb",
    role: "Staff Engineer at Draftbit",
    initials: "MW",
  },
  {
    quote:
      "Finally, a tool that actually talks to the rest of our stack instead of living in a silo.",
    author: "Priya Nair",
    role: "Head of Platform, Lumen",
    initials: "PN",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 border-b border-border">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">What people say</p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Real teams. Real results.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.author}
              className="relative rounded-xl border border-border bg-card p-8 flex flex-col gap-6"
            >
              {/* Stars */}
              <div className="flex gap-1" aria-label="5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-4 w-4 fill-primary" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.062 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.957z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm leading-relaxed text-muted-foreground flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <figcaption className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
