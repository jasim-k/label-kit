'use client'

import { useState } from 'react'
import Link from 'next/link'
import { jsPDF } from 'jspdf'
import CodeItem2D from './CodeItem2D'

export default function Apple2DCodePage() {
  const [partNumber, setPartNumber] = useState('')
  const [boxId, setBoxId] = useState('')
  const [serials, setSerials] = useState('')
  const [imei1, setImei1] = useState('')
  const [imei2, setImei2] = useState('')
  const [codes, setCodes] = useState([])

  const handleGenerate = () => {
    const serialList = serials.split(/[,\n]/).map(s => s.trim()).filter(Boolean)
    const imei1List = imei1.split(/[,\n]/).map(s => s.trim()).filter(Boolean)
    const imei2List = imei2.split(/[,\n]/).map(s => s.trim()).filter(Boolean)

    if (!partNumber || !boxId || serialList.length === 0 || imei1List.length === 0 || imei2List.length === 0) {
      setCodes([])
      return
    }

    const qty = serialList.length
    const code1 = `V3,SSCC00${boxId},GTIN00194253264743,SSC${boxId},MPN${partNumber},QTY${qty},${serialList.join(',')}`
    const code2 = `V4,SSCC00${boxId},GTIN00194253264743,SSC${boxId},MPN${partNumber},QTY${qty},IMEI${imei1List.join(',IMEI')}`
    const code3 = `V6,SSCC00${boxId},GTIN00194253264743,SSC${boxId},MPN${partNumber},QTY${qty},SIMEI${imei2List.join(',SIMEI')}`
    setCodes([
      { value: code1, label: 'Serial(s)' },
      { value: code2, label: 'IMEI 1(s)' },
      { value: code3, label: 'IMEI 2(s)' },
    ])
  }

  const handleDownloadPdf = async () => {
    if (codes.length === 0) return
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    let y = 20
    pdf.setFontSize(16)
    pdf.text('Apple 2D Codes', pageWidth / 2, y, { align: 'center' })
    y += 12
    for (let i = 0; i < codes.length; i++) {
      const codeItem = document.querySelectorAll('.code-2d-item canvas')[i]
      if (!codeItem) continue
      const imgData = codeItem.toDataURL('image/png')
      const imgWidth = 80
      const imgHeight = 80
      const x = (pageWidth - imgWidth) / 2
      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight)
      y += imgHeight + 2
      pdf.setFontSize(8)
      pdf.text(codes[i].value, pageWidth / 2, y + 4, { align: 'center', maxWidth: pageWidth - 20 })
      y += 18
      if (i < codes.length - 1) {
        pdf.setDrawColor(200)
        pdf.setLineDashPattern([2, 2], 0)
        pdf.line(30, y, pageWidth - 30, y)
        y += 8
      }
    }
    pdf.save('apple-2d-codes.pdf')
  }

  return (
    <div className="container">
      <Link href="/" className="back-link">Back to Home</Link>
      <h1>Apple 2D Code Generator</h1>
      <p className="subtitle">Custom Apple 2D code for Part Number, Box, Serial, IMEI 1, IMEI 2</p>
      <div className="card">
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 180 }}>
            <label>Part Number</label>
            <input type="text" value={partNumber} onChange={e => setPartNumber(e.target.value)} placeholder="e.g. ABC123" style={{ width: '100%' }} />
          </div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <label>Box Id</label>
            <input type="text" value={boxId} onChange={e => setBoxId(e.target.value)} placeholder="e.g. DEF123" style={{ width: '100%' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 180 }}>
            <label>Serial (comma or newline)</label>
            <textarea value={serials} onChange={e => setSerials(e.target.value)} placeholder="A123, D123, G123" style={{ width: '100%', height: 60 }} />
          </div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <label>IMEI 1 (comma or newline)</label>
            <textarea value={imei1} onChange={e => setImei1(e.target.value)} placeholder="B123, E123, H123" style={{ width: '100%', height: 60 }} />
          </div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <label>IMEI 2 (comma or newline)</label>
            <textarea value={imei2} onChange={e => setImei2(e.target.value)} placeholder="C123, F123, I123" style={{ width: '100%', height: 60 }} />
          </div>
        </div>
        <button className="btn-generate" style={{ marginTop: 16 }} onClick={handleGenerate}>
          Generate Apple 2D Codes
        </button>
      </div>

      {codes.length > 0 && (
        <>
          <div className="results-header">
            <h2>Generated Apple 2D Codes</h2>
            <div className="results-actions">
              <span className="badge">{codes.length} code{codes.length !== 1 ? 's' : ''}</span>
              <button className="btn-pdf" onClick={handleDownloadPdf}>
                Download PDF
              </button>
            </div>
          </div>
          <div>
            {codes.map((code, i) => (
              <CodeItem2D key={i} value={code.value} label={code.label} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
