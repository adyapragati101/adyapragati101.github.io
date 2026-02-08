"use client"

import React from "react"

import { useEffect, useRef, useState } from "react"

const skillCategories = [
  {
    title: "Credit & Risk",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    skills: [
      "Credit Rating Methodology",
      "Risk Assessment",
      "TEV Studies",
      "Due Diligence",
      "DSCR Analysis",
      "Covenant Monitoring",
    ],
    color: "primary",
  },
  {
    title: "Financial Analysis",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
    skills: [
      "Financial Statement Analysis",
      "Cash Flow Analysis",
      "Ratio Analysis",
      "Profitability Assessment",
      "Cost Diagnostics",
      "Competitive Analysis",
    ],
    color: "accent",
  },
  {
    title: "Surveillance",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    skills: [
      "Rating Surveillance",
      "Stress Testing",
      "Performance Variance",
      "Data Validation",
      "SEBI CRA Compliance",
      "Sensitivity Analysis",
    ],
    color: "primary",
  },
  {
    title: "Modelling & Tools",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <path d="M3 9h18" />
        <path d="M3 15h18" />
        <path d="M9 3v18" />
        <path d="M15 3v18" />
      </svg>
    ),
    skills: [
      "Financial Modelling",
      "Advanced Excel",
      "Scenario Analysis",
      "Forecasting",
      "Project Finance Models",
      "Valuation Models",
    ],
    color: "accent",
  },
]

function AnimatedCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 px-6">
      {/* Background accent */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, hsl(40 65% 55%) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(185 60% 45%) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <AnimatedCard>
          <div className="mb-16 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Expertise</span>
            <h2
              className="mt-2 text-3xl font-bold text-foreground md:text-4xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Core Skills
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-primary" />
          </div>
        </AnimatedCard>

        <div className="grid gap-6 md:grid-cols-2">
          {skillCategories.map((category, idx) => (
            <AnimatedCard key={category.title} delay={idx * 100}>
              <div className="group glass-card rounded-xl p-6 transition-all duration-300 hover:glow-amber h-full">
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      category.color === "primary"
                        ? "bg-primary/10 text-primary"
                        : "bg-accent/10 text-accent"
                    }`}
                  >
                    {category.icon}
                  </div>
                  <h3
                    className="text-lg font-bold text-foreground"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 group-hover:scale-[1.02] ${
                        category.color === "primary"
                          ? "bg-primary/10 text-primary border border-primary/10"
                          : "bg-accent/10 text-accent border border-accent/10"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  )
}
