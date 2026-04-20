'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

const SAMPLE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: sans-serif; padding: 24px; background: #f8f9fa; color: #1e293b; }
    h1 { color: #4f46e5; margin-bottom: 8px; }
    p { color: #475569; margin-bottom: 16px; }
    .card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.08); margin-bottom: 16px; }
    button { background: #4f46e5; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 14px; }
    button:hover { background: #4338ca; }
    .counter { font-size: 32px; font-weight: 700; color: #4f46e5; margin: 12px 0; }
  </style>
</head>
<body>
  <h1>Hello, HTML Viewer!</h1>
  <p>Edit the HTML on the left to see a live preview here.</p>

  <div class="card">
    <p>JavaScript works too — try clicking the button:</p>
    <div class="counter" id="count">0</div>
    <button onclick="document.getElementById('count').textContent = ++n">Click to count</button>
  </div>

  <script>
    let n = 0
  </script>
</body>
</html>`

export default function HtmlViewerPage() {
  const [source, setSource] = useState(SAMPLE)
  const [preview, setPreview] = useState(SAMPLE)
  const [autoRefresh, setAutoRefresh] = useState(true)

  const handleChange = useCallback((e) => {
    setSource(e.target.value)
    if (autoRefresh) setPreview(e.target.value)
  }, [autoRefresh])

  const handleRun = () => setPreview(source)

  const handleClear = () => {
    setSource('')
    setPreview('')
  }

  const handleSample = () => {
    setSource(SAMPLE)
    setPreview(SAMPLE)
  }

  const handleDownload = () => {
    const blob = new Blob([source], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'index.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="container" style={{ maxWidth: 1200 }}>
      <Link href="/" className="back-link">Back to Home</Link>
      <h1>HTML Viewer</h1>
      <p className="subtitle">Write or paste HTML on the left — live preview renders on the right. Scripts run inside a sandboxed iframe.</p>

      <div className="hv-toolbar">
        <label className="hv-auto-toggle">
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={e => setAutoRefresh(e.target.checked)}
          />
          Auto-refresh
        </label>
        {!autoRefresh && (
          <button className="hv-btn hv-btn-run" onClick={handleRun}>▶ Run</button>
        )}
        <button className="hv-btn hv-btn-sample" onClick={handleSample}>Load Sample</button>
        <button className="hv-btn hv-btn-download" onClick={handleDownload}>Download .html</button>
        <button className="hv-btn hv-btn-clear" onClick={handleClear}>Clear</button>
      </div>

      <div className="hv-layout">
        <div className="hv-pane">
          <div className="hv-pane-label">HTML Editor</div>
          <textarea
            className="hv-source"
            value={source}
            onChange={handleChange}
            placeholder="Paste or write your HTML here…"
            spellCheck={false}
          />
        </div>

        <div className="hv-pane">
          <div className="hv-pane-label">Preview</div>
          <iframe
            className="hv-preview"
            srcDoc={preview || '<body style="display:flex;align-items:center;justify-content:center;height:100%;font-family:sans-serif;color:#94a3b8;font-size:14px;">Preview will appear here</body>'}
            sandbox="allow-scripts allow-forms allow-modals"
            title="HTML Preview"
          />
        </div>
      </div>
    </div>
  )
}
