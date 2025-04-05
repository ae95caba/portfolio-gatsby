import React, { useEffect, useRef } from "react"

interface PatternBackgroundProps {
  patternImage: string
  opacity?: number
  gap?: number
  className?: string
}

const PatternBackground: React.FC<PatternBackgroundProps> = ({
  patternImage,
  opacity = 0.7,
  gap = 30,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new Image()
    img.src = patternImage

    img.onload = () => {
      const resizeCanvas = () => {
        const container = canvas.parentElement
        if (!container) return

        canvas.width = container.offsetWidth
        canvas.height = container.offsetHeight

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Use original image dimensions
        const width = img.width
        const height = img.height

        // Target showing roughly 4-5 strokes in viewport
        const viewportHeight = window.innerHeight
        const targetStrokesInView = 4

        // Calculate ideal gap based on viewport
        const idealGap = Math.max(
          30, // minimum gap
          viewportHeight / targetStrokesInView - height
        )

        // Calculate total height needed for each image including gap
        const itemHeight = height + idealGap

        // Calculate how many images we need for full coverage
        const repeatY = Math.ceil(canvas.height / itemHeight) + 1

        // Calculate total pattern height
        const totalPatternHeight = repeatY * itemHeight - idealGap

        // Center horizontally and start from below the text
        const centerX = canvas.width / 2 - width / 2
        const startY = 200 // Start below the heading and subheading text

        // Apply color filter
        ctx.filter =
          "invert(34%) sepia(87%) saturate(7492%) hue-rotate(355deg) brightness(85%) contrast(66%)"

        // Draw pattern in a vertical column with calculated gap
        for (let y = 0; y < repeatY; y++) {
          ctx.drawImage(img, centerX, startY + y * itemHeight, width, height)
        }
      }

      // Initial resize
      resizeCanvas()

      // Handle window resize
      window.addEventListener("resize", resizeCanvas)
      return () => window.removeEventListener("resize", resizeCanvas)
    }
  }, [patternImage, opacity])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  )
}

export default PatternBackground
