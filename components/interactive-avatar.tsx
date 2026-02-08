"use client"

import { useEffect, useRef, useState, useCallback } from "react"

interface InteractiveAvatarProps {
  className?: string
  size?: number
}

export function InteractiveAvatar({ className = "", size = 280 }: InteractiveAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 })
  const [headTilt, setHeadTilt] = useState({ x: 0, y: 0 })
  const [isBlinking, setIsBlinking] = useState(false)
  const animFrameRef = useRef<number>(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return
    cancelAnimationFrame(animFrameRef.current)
    animFrameRef.current = requestAnimationFrame(() => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const maxEyeMove = 6
      const maxHeadTilt = 3
      const normalizedX = deltaX / (distance + 200)
      const normalizedY = deltaY / (distance + 200)
      setEyeOffset({
        x: normalizedX * maxEyeMove * (distance / 100),
        y: normalizedY * maxEyeMove * (distance / 100),
      })
      setHeadTilt({
        x: normalizedX * maxHeadTilt,
        y: normalizedY * maxHeadTilt * 0.5,
      })
    })
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [handleMouseMove])

  useEffect(() => {
    const blinkInterval = setInterval(
      () => {
        setIsBlinking(true)
        setTimeout(() => setIsBlinking(false), 150)
      },
      3000 + Math.random() * 2000,
    )
    return () => clearInterval(blinkInterval)
  }, [])

  const eyeX = Math.max(-5, Math.min(5, eyeOffset.x))
  const eyeY = Math.max(-4, Math.min(4, eyeOffset.y))
  const headX = Math.max(-3, Math.min(3, headTilt.x))
  const headY = Math.max(-2, Math.min(2, headTilt.y))

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${className}`}
      style={{ width: size, height: size }}
      aria-label="Interactive avatar"
      role="img"
    >
      <div
        className="absolute inset-0 rounded-full animate-pulse-glow"
        style={{
          background: "radial-gradient(circle, hsl(40 65% 55% / 0.15) 0%, transparent 70%)",
          transform: "scale(1.2)",
        }}
      />

      <svg
        viewBox="0 0 280 280"
        width={size}
        height={size}
        style={{
          transform: `translate(${headX}px, ${headY}px)`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <defs>
          <clipPath id="avatarCircle">
            <circle cx="140" cy="140" r="130" />
          </clipPath>

          <radialGradient id="skinMain" cx="50%" cy="38%" r="55%">
            <stop offset="0%" stopColor="#f0c9a8" />
            <stop offset="100%" stopColor="#ddb08c" />
          </radialGradient>

          <linearGradient id="hairColor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2b1d1a" />
            <stop offset="100%" stopColor="#140c0a" />
          </linearGradient>

          <linearGradient id="blazerColor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1f2f4f" />
            <stop offset="100%" stopColor="#162238" />
          </linearGradient>
        </defs>

        <g clipPath="url(#avatarCircle)">
          <rect width="280" height="280" fill="#eee6de" />

          {/* 1. Back Hair */}
          <path
            d="M60 95 Q25 155 65 200 Q2 280 220 220 Q180 160 200 95 Q200 45 80 60 Z"
            fill="url(#hairColor)"
          />

          {/* 2. Ears */}
          <circle cx="78" cy="145" r="12" fill="#ddb08c" />
          <circle cx="202" cy="145" r="12" fill="#ddb08c" />

          {/* 3. Face */}
          <ellipse cx="140" cy="140" rx="65" ry="70" fill="url(#skinMain)" />

          {/* 4. Eyes & Features */}
          <ellipse cx="115" cy="140" rx="14" ry={isBlinking ? 1 : 14} fill="white" stroke="#3b2b1f" strokeWidth="1.5" />
          <ellipse cx="165" cy="140" rx="14" ry={isBlinking ? 1 : 14} fill="white" stroke="#3b2b1f" strokeWidth="1.5" />

          {!isBlinking && (
            <>
              <circle cx={115 + eyeX} cy={140 + eyeY} r="5" fill="#3b2010" />
              <circle cx={165 + eyeX} cy={140 + eyeY} r="5" fill="#3b2010" />
              <circle cx={115 + eyeX + 1.5} cy={140 + eyeY - 1.5} r="1.5" fill="white" opacity="0.8" />
              <circle cx={165 + eyeX + 1.5} cy={140 + eyeY - 1.5} r="1.5" fill="white" opacity="0.8" />
            </>
          )}

          {/* Glasses Frames */}
          <circle cx="115" cy="140" r="18" fill="none" stroke="#2b1d1a" strokeWidth="2.5" />
          <circle cx="165" cy="140" r="18" fill="none" stroke="#2b1d1a" strokeWidth="2.5" />
          <path d="M133 140 Q140 138 147 140" fill="none" stroke="#2b1d1a" strokeWidth="2.5" />

          <path d="M138 152 Q140 156 142 152" stroke="#c59b7a" fill="none" strokeWidth="1.5" />
          <path d="M115 175 Q140 190 165 175" stroke="#9c5a4a" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* 5. Front Hair */}
          <path
            d="M75 110 Q170 0 205 110 Q220 160 205 230 Q190 240 175 220 Q215 150 165 115 Q140 90 75 110 Z"
            fill="url(#hairColor)"
          />
          <path
            d="M65 100 Q90 200 55 200 Q85 330 94 200 Q100 70 75 110 Z"
            fill="url(#hairColor)"
          />
          <path d="M135 100 Q200 115 180 120" stroke="url(#hairColor)" strokeWidth="8" strokeLinecap="round" fill="none" />

          {/* 6. Blazer & Shirt */}
          <ellipse cx="130" cy="310" rx="140" ry="100" fill="url(#blazerColor)" />
          <path d="M120 210 L140 245 L160 210 Q140 220 120 210" fill="#2f6ea3" />
        </g>

        <circle
          cx="140"
          cy="140"
          r="130"
          fill="none"
          stroke="hsl(40, 65%, 55%)"
          strokeWidth="3"
          opacity="0.6"
        />
      </svg>
    </div>
  )
}