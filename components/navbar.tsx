"use client"

import { useState } from "react"
import { Menu, X, ExternalLink } from "lucide-react"

const links = ["How It Works", "Dashboard", "Timeline", "Viral Tweets"]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-semibold text-foreground">
          <img 
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-06-26_11-17-49-ADRvjT68NPxLVR2NMQ9uDY6gseZBdU.jpg"
            alt="Where Is The Airdrop"
            className="h-8 w-8 rounded-full"
          />
          <span className="text-base tracking-tight">$AIRDROP</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </nav>

        {/* Social + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={`https://x.com/search?q=${process.env.NEXT_PUBLIC_AIRDROP_CA || 'airdrop'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="X (Twitter)"
            title="Follow on X"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 11-11.858 10.318 10 10 0 0111.858-10.318z" />
              <path d="M8 16.5c0-.667.333-1.333 1-2s1.333-.667 2-1 1.333.667 2 1 1 1.333 1 2m6-2c0-1.5-1-2.5-2-3s-2 .5-3 1.5" />
            </svg>
          </a>
          <a
            href={`https://solscan.io/token/${process.env.NEXT_PUBLIC_AIRDROP_CA}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Contract Address"
            title="View on Solscan"
          >
            <code className="text-xs font-mono bg-surface px-2 py-1 rounded">{process.env.NEXT_PUBLIC_AIRDROP_CA?.slice(0, 4)}...{process.env.NEXT_PUBLIC_AIRDROP_CA?.slice(-4)}</code>
          </a>
          <a
            href="/dashboard"
            className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            View Dashboard
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-muted-foreground hover:text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {l}
            </a>
          ))}
          <a
            href="/dashboard"
            className="mt-2 rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
          >
            View Dashboard
          </a>
        </div>
      )}
    </header>
  )
}
