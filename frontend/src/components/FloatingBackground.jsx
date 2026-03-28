import { useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'

const FloatingBackground = () => {
  const lines = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      width: Math.random() * 200 + 100,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
      opacity: 0.03 + Math.random() * 0.05,
    })),
    []
  )

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />

      {/* Floating lines */}
      <svg className="absolute inset-0 w-full h-full">
        {lines.map((line) => (
          <motion.line
            key={line.id}
            x1={`${line.x}%`}
            y1={`${line.y}%`}
            x2={`${line.x + line.width / 10}%`}
            y2={`${line.y}%`}
            stroke="currentColor"
            strokeWidth="1"
            className="text-gray-400 dark:text-gray-600"
            style={{ opacity: line.opacity }}
            initial={{
              rotate: line.rotation,
              y: 0,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [line.rotation - 5, line.rotation + 5, line.rotation - 5],
              opacity: [line.opacity * 0.5, line.opacity, line.opacity * 0.5],
            }}
            transition={{
              duration: line.duration,
              delay: line.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  )
}

export default FloatingBackground
