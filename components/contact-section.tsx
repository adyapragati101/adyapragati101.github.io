"use client"

import React from "react"

import { useEffect, useRef, useState } from "react"

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

const contactInfo = [
  {
    label: "Email",
    value: "adyapragati.bhu@gmail.com",
    href: "mailto:adyapragati.bhu@gmail.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+91 9026037025",
    href: "tel:+919026037025",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Hazaribagh, Jharkhand / Bengaluru",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "Connect on LinkedIn",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="relative py-24 px-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, hsl(40 65% 55%) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl">
        <AnimatedCard>
          <div className="mb-16 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Reach Out</span>
            <h2
              className="mt-2 text-3xl font-bold text-foreground md:text-4xl"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {"Let's Connect"}
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-primary" />
            <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground leading-relaxed">
              Interested in discussing credit analysis, financial modelling, or potential
              opportunities? Feel free to reach out.
            </p>
          </div>
        </AnimatedCard>

        <div className="grid gap-4 sm:grid-cols-2">
          {contactInfo.map((info, idx) => (
            <AnimatedCard key={info.label} delay={idx * 100}>
              <a
                href={info.href}
                className="group glass-card flex items-center gap-4 rounded-xl p-5 transition-all duration-300 hover:glow-amber"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  {info.icon}
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{info.label}</p>
                  <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {info.value}
                  </p>
                </div>
              </a>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  )
}
