"use client"

import React from "react"

import { useEffect, useRef, useState } from "react"

const education = [
  {
    degree: "PGDM - Finance & Analytics",
    school: "Jagdish Sheth School of Management (JAGSOM)",
    location: "India",
    period: "2022 - 2024",
    grade: "CGPA: 7.0",
  },
  {
    degree: "B.A. English Honours",
    school: "Vinoba Bhave University",
    location: "Jharkhand, India",
    period: "2017 - 2020",
    grade: "CGPA: 7.04",
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

export function EducationSection() {
  return (
    <section id="education" className="relative py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <AnimatedCard>
          <div className="mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Academic</span>
            <h2
              className="mt-2 text-3xl font-bold text-foreground md:text-4xl text-balance"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Education
            </h2>
            <div className="mt-3 h-1 w-16 rounded-full bg-primary" />
          </div>
        </AnimatedCard>

        <div className="grid gap-6 md:grid-cols-2">
          {education.map((edu, idx) => (
            <AnimatedCard key={edu.degree} delay={idx * 150}>
              <div className="group glass-card rounded-xl p-6 transition-all duration-300 hover:glow-amber animated-border h-full">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    {edu.period}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-1">{edu.degree}</h3>
                <p className="text-sm font-medium text-primary mb-2">{edu.school}</p>
                <p className="text-xs text-muted-foreground mb-3">{edu.location}</p>

                <div className="inline-flex items-center gap-2 rounded-lg bg-accent/10 px-3 py-1.5 border border-accent/20">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-xs font-semibold text-accent">{edu.grade}</span>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  )
}
