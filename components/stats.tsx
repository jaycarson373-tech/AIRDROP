const stats = [
  { value: "∞", label: "Drops every 5 minutes" },
  { value: "100%", label: "Community owned & governed" },
  { value: "$PUMP", label: "Real tokens, not promises" },
  { value: "0%", label: "Buy tax on $AIRDROP" },
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
