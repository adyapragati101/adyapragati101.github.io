"use client"

import { useEffect, useState } from "react"
import { InteractiveAvatar } from "./interactive-avatar"

export function HeroSection() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Decorative grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(40 65% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(40 65% 55%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-20">
        {/* Left content */}
        <div
          className={`flex-1 transition-all duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs font-medium text-primary">Available for Opportunities</span>
          </div>

          <h1
            className="mb-4 text-4xl font-bold leading-tight text-foreground md:text-6xl text-balance"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Adya Pragati
          </h1>

          <p
            className="mb-6 text-xl font-medium text-primary md:text-2xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Credit & Rating Analyst
          </p>

          <p className="mb-8 max-w-lg text-base leading-relaxed text-muted-foreground">
            Credit Analyst with hands-on experience in credit ratings, TEV studies,
            financial modelling, and surveillance support across MSME and mid-corporate segments.
            Adept at cash flow-based credit assessment, industry and management risk analysis.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 glow-amber"
            >
              Get in Touch
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <a
              href="#experience"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-secondary"
            >
              View Experience
            </a>
          </div>

          {/* Quick stats */}
          <div className="mt-10 flex gap-8">
            {[
              { value: "2+", label: "Years Exp" },
              { value: "200Cr+", label: "Project Size" },
              { value: "PGDM", label: "Finance" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-primary" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Avatar */}
        <div
          className={`flex-shrink-0 transition-all delay-200 duration-700 ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <div className="relative">
            <InteractiveAvatar size={280} />
            {/* Floating badges around avatar */}
            <div className="absolute -left-4 top-8 animate-float rounded-lg glass-card px-3 py-2 text-xs font-medium text-primary">
              SEBI CRA
            </div>
            <div
              className="absolute -right-4 top-1/2 animate-float rounded-lg glass-card px-3 py-2 text-xs font-medium text-accent"
              style={{ animationDelay: "1s" }}
            >
              TEV Studies
            </div>
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 animate-float rounded-lg glass-card px-3 py-2 text-xs font-medium text-foreground"
              style={{ animationDelay: "2s" }}
            >
              Financial Modelling
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-muted-foreground">Scroll</span>
          <div className="h-8 w-5 rounded-full border border-muted-foreground/30 p-1">
            <div className="h-2 w-1.5 mx-auto rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}
