'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { QRCodeCanvas } from 'qrcode.react'

export default function WifiQRPage() {
  const [ssid, setSsid] = useState('')
  const [password, setPassword] = useState('')
  const [security, setSecurity] = useState('WPA')
  const [qrValue, setQrValue] = useState('')
  const canvasRef = useRef(null)

  const handleGenerate = () => {
    if (!ssid) return
    const escaped = (s) => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/"/g, '\\"')
    const value = `WIFI:S:${escaped(ssid)};T:${security};P:${escaped(password)};;`
    setQrValue(value)
  }

  const handleDownloadPng = () => {
    const canvas = document.querySelector('.wifi-qr-canvas')
    if (!canvas) return
    const link = document.createElement('a')
    link.download = 'wifi-qr.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  return (
    <div className="container">
      <Link href="/" className="back-link">Back to Home</Link>
      <h1>Wi-Fi QR Code Maker</h1>
      <p className="subtitle">Generate a QR code that instantly connects phones to your Wi-Fi network</p>

      <div className="card">
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 2, minWidth: 180 }}>
            <label>Network Name (SSID)</label>
            <input
              type="text"
              value={ssid}
              onChange={e => setSsid(e.target.value)}
              placeholder="e.g. MyHomeNetwork"
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label>Security Type</label>
            <select
              value={security}
              onChange={e => setSecurity(e.target.value)}
              style={{ width: '100%' }}
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">None</option>
            </select>
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <label>Password {security === 'nopass' && <span style={{ color: '#475569', fontWeight: 400 }}>(not required)</span>}</label>
          <input
            type="text"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder={security === 'nopass' ? 'No password needed' : 'Enter Wi-Fi password'}
            disabled={security === 'nopass'}
            style={{ width: '100%', opacity: security === 'nopass' ? 0.4 : 1 }}
          />
        </div>
        <button className="btn-generate" style={{ marginTop: 16 }} onClick={handleGenerate}>
          Generate QR Code
        </button>
      </div>

      {qrValue && (
        <>
          <div className="results-header">
            <h2>Your Wi-Fi QR Code</h2>
            <button className="btn-pdf" onClick={handleDownloadPng}>
              Download PNG
            </button>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 32, display: 'inline-block' }}>
            <QRCodeCanvas
              className="wifi-qr-canvas"
              value={qrValue}
              size={200}
              level="M"
              includeMargin={true}
            />
            <div style={{ marginTop: 12, fontSize: 13, color: '#334155', fontFamily: 'SF Mono, Fira Code, monospace', textAlign: 'center' }}>
              {ssid}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
