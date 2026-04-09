'use client'

import { useEffect, useRef } from 'react'
import PDF417 from 'pdf417-generator'

export default function CodeItem2D({ value, label }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current && value) {
      try {
        PDF417.draw(value, canvasRef.current, 2, -1, window.devicePixelRatio || 1)
      } catch (error) {
        console.error('Error generating PDF417 barcode:', error)
      }
    }
  }, [value])

  return (
    <div className="code-2d-item">
      <canvas ref={canvasRef} width="256" height="128" />
      <div className="code-2d-label">{label}</div>
    </div>
  )
}
