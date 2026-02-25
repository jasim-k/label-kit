'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { QRCodeCanvas } from 'qrcode.react'

// QR version capacity table for character counts (byte mode, most conservative)
// Source: QR code spec — capacities[version][ecLevel] = max bytes
const CAPACITY = {
  L: [17,32,53,78,106,134,154,192,230,271,321,367,425,458,520,586,644,718,792,858,929,1003,1091,1171,1273,1367,1465,1528,1628,1732,1840,1952,2068,2188,2303,2431,2563,2699,2809,2953],
  M: [14,26,42,62,84,106,122,154,180,213,251,287,331,362,412,450,504,560,624,666,711,779,857,911,997,1059,1125,1190,1264,1370,1452,1538,1628,1722,1809,1911,1989,2099,2213,2331],
  Q: [11,20,32,46,60,74,86,108,130,151,177,203,241,258,292,322,364,394,442,482,509,565,611,661,715,751,805,868,908,982,1030,1112,1168,1228,1283,1351,1423,1499,1579,1663],
  H: [7,14,24,34,44,58,64,84,98,119,137,155,177,194,220,250,280,310,338,382,403,439,461,511,535,593,625,658,698,742,790,842,898,958,983,1051,1093,1139,1219,1273],
}

const EC_LABELS = {
  L: { label: 'L — Low (7%)', desc: '7% recovery', short: 'L' },
  M: { label: 'M — Medium (15%)', desc: '15% recovery', short: 'M' },
  Q: { label: 'Q — Quartile (25%)', desc: '25% recovery', short: 'Q' },
  H: { label: 'H — High (30%)', desc: '30% recovery', short: 'H' },
}

const RELIABILITY_OPTIONS = [
  { value: 0.4, label: 'Basic  — 0.4mm module', sublabel: 'Office / screen display' },
  { value: 0.5, label: 'Standard — 0.5mm module', sublabel: 'Everyday product labels' },
  { value: 0.7, label: 'Industrial — 0.7mm module', sublabel: 'Harsh environment / logistics' },
]

function getQRVersion(content, ecLevel) {
  const bytes = new TextEncoder().encode(content).length
  const caps = CAPACITY[ecLevel]
  for (let i = 0; i < caps.length; i++) {
    if (bytes <= caps[i]) return i + 1
  }
  return null // too long
}

function getModuleCount(version) {
  return 21 + (version - 1) * 4
}

function getReliabilityLabel(printSizeMm) {
  if (printSizeMm < 15) return { level: 'risky', text: 'Risky', color: '#ef4444', bg: 'rgba(239,68,68,0.12)', dot: '#ef4444' }
  if (printSizeMm < 25) return { level: 'good', text: 'Good', color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', dot: '#f59e0b' }
  return { level: 'excellent', text: 'Excellent', color: '#10b981', bg: 'rgba(16,185,129,0.12)', dot: '#10b981' }
}

function mm2cm(mm) { return (mm / 10).toFixed(2) }
function mm2inch(mm) { return (mm / 25.4).toFixed(2) }

export default function QRSizeOptimizerPage() {
  const [content, setContent] = useState('')
  const [ecLevel, setEcLevel] = useState('M')
  const [moduleSize, setModuleSize] = useState(0.5)
  const [copied, setCopied] = useState(false)
  const previewRef = useRef(null)

  const bytes = content ? new TextEncoder().encode(content).length : 0
  const version = content ? getQRVersion(content, ecLevel) : null
  const modules = version ? getModuleCount(version) : null
  const printMm = modules ? modules * moduleSize : null
  const safeMm = printMm ? printMm * 1.15 : null
  const reliability = printMm ? getReliabilityLabel(printMm) : null
  const tooLong = content && version === null

  const handleCopy = useCallback(() => {
    if (!version) return
    const text = [
      `QR Size Optimizer — LabelKit`,
      ``,
      `Content: ${content}`,
      `Bytes: ${bytes}`,
      `Error Correction: ${ecLevel} (${EC_LABELS[ecLevel].desc})`,
      `Module Size: ${moduleSize}mm`,
      ``,
      `QR Version: ${version}`,
      `Module Grid: ${modules} × ${modules}`,
      `Min Print Size: ${printMm.toFixed(1)}mm / ${mm2cm(printMm)}cm / ${mm2inch(printMm)}"`,
      `Recommended Size (+15%): ${safeMm.toFixed(1)}mm / ${mm2cm(safeMm)}cm / ${mm2inch(safeMm)}"`,
      `Scan Reliability: ${reliability.text}`,
    ].join('\n')
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [content, bytes, ecLevel, moduleSize, version, modules, printMm, safeMm, reliability])

  return (
    <div className="container qso-page">
      <Link href="/" className="back-link">Back to Home</Link>
      <h1>QR Size Optimizer</h1>
      <p className="subtitle">Calculate the minimum safe print size for your QR code before sending to print</p>

      <div className="qso-layout">
        {/* ── Left: Inputs ── */}
        <div className="qso-inputs">
          <div className="card">
            <div className="qso-field">
              <label htmlFor="qso-content">QR Content / URL</label>
              <textarea
                id="qso-content"
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Paste a URL or text here…&#10;e.g. https://example.com/product/12345"
                style={{ height: 120 }}
              />
              <div className="qso-byte-count">
                <span style={{ color: tooLong ? '#ef4444' : '#475569' }}>
                  {bytes} byte{bytes !== 1 ? 's' : ''}
                </span>
                {tooLong && <span className="qso-error-badge">Too long for any QR version</span>}
              </div>
            </div>

            <div className="qso-row">
              <div className="qso-field">
                <label htmlFor="qso-ec">Error Correction</label>
                <select
                  id="qso-ec"
                  value={ecLevel}
                  onChange={e => setEcLevel(e.target.value)}
                  style={{ width: '100%' }}
                >
                  {Object.entries(EC_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
                <p className="qso-hint">Higher EC → larger QR → more damage-resistant</p>
              </div>

              <div className="qso-field">
                <label htmlFor="qso-reliability">Print Reliability</label>
                <select
                  id="qso-reliability"
                  value={moduleSize}
                  onChange={e => setModuleSize(parseFloat(e.target.value))}
                  style={{ width: '100%' }}
                >
                  {RELIABILITY_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <p className="qso-hint">Module = one dark/light square in the QR grid</p>
              </div>
            </div>
          </div>

          {/* ── Results ── */}
          {version && !tooLong && (
            <div className="qso-results card">
              <div className="qso-results-header">
                <span className="qso-results-title">Size Analysis</span>
                <button
                  id="qso-copy-btn"
                  className="qso-copy-btn"
                  onClick={handleCopy}
                  aria-label="Copy results to clipboard"
                >
                  {copied ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8l4 4 6-7" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <rect x="5" y="5" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M11 5V3a1 1 0 00-1-1H3a1 1 0 00-1 1v7a1 1 0 001 1h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      Copy Results
                    </>
                  )}
                </button>
              </div>

              {/* Reliability badge */}
              <div
                className="qso-reliability-badge"
                style={{ background: reliability.bg, borderColor: reliability.color + '44' }}
              >
                <span className="qso-rel-dot" style={{ background: reliability.dot }} />
                <span style={{ color: reliability.color, fontWeight: 700 }}>{reliability.text} scan reliability</span>
                <span style={{ color: '#64748b', fontSize: 12 }}>
                  {reliability.level === 'risky' && '— Consider larger print size'}
                  {reliability.level === 'good' && '— Suitable for most scanners'}
                  {reliability.level === 'excellent' && '— Optimised for all scanners'}
                </span>
              </div>

              <div className="qso-metrics">
                <div className="qso-metric">
                  <span className="qso-metric-label">QR Version</span>
                  <span className="qso-metric-value qso-metric-big">{version}</span>
                  <span className="qso-metric-sub">of 40</span>
                </div>
                <div className="qso-metric">
                  <span className="qso-metric-label">Module Grid</span>
                  <span className="qso-metric-value qso-metric-big">{modules}²</span>
                  <span className="qso-metric-sub">{modules} × {modules} modules</span>
                </div>
                <div className="qso-metric">
                  <span className="qso-metric-label">Min Print Size</span>
                  <span className="qso-metric-value">{mm2cm(printMm)} cm</span>
                  <span className="qso-metric-value" style={{ fontSize: 14, color: '#64748b' }}>{printMm.toFixed(1)} mm · {mm2inch(printMm)}"</span>
                </div>
                <div className="qso-metric qso-metric-accent">
                  <span className="qso-metric-label">Recommended (+15%)</span>
                  <span className="qso-metric-value">{mm2cm(safeMm)} cm</span>
                  <span className="qso-metric-value" style={{ fontSize: 14, color: '#94a3b8' }}>{safeMm.toFixed(1)} mm · {mm2inch(safeMm)}"</span>
                </div>
              </div>

              {/* Size bar visualiser */}
              <div className="qso-bar-section">
                <div className="qso-bar-label">
                  <span>Min: {mm2cm(printMm)}cm</span>
                  <span>Recommended: {mm2cm(safeMm)}cm</span>
                </div>
                <div className="qso-bar-track">
                  <div
                    className="qso-bar-fill"
                    style={{
                      width: `${Math.min(100, (printMm / 100) * 100)}%`,
                      background: reliability.dot,
                    }}
                  />
                  <div
                    className="qso-bar-safe"
                    style={{
                      width: `${Math.min(100, (safeMm / 100) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {!content && (
            <div className="qso-empty-hint card">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="3" height="3" />
                <rect x="19" y="14" width="2" height="2" />
                <rect x="14" y="19" width="3" height="2" />
                <rect x="19" y="19" width="2" height="2" />
              </svg>
              <p>Enter QR content above to see size calculations</p>
            </div>
          )}
        </div>

        {/* ── Right: Live QR Preview ── */}
        <div className="qso-preview-col">
          <div className="qso-preview-card card">
            <span className="qso-preview-title">Live Preview</span>
            {content && !tooLong ? (
              <div className="qso-qr-wrap" ref={previewRef}>
                <QRCodeCanvas
                  value={content}
                  size={200}
                  level={ecLevel}
                  includeMargin={true}
                  style={{ borderRadius: 8, display: 'block' }}
                />
                <div className="qso-qr-meta">
                  <span>EC: {ecLevel}</span>
                  <span>·</span>
                  <span>v{version}</span>
                  <span>·</span>
                  <span>{bytes}B</span>
                </div>
              </div>
            ) : (
              <div className="qso-qr-placeholder">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                  {/* Finder pattern TL */}
                  <rect x="4" y="4" width="22" height="22" rx="3" fill="none" stroke="#334155" strokeWidth="2.5" />
                  <rect x="10" y="10" width="10" height="10" rx="1.5" fill="#334155" />
                  {/* Finder pattern TR */}
                  <rect x="38" y="4" width="22" height="22" rx="3" fill="none" stroke="#334155" strokeWidth="2.5" />
                  <rect x="44" y="10" width="10" height="10" rx="1.5" fill="#334155" />
                  {/* Finder pattern BL */}
                  <rect x="4" y="38" width="22" height="22" rx="3" fill="none" stroke="#334155" strokeWidth="2.5" />
                  <rect x="10" y="44" width="10" height="10" rx="1.5" fill="#334155" />
                  {/* Data dots */}
                  <rect x="38" y="38" width="4" height="4" rx="1" fill="#1e3a5f" opacity="0.5" />
                  <rect x="44" y="38" width="4" height="4" rx="1" fill="#1e3a5f" opacity="0.3" />
                  <rect x="50" y="38" width="4" height="4" rx="1" fill="#1e3a5f" opacity="0.6" />
                  <rect x="56" y="38" width="4" height="4" rx="1" fill="#1e3a5f" opacity="0.4" />
                  <rect x="38" y="44" width="4" height="4" rx="1" fill="#1e3a5f" opacity="0.4" />
                  <rect x="50" y="44" width="4" height="4" rx="1" fill="#1e3a5f" opacity="0.7" />
                  <rect x="38" y="50" width="4" height="4" rx="1" fill="#1e3a5f" opacity="0.5" />
                  <rect x="44" y="50" width="4" height="4" rx="1" fill="#1e3a5f" opacity="0.3" />
                  <rect x="56" y="50" width="4" height="4" rx="1" fill="#1e3a5f" opacity="0.6" />
                  <rect x="44" y="56" width="4" height="4" rx="1" fill="#1e3a5f" opacity="0.4" />
                  <rect x="50" y="56" width="4" height="4" rx="1" fill="#1e3a5f" opacity="0.5" />
                  <rect x="56" y="56" width="4" height="4" rx="1" fill="#1e3a5f" opacity="0.3" />
                </svg>
                <p>Preview appears here</p>
              </div>
            )}
          </div>

          {/* EC reference card */}
          <div className="card qso-ec-guide">
            <span className="qso-preview-title">Error Correction Guide</span>
            <div className="qso-ec-rows">
              {Object.entries(EC_LABELS).map(([k, v]) => (
                <div
                  key={k}
                  className={`qso-ec-row${ecLevel === k ? ' qso-ec-row-active' : ''}`}
                  onClick={() => setEcLevel(k)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setEcLevel(k)}
                >
                  <span className="qso-ec-badge">{k}</span>
                  <div>
                    <div className="qso-ec-name">{v.desc}</div>
                    <div className="qso-ec-use">
                      {k === 'L' && 'Clean environments, minimise size'}
                      {k === 'M' && 'General purpose — most common'}
                      {k === 'Q' && 'Industrial / slightly dirty surfaces'}
                      {k === 'H' && 'Max damage tolerance, logos inside'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
