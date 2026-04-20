'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

const CHARSETS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  digits: '0123456789',
  symbols: '!@#$%^&*()-_=+[]{}|;:,.<>?',
}

const SIMILAR_CHARS = new Set('0O1lI')
const AMBIGUOUS_CHARS = new Set('{}[]()/\\\'"`~,;.<>')

function buildCharset(opts) {
  let charset = ''
  if (opts.upper) {
    charset += opts.excludeSimilar
      ? CHARSETS.upper.split('').filter(c => !SIMILAR_CHARS.has(c)).join('')
      : CHARSETS.upper
  }
  if (opts.lower) {
    charset += opts.excludeSimilar
      ? CHARSETS.lower.split('').filter(c => !SIMILAR_CHARS.has(c)).join('')
      : CHARSETS.lower
  }
  if (opts.digits) {
    charset += opts.excludeSimilar
      ? CHARSETS.digits.split('').filter(c => !SIMILAR_CHARS.has(c)).join('')
      : CHARSETS.digits
  }
  if (opts.symbols) {
    charset += opts.excludeAmbiguous
      ? CHARSETS.symbols.split('').filter(c => !AMBIGUOUS_CHARS.has(c)).join('')
      : CHARSETS.symbols
  }
  return charset
}

function generateOne(length, charset) {
  if (!charset) return ''
  const arr = new Uint32Array(length)
  crypto.getRandomValues(arr)
  return Array.from(arr, n => charset[n % charset.length]).join('')
}

function passwordStrength(password) {
  if (!password) return { label: '', score: 0, color: '' }
  const len = password.length
  const hasUpper = /[A-Z]/.test(password)
  const hasLower = /[a-z]/.test(password)
  const hasDigit = /[0-9]/.test(password)
  const hasSymbol = /[^A-Za-z0-9]/.test(password)
  const types = [hasUpper, hasLower, hasDigit, hasSymbol].filter(Boolean).length

  let score = 0
  if (len >= 8) score++
  if (len >= 12) score++
  if (len >= 16) score++
  if (len >= 20) score++
  if (types >= 2) score++
  if (types >= 3) score++
  if (types === 4) score++

  if (score <= 2) return { label: 'Weak', score: 1, color: '#ef4444' }
  if (score <= 4) return { label: 'Fair', score: 2, color: '#f59e0b' }
  if (score <= 5) return { label: 'Strong', score: 3, color: '#10b981' }
  return { label: 'Very Strong', score: 4, color: '#6366f1' }
}

export default function PasswordGeneratorPage() {
  const [advanced, setAdvanced] = useState(false)
  const [length, setLength] = useState(16)
  const [count, setCount] = useState(5)
  const [opts, setOpts] = useState({
    upper: true,
    lower: true,
    digits: true,
    symbols: true,
    excludeSimilar: false,
    excludeAmbiguous: false,
  })
  const [passwords, setPasswords] = useState([])
  const [copied, setCopied] = useState(null)

  const toggleOpt = key => setOpts(o => ({ ...o, [key]: !o[key] }))

  const generate = useCallback(() => {
    const charset = buildCharset(opts)
    if (!charset) return
    const n = advanced ? count : 1
    setPasswords(Array.from({ length: n }, () => generateOne(length, charset)))
    setCopied(null)
  }, [opts, length, count, advanced])

  const copyPassword = (pwd, idx) => {
    navigator.clipboard.writeText(pwd).then(() => {
      setCopied(idx)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const copyAll = () => {
    navigator.clipboard.writeText(passwords.join('\n')).then(() => {
      setCopied('all')
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const noCharset = !opts.upper && !opts.lower && !opts.digits && !opts.symbols

  return (
    <div className="container" style={{ maxWidth: 1100 }}>
      <Link href="/" className="back-link">Back to Home</Link>
      <h1>Password Generator</h1>
      <p className="subtitle">Generate cryptographically secure passwords. Runs entirely in your browser — nothing is sent anywhere.</p>

      <div className="pg-layout">
        {/* ── Left: controls ── */}
        <div className="pg-ctrl-panel">
          <div className="pg-mode-row">
            <button
              className={`pg-mode-btn${!advanced ? ' pg-mode-active' : ''}`}
              onClick={() => setAdvanced(false)}
            >
              Normal
            </button>
            <button
              className={`pg-mode-btn${advanced ? ' pg-mode-active' : ''}`}
              onClick={() => setAdvanced(true)}
            >
              Advanced
            </button>
          </div>

          <div className="pg-section">
            <div className="pg-label-row">
              <label className="pg-label">Password Length</label>
              <span className="pg-length-val">{length}</span>
            </div>
            <input
              type="range"
              min={4}
              max={128}
              value={length}
              onChange={e => setLength(Number(e.target.value))}
              className="pg-slider"
            />
            <div className="pg-slider-marks">
              <span>4</span>
              <span>32</span>
              <span>64</span>
              <span>128</span>
            </div>
          </div>

          <div className="pg-section">
            <label className="pg-label">Include Characters</label>
            <div className="pg-checks">
              {[
                { key: 'upper', label: 'Uppercase', hint: 'A–Z' },
                { key: 'lower', label: 'Lowercase', hint: 'a–z' },
                { key: 'digits', label: 'Numbers', hint: '0–9' },
                { key: 'symbols', label: 'Symbols', hint: '!@#$…' },
              ].map(({ key, label, hint }) => (
                <label key={key} className="pg-check-item">
                  <input
                    type="checkbox"
                    checked={opts[key]}
                    onChange={() => toggleOpt(key)}
                  />
                  <span className="pg-check-label">{label}</span>
                  <span className="pg-check-hint">{hint}</span>
                </label>
              ))}
            </div>
          </div>

          {advanced && (
            <div className="pg-section pg-advanced-section">
              <label className="pg-label">Advanced Options</label>
              <div className="pg-adv-field">
                <label className="pg-adv-label">Number of passwords</label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={count}
                  onChange={e => setCount(Math.min(50, Math.max(1, Number(e.target.value))))}
                  className="pg-adv-input"
                />
              </div>
              <div className="pg-checks" style={{ marginTop: 14 }}>
                <label className="pg-check-item">
                  <input
                    type="checkbox"
                    checked={opts.excludeSimilar}
                    onChange={() => toggleOpt('excludeSimilar')}
                  />
                  <span className="pg-check-label">Exclude similar</span>
                  <span className="pg-check-hint">0 O l 1 I</span>
                </label>
                <label className="pg-check-item">
                  <input
                    type="checkbox"
                    checked={opts.excludeAmbiguous}
                    onChange={() => toggleOpt('excludeAmbiguous')}
                  />
                  <span className="pg-check-label">Exclude ambiguous</span>
                  <span className="pg-check-hint">{'{ } [ ] / \\'}</span>
                </label>
              </div>
            </div>
          )}

          {noCharset && <p className="pg-error">Select at least one character set.</p>}

          <button
            className="btn-generate"
            onClick={generate}
            disabled={noCharset}
            style={{ width: '100%', marginTop: 'auto', paddingTop: 12, paddingBottom: 12 }}
          >
            Generate {advanced ? `${count} Password${count !== 1 ? 's' : ''}` : 'Password'}
          </button>
        </div>

        {/* ── Right: results ── */}
        <div className="pg-results-panel">
          {passwords.length === 0 ? (
            <div className="pg-placeholder">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <circle cx="12" cy="16" r="1.5" fill="#334155" stroke="none" />
              </svg>
              <p>Configure options and click<br /><strong>Generate</strong> to create passwords</p>
            </div>
          ) : (
            <>
              <div className="pg-results-header">
                <span className="pg-results-title">
                  {passwords.length === 1 ? 'Your Password' : `${passwords.length} Passwords`}
                </span>
                {passwords.length > 1 && (
                  <button className="pg-copy-all-btn" onClick={copyAll}>
                    {copied === 'all' ? '✓ Copied All' : 'Copy All'}
                  </button>
                )}
              </div>

              <div className="pg-results-list">
                {passwords.map((pwd, i) => {
                  const str = passwordStrength(pwd)
                  return (
                    <div key={i} className="pg-result-item">
                      <div className="pg-result-pwd">{pwd}</div>
                      <div className="pg-result-footer">
                        <div className="pg-strength-wrap">
                          <div className="pg-strength-bar">
                            {[1, 2, 3, 4].map(s => (
                              <div
                                key={s}
                                className="pg-strength-seg"
                                style={{ background: s <= str.score ? str.color : 'transparent' }}
                              />
                            ))}
                          </div>
                          <span className="pg-strength-label" style={{ color: str.color }}>
                            {str.label}
                          </span>
                          <span className="pg-char-count">{pwd.length} chars</span>
                        </div>
                        <button
                          className="pg-copy-btn"
                          onClick={() => copyPassword(pwd, i)}
                        >
                          {copied === i ? '✓ Copied' : 'Copy'}
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
