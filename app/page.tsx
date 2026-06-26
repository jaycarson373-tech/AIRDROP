import { CtaSection } from "@/components/cta-section"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { Navbar } from "@/components/navbar"
import { Stats } from "@/components/stats"

export default function Page() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
