'use client'

import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="landing-hero">
        <h1 className="landing-title">LabelKit</h1>
        <p className="landing-tagline">Barcode & Apple 2D Code Generation Suite</p>
      </div>

      <div className="landing-grid">
        <Link href="/barcode" className="landing-card">
          <div className="card-icon">|||||||</div>
          <h2>Barcode Generator</h2>
          <p>Generate Code 128 barcodes in bulk. Paste values, generate, and download as PDF.</p>
          <span className="card-action">Open Generator</span>
        </Link>

        <Link href="/apple-2d-code" className="landing-card">
          <div className="card-icon-2d">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none" />
              <rect x="8" y="8" width="8" height="8" rx="1" fill="currentColor" />
              <rect x="28" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none" />
              <rect x="32" y="8" width="8" height="8" rx="1" fill="currentColor" />
              <rect x="4" y="28" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2.5" fill="none" />
              <rect x="8" y="32" width="8" height="8" rx="1" fill="currentColor" />
              <rect x="28" y="28" width="4" height="4" fill="currentColor" />
              <rect x="36" y="28" width="8" height="4" fill="currentColor" />
              <rect x="28" y="36" width="4" height="8" fill="currentColor" />
              <rect x="36" y="40" width="8" height="4" fill="currentColor" />
              <rect x="40" y="32" width="4" height="6" fill="currentColor" />
            </svg>
          </div>
          <h2>Apple 2D Code Generator</h2>
          <p>Generate custom Apple 2D codes with Part Number, Box ID, Serial & IMEI data. Download as PDF.</p>
          <span className="card-action">Open Generator</span>
        </Link>
      </div>
    </div>
  )
}
