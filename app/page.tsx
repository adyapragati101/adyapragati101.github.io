import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ExperienceSection } from "@/components/experience-section"
import { SkillsSection } from "@/components/skills-section"
import { EducationSection } from "@/components/education-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ParticleBackground } from "@/components/particle-background"
import { CursorGlow } from "@/components/cursor-glow"

export default function Page() {
  return (
    <>
      <ParticleBackground />
      <CursorGlow />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        {/* Divider */}
        <div className="mx-auto max-w-4xl px-6">
          <div className="h-px bg-border" />
        </div>
        <ExperienceSection />
        <div className="mx-auto max-w-4xl px-6">
          <div className="h-px bg-border" />
        </div>
        <SkillsSection />
        <div className="mx-auto max-w-4xl px-6">
          <div className="h-px bg-border" />
        </div>
        <EducationSection />
        <div className="mx-auto max-w-4xl px-6">
          <div className="h-px bg-border" />
        </div>
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
