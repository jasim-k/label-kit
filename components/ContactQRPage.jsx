'use client'

import { useState } from 'react'
import Link from 'next/link'
import { QRCodeCanvas } from 'qrcode.react'

export default function ContactQRPage() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [qrValue, setQrValue] = useState('')

  const handleGenerate = () => {
    if (!name) return
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${name}`,
      company ? `ORG:${company}` : '',
      phone ? `TEL:${phone}` : '',
      email ? `EMAIL:${email}` : '',
      'END:VCARD',
    ].filter(Boolean).join('\n')
    setQrValue(vcard)
  }

  const handleDownloadPng = () => {
    const canvas = document.querySelector('.contact-qr-canvas')
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'contact-qr.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="container">
      <Link href="/" className="back-link">Back to Home</Link>
      <h1>Contact QR Code Maker</h1>
      <p className="subtitle">Generate a QR code that saves a contact instantly when scanned</p>

      <div className="card">
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 180 }}>
            <label>Full Name <span style={{ color: '#6366f1' }}>*</span></label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Jane Smith"
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <label>Company</label>
            <input
              type="text"
              value={company}
              onChange={e => setCompany(e.target.value)}
              placeholder="e.g. Acme Corp"
              style={{ width: '100%' }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 180 }}>
            <label>Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="e.g. +1 555 123 4567"
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 180 }}>
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="e.g. jane@example.com"
              style={{ width: '100%' }}
            />
          </div>
        </div>
        <button className="btn-generate" style={{ marginTop: 16 }} onClick={handleGenerate}>
          Generate QR Code
        </button>
      </div>

      {qrValue && (
        <>
          <div className="results-header">
            <h2>Your Contact QR Code</h2>
            <button className="btn-pdf" onClick={handleDownloadPng}>
              Download PNG
            </button>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, display: 'inline-block' }}>
            <QRCodeCanvas
              className="contact-qr-canvas"
              value={qrValue}
              size={200}
              level="M"
              includeMargin={true}
            />
            <div style={{ marginTop: 12, fontSize: 13, color: '#334155', fontFamily: 'SF Mono, Fira Code, monospace', textAlign: 'center' }}>
              {name}{company ? ` · ${company}` : ''}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
