const stats = [
  { value: "10x", label: "Faster deployment cycles" },
  { value: "98%", label: "Customer satisfaction score" },
  { value: "3.2B", label: "Tasks completed this year" },
  { value: "<50ms", label: "Average API response time" },
]

export function Stats() {
  return (
    <section className="py-20 border-b border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="bg-background p-8 md:p-10 flex flex-col gap-2">
              <span className="text-4xl font-semibold tracking-tight text-primary">{s.value}</span>
              <span className="text-sm text-muted-foreground leading-relaxed">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
