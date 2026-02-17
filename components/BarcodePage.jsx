'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import JsBarcode from 'jsbarcode'
import { jsPDF } from 'jspdf'

function BarcodeItem({ value }) {
  const svgRef = useRef(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (svgRef.current) {
      try {
        JsBarcode(svgRef.current, value, {
          format: 'CODE128',
          width: 3,
          height: 80,
          displayValue: false,
          margin: 10,
        })
        setError(null)
      } catch (e) {
        setError(e.message)
      }
    }
  }, [value])

  if (error) {
    return (
      <div className="error-box">
        {value}: {error}
      </div>
    )
  }

  return (
    <div className="barcode-item">
      <svg ref={svgRef}></svg>
      <div className="barcode-label">{value}</div>
    </div>
  )
}

function svgToDataUrl(svg) {
  return new Promise((resolve) => {
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
      resolve(canvas.toDataURL('image/png'))
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  })
}

export default function BarcodePage() {
  const [codes, setCodes] = useState('')
  const [barcodes, setBarcodes] = useState([])
  const barcodesRef = useRef(null)

  return (
    <div className="container">
      <Link href="/" className="back-link">Back to Home</Link>
      <h1>Barcode Generator</h1>
      <p className="subtitle">Code 128 — Paste one value per line, then generate.</p>

      <div className="card">
        <textarea
          value={codes}
          onChange={(e) => setCodes(e.target.value)}
          placeholder="Paste your list here (one per line)..."
        />
        <button className="btn-generate" onClick={() => {
          const lines = codes
            .split('\n')
            .map((l) => l.trim())
            .filter((l) => l !== '')
          setBarcodes(lines)
        }}>
          Generate Barcodes
        </button>
      </div>

      {barcodes.length > 0 && (
        <>
          <div className="results-header">
            <h2>Generated Barcodes</h2>
            <div className="results-actions">
              <span className="badge">
                {barcodes.length} barcode{barcodes.length !== 1 ? 's' : ''}
              </span>
              <button className="btn-pdf" onClick={async () => {
                if (barcodes.length === 0) return
                const pdf = new jsPDF('p', 'mm', 'a4')
                const pageWidth = pdf.internal.pageSize.getWidth()
                let y = 20
                pdf.setFontSize(16)
                pdf.text(`Barcodes (${barcodes.length})`, pageWidth / 2, y, { align: 'center' })
                y += 12
                const items = barcodesRef.current?.querySelectorAll('.barcode-item')
                if (!items) return
                for (let i = 0; i < items.length; i++) {
                  const item = items[i]
                  const svg = item.querySelector('svg')
                  if (!svg) continue
                  const imgData = await svgToDataUrl(svg)
                  const imgWidth = 120
                  const aspectRatio = svg.getAttribute('height') / svg.getAttribute('width')
                  const imgHeight = imgWidth * (aspectRatio || 0.3)
                  if (y + imgHeight + 16 > 280) {
                    pdf.addPage()
                    y = 20
                  }
                  const x = (pageWidth - imgWidth) / 2
                  pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight)
                  y += imgHeight + 2
                  const label = item.querySelector('.barcode-label')?.textContent || ''
                  pdf.setFontSize(11)
                  pdf.text(label, pageWidth / 2, y + 4, { align: 'center' })
                  y += 14
                  if (i < items.length - 1) {
                    pdf.setDrawColor(200)
                    pdf.setLineDashPattern([2, 2], 0)
                    pdf.line(30, y, pageWidth - 30, y)
                    y += 8
                  }
                }
                pdf.save('barcodes.pdf')
              }}>
                Download PDF
              </button>
            </div>
          </div>
          <div ref={barcodesRef}>
            {barcodes.map((code, i) => (
              <BarcodeItem key={`${code}-${i}`} value={code} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
