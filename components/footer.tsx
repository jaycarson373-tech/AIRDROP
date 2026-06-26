const cols = [
  {
    heading: "Protocol",
    links: ["How it Works", "Tokenomics", "Roadmap", "Whitepaper"],
  },
  {
    heading: "Community",
    links: ["Discord", "Twitter", "Telegram", "Medium"],
  },
  {
    heading: "Resources",
    links: ["Contract", "Charts", "Dashboard", "Support"],
  },
  {
    heading: "Legal",
    links: ["Privacy", "Terms", "Security", "Disclaimers"],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border pt-16 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-10 md:flex-row md:gap-0">
          {/* Brand */}
          <div className="md:w-64 shrink-0">
            <a href="#" className="flex items-center gap-2 text-foreground font-semibold">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-06-26_11-17-49-ADRvjT68NPxLVR2NMQ9uDY6gseZBdU.jpg"
                alt="$AIRDROP"
                className="h-7 w-7 rounded-full"
              />
              $AIRDROP
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-xs">
              Where Pump said soon. Real PUMP tokens. Every 5 minutes. Forever.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 md:flex md:flex-1 md:justify-end md:gap-16">
            {cols.map((col) => (
              <div key={col.heading}>
                <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-4">{col.heading}</p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} $AIRDROP. All rewards reserved.</p>
          <p>Where Pump said soon. We made it real.</p>
        </div>
      </div>
    </footer>
  )
}
