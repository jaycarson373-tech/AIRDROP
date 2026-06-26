import { ArrowRight } from "lucide-react"

export function CtaSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background graphic - raining coins */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_4_2026-06-26_13-20-12-Blp02OZQT88HLGZ9i2O792eiK81IWu.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="mx-auto max-w-3xl px-6 text-center relative z-10">
        {/* Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 h-64 w-96 rounded-full blur-3xl"
          style={{ background: "oklch(0.76 0.18 195 / 8%)" }}
        />

        <h2 className="relative text-balance text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
          Stop waiting for Pump to drop it.
        </h2>
        <p className="relative mt-6 text-lg leading-relaxed text-muted-foreground">
          $AIRDROP makes the rain. Buy, hold, and earn real PUMP tokens every 5 minutes. Forever.
        </p>
        <div className="relative mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="group flex items-center gap-2 rounded-md bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Get $AIRDROP Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            View contract on-chain
          </a>
        </div>
      </div>
    </section>
  )
}
