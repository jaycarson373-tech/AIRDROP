import { CtaSection } from "@/components/cta-section"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { LogoTicker } from "@/components/logo-ticker"
import { Navbar } from "@/components/navbar"
import { Pricing } from "@/components/pricing"
import { Stats } from "@/components/stats"
import { Testimonials } from "@/components/testimonials"

export default function Page() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <LogoTicker />
        <Stats />
        <Features />
        <Testimonials />
        <Pricing />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
