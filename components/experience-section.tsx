"use client"

import React from "react"

import { useEffect, useRef, useState } from "react"

interface ExperienceItem {
  title: string
  company: string
  period: string
  description: string[]
  highlight?: string
  highlightItems?: string[]
}

const experiences: ExperienceItem[] = [
  {
    title: "Rating Analyst - Credit & Risk Assessment",
    company: "Infomerics Analytics & Ratings India",
    period: "Dec 2024 - Present",
    description: [
      "Conducted Techno-Economic Viability (TEV) studies, due diligence, cost vetting, and grading assignments for MSME and mid-corporate borrowers.",
      "Performed financial modelling, cash flow analysis, DSCR-based assessment, industry evaluation, scenario-based analysis, and management risk analysis.",
      "Prepared credit rating notes and analytical rationales in accordance with SEBI CRA methodologies and supported rating committee discussions.",
      "Assisted in rating surveillance, covenant monitoring, and performance variance analysis.",
    ],
    highlight: "Real Estate Project Finance Experience",
    highlightItems: [
      "Worked on large-scale commercial and residential real estate projects with individual project sizes exceeding 200 crore.",
      "Developed detailed project-level financial models covering construction phase cash flows, funding mix, sales assumptions, and stress scenarios.",
      "Carried out comprehensive credit assessment, including sponsor strength evaluation, project structure review, and risk mitigants.",
      "Performed advanced management assessment and assessed Cost of Development (COD), construction progress, and project milestones.",
    ],
  },
  {
    title: "Financial Analyst",
    company: "EasyEdge Infotech Pvt. Ltd.",
    period: "Oct 2023 - Sep 2024",
    description: [
      "Built Excel-based financial models and performed detailed financial and competitive analysis for valuation and strategic review assignments.",
      "Conducted ratio analysis, profitability assessment, and cost diagnostics to identify inefficiencies and improvement opportunities.",
      "Supported senior analysts in advanced modelling, forecasting, and reporting for client presentations.",
      "Streamlined financial reports to enhance clarity, consistency, and decision-making effectiveness.",
    ],
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

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 px-6">
      <div className="mx-auto max-w-4xl">
        <AnimatedCard>
          <div className="mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Career</span>
            <h2
              className="mt-2 text-3xl font-bold text-foreground md:text-4xl text-balance"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Experience
            </h2>
            <div className="mt-3 h-1 w-16 rounded-full bg-primary" />
          </div>
        </AnimatedCard>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 hidden h-full w-px bg-border md:left-8 md:block" />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, idx) => (
              <AnimatedCard key={exp.title} delay={idx * 150}>
                <div className="group relative md:pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-6 top-2 hidden h-5 w-5 items-center justify-center md:flex">
                    <div className="h-3 w-3 rounded-full bg-primary transition-transform group-hover:scale-150" />
                  </div>

                  <div className="glass-card rounded-xl p-6 transition-all duration-300 hover:glow-amber animated-border">
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{exp.title}</h3>
                        <p className="text-sm font-medium text-primary">{exp.company}</p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {exp.period}
                      </span>
                    </div>

                    <ul className="flex flex-col gap-2">
                      {exp.description.map((item) => (
                        <li key={item.slice(0, 30)} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/40" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {exp.highlight && (
                      <div className="mt-5 rounded-lg bg-accent/10 p-4 border border-accent/20">
                        <h4 className="mb-3 text-sm font-bold text-accent">{exp.highlight}</h4>
                        <ul className="flex flex-col gap-2">
                          {exp.highlightItems?.map((item) => (
                            <li key={item.slice(0, 30)} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/40" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
