'use client'

import Link from 'next/link'

const tools = [
  {
    href: '/barcode',
    title: 'Barcode Generator',
    description: 'Generate Code 128 barcodes in bulk. Paste values, generate, and download all as a single print-ready PDF.',
    tag: 'PDF Export',
    isNew: false,
    color: '#6366f1',
    glow: 'rgba(99,102,241,0.22)',
    iconBg: 'rgba(99,102,241,0.12)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="1" y="2" width="2" height="20" rx="0.5" />
        <rect x="5" y="2" width="1" height="20" rx="0.5" />
        <rect x="8" y="2" width="3" height="20" rx="0.5" />
        <rect x="13" y="2" width="1" height="20" rx="0.5" />
        <rect x="16" y="2" width="2" height="20" rx="0.5" />
        <rect x="20" y="2" width="1" height="20" rx="0.5" />
        <rect x="22" y="2" width="1.5" height="20" rx="0.5" />
      </svg>
    ),
  },
  {
    href: '/apple-2d-code',
    title: 'Apple 2D Code',
    description: 'Generate Apple 2D codes with Part Number, Box ID, Serial & IMEI data in V3, V4, V6 format. Exports as PDF.',
    tag: 'PDF Export',
    isNew: false,
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.22)',
    iconBg: 'rgba(139,92,246,0.12)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="1" y="1" width="7" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <rect x="3" y="3" width="3" height="3" rx="0.5" />
        <rect x="16" y="1" width="7" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <rect x="18" y="3" width="3" height="3" rx="0.5" />
        <rect x="1" y="16" width="7" height="7" rx="1" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <rect x="3" y="18" width="3" height="3" rx="0.5" />
        <rect x="16" y="16" width="3" height="3" rx="0.5" />
        <rect x="21" y="16" width="2" height="3" rx="0.5" />
        <rect x="16" y="21" width="3" height="2" rx="0.5" />
        <rect x="20" y="20" width="3" height="3" rx="0.5" />
      </svg>
    ),
  },
  {
    href: '/wifi-qr',
    title: 'Wi-Fi QR Code',
    description: 'Enter your network name, password, and security type. Scan with any phone to connect instantly — no typing.',
    tag: 'PNG Download',
    isNew: true,
    color: '#0ea5e9',
    glow: 'rgba(14,165,233,0.22)',
    iconBg: 'rgba(14,165,233,0.12)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="20" r="1.5" fill="currentColor" stroke="none" />
        <path d="M6 15a8.5 8.5 0 0 1 12 0" />
        <path d="M2.5 11a14 14 0 0 1 19 0" />
        <path d="M0 7.5A19 19 0 0 1 24 7.5" />
      </svg>
    ),
  },
  {
    href: '/contact-qr',
    title: 'Contact QR Code',
    description: 'Enter a name, phone, email, and company. Scan with any phone to save the contact in a single tap.',
    tag: 'PNG Download',
    isNew: true,
    color: '#10b981',
    glow: 'rgba(16,185,129,0.22)',
    iconBg: 'rgba(16,185,129,0.12)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </svg>
    ),
  },
  {
    href: '/qr-size',
    title: 'QR Size Optimizer',
    description: 'Calculate the minimum safe print size for any QR code. Input content, set error correction & print reliability — get exact mm, cm, and inch dimensions.',
    tag: 'Size Calculator',
    isNew: true,
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.22)',
    iconBg: 'rgba(245,158,11,0.12)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" />
        <rect x="4" y="4" width="3" height="3" fill="currentColor" rx="0.5" />
        <rect x="15" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" />
        <rect x="17" y="4" width="3" height="3" fill="currentColor" rx="0.5" />
        <rect x="2" y="15" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8" />
        <rect x="4" y="17" width="3" height="3" fill="currentColor" rx="0.5" />
        <line x1="15" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="15" y1="19" x2="22" y2="19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="15" y1="22" x2="22" y2="22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="15" y1="15" x2="15" y2="22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: '/markdown-viewer',
    title: 'Markdown Viewer',
    description: 'Paste any Markdown and instantly see a rendered preview. Supports headings, lists, code blocks, links, and more.',
    tag: 'Live Preview',
    isNew: true,
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.22)',
    iconBg: 'rgba(236,72,153,0.12)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 8h2l2 5 2-5h2" />
        <path d="M7 16v-4" />
        <path d="M17 12v4" />
        <path d="M15 14h4" />
      </svg>
    ),
  },
  {
    href: '/html-viewer',
    title: 'HTML Viewer',
    description: 'Write or paste HTML and see a live preview instantly. Scripts run in a sandboxed iframe — great for testing snippets.',
    tag: 'Live Preview',
    isNew: true,
    color: '#f97316',
    glow: 'rgba(249,115,22,0.22)',
    iconBg: 'rgba(249,115,22,0.12)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    href: '/password-generator',
    title: 'Password Generator',
    description: 'Generate cryptographically secure passwords with custom length, character sets, and advanced options like bulk generation.',
    tag: 'Crypto Secure',
    isNew: true,
    color: '#14b8a6',
    glow: 'rgba(20,184,166,0.22)',
    iconBg: 'rgba(20,184,166,0.12)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="landing-hero">
        <p className="landing-eyebrow">Free Browser-Based Developer Tools</p>
        <h1 className="landing-title">Toolhaus</h1>
        <p className="landing-tagline">
          Eight precision tools for barcodes, QR codes, passwords &amp; more.<br />
          Runs entirely in your browser — nothing leaves your device.
        </p>
        <div className="landing-pills">
          <span className="pill">Browser-based</span>
          <span className="pill">Free forever</span>
          <span className="pill">No account needed</span>
          <span className="pill">Open source</span>
        </div>
      </div>

      <div className="landing-grid">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="landing-card"
            style={{ '--accent': tool.color, '--glow': tool.glow, '--icon-bg': tool.iconBg }}
          >
            <div className="card-top">
              <div className="card-icon-wrap">{tool.icon}</div>
              {tool.isNew && <span className="card-new-badge">New</span>}
            </div>
            <h2 className="card-title">{tool.title}</h2>
            <p className="card-desc">{tool.description}</p>
            <div className="card-footer">
              <span className="card-tag">{tool.tag}</span>
              <span className="card-action">Open tool →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
