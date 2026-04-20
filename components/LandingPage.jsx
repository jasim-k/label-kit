'use client'

import Link from 'next/link'

const GITHUB_URL = 'https://github.com/jasim-k/label-kit'

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const tools = [
  {
    href: '/barcode',
    span: 2,
    title: 'Barcode Generator',
    description: 'Generate Code 128 barcodes in bulk. Paste values, generate, and export all as a single print-ready PDF.',
    tag: 'PDF Export',
    isNew: false,
    color: '#6366f1',
    glow: 'rgba(99,102,241,0.18)',
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
    span: 1,
    title: 'Apple 2D Code',
    description: 'Generate Apple 2D codes with Part Number, Box ID, Serial & IMEI in V3, V4, V6 format.',
    tag: 'PDF Export',
    isNew: false,
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.18)',
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
    span: 1,
    title: 'Wi-Fi QR Code',
    description: 'Enter your network name, password, and security type. Scan to connect — no typing needed.',
    tag: 'PNG Download',
    isNew: true,
    color: '#0ea5e9',
    glow: 'rgba(14,165,233,0.18)',
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
    span: 1,
    title: 'Contact QR Code',
    description: 'Enter a name, phone, email, and company. Scan to save the contact in a single tap.',
    tag: 'PNG Download',
    isNew: true,
    color: '#10b981',
    glow: 'rgba(16,185,129,0.18)',
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
    span: 1,
    title: 'QR Size Optimizer',
    description: 'Calculate the minimum safe print size for any QR code based on content and error correction level.',
    tag: 'Size Calculator',
    isNew: true,
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.18)',
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
    span: 1,
    title: 'Markdown Viewer',
    description: 'Paste Markdown and instantly see a rendered preview. Supports headings, code blocks, links, and more.',
    tag: 'Live Preview',
    isNew: true,
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.18)',
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
    href: '/password-generator',
    span: 2,
    title: 'Password Generator',
    description: 'Generate cryptographically secure passwords with custom length, character sets, and bulk generation.',
    tag: 'Crypto Secure',
    isNew: true,
    color: '#14b8a6',
    glow: 'rgba(20,184,166,0.18)',
    iconBg: 'rgba(20,184,166,0.12)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: '/html-viewer',
    span: 3,
    title: 'HTML Viewer',
    description: 'Write or paste HTML and see a live preview instantly. Scripts run in a sandboxed iframe.',
    tag: 'Live Preview',
    isNew: true,
    color: '#f97316',
    glow: 'rgba(249,115,22,0.18)',
    iconBg: 'rgba(249,115,22,0.12)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
]

export default function LandingPage() {
  return (
    <div className="landing">
      <div className="landing-glow" aria-hidden="true" />

      <header className="landing-hero">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="landing-gh-badge">
          <GitHubIcon />
          jasim-k / label-kit
          <span className="landing-gh-arrow" aria-hidden="true">↗</span>
        </a>
        <p className="landing-eyebrow">Free Browser-Based Developer Tools</p>
        <h1 className="landing-title">Toolhaus</h1>
        <p className="landing-tagline">
          Eight tools for barcodes, QR codes, passwords &amp; more.<br />
          Runs entirely in your browser — nothing leaves your device.
        </p>
        <div className="landing-pills">
          <span className="pill">Browser-based</span>
          <span className="pill">Free forever</span>
          <span className="pill">No account needed</span>
          <span className="pill">Open source</span>
        </div>
      </header>

      <div className="landing-bento">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className={`landing-card lc-span-${tool.span || 1}${tool.span === 3 ? ' lc-featured' : ''}`}
            style={{ '--accent': tool.color, '--glow': tool.glow, '--icon-bg': tool.iconBg }}
          >
            {tool.span === 3 ? (
              <>
                <div className="lc-feat-left">
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
                </div>
                <div className="lc-feat-right" aria-hidden="true">
                  <div className="lc-html-mockup">
                    <div className="lc-html-editor">
                      <div className="lc-html-line">
                        <span className="lc-hl-tag">&lt;h1</span>
                        <span className="lc-hl-attr"> style</span>
                        <span className="lc-hl-eq">=</span>
                        <span className="lc-hl-val">"color:#f97316"</span>
                        <span className="lc-hl-tag">&gt;</span>
                      </div>
                      <div className="lc-html-line lc-indent">
                        <span className="lc-hl-text">Hello, World!</span>
                      </div>
                      <div className="lc-html-line">
                        <span className="lc-hl-tag">&lt;/h1&gt;</span>
                      </div>
                      <div className="lc-html-line" style={{ marginTop: 6 }}>
                        <span className="lc-hl-tag">&lt;button</span>
                        <span className="lc-hl-attr"> onclick</span>
                        <span className="lc-hl-eq">=</span>
                        <span className="lc-hl-val">"alert('!')"</span>
                        <span className="lc-hl-tag">&gt;</span>
                        <span className="lc-hl-text">Click</span>
                        <span className="lc-hl-tag">&lt;/button&gt;</span>
                      </div>
                    </div>
                    <div className="lc-html-arrow">→</div>
                    <div className="lc-html-preview">
                      <div className="lc-prev-h1">Hello, World!</div>
                      <div className="lc-prev-btn">Click</div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
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
              </>
            )}
          </Link>
        ))}
      </div>

      <footer className="landing-footer">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="lf-github">
          <GitHubIcon />
          View on GitHub
        </a>
        <span className="lf-sep" aria-hidden="true">·</span>
        <span className="lf-text">Open source · Free forever · No account needed</span>
      </footer>
    </div>
  )
}
