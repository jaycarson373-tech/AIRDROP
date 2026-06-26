import { Zap } from "lucide-react"

const cols = [
  {
    heading: "Product",
    links: ["Features", "Pricing", "Changelog", "Roadmap"],
  },
  {
    heading: "Developers",
    links: ["Documentation", "API Reference", "Status", "Open Source"],
  },
  {
    heading: "Company",
    links: ["About", "Blog", "Careers", "Press kit"],
  },
  {
    heading: "Legal",
    links: ["Privacy", "Terms", "Security", "Cookies"],
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
              <span className="flex h-7 w-7 items-center justify-center rounded bg-primary">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </span>
              Veloce
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-xs">
              The AI-powered workspace for engineering teams who refuse to slow down.
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
          <p>&copy; {new Date().getFullYear()} Veloce, Inc. All rights reserved.</p>
          <p>Built for the teams that build everything else.</p>
        </div>
      </div>
    </footer>
  )
}
