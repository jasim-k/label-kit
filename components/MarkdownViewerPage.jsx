'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

const SAMPLE = `# Welcome to Markdown Viewer

Paste your Markdown on the left and see a **live preview** on the right.

## Features

- Headings (H1 – H6)
- **Bold** and *italic* text
- \`inline code\` and fenced code blocks
- [Links](https://example.com)
- Ordered and unordered lists
- Blockquotes

## Code Example

\`\`\`js
function greet(name) {
  return \`Hello, \${name}!\`
}
\`\`\`

> Tip: everything runs in your browser — nothing is sent anywhere.

---

1. Open the tool
2. Paste your Markdown
3. Done
`

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderMarkdown(raw) {
  const lines = raw.split('\n')
  const out = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Fenced code block
    if (/^```/.test(line)) {
      const lang = line.slice(3).trim()
      const codeLines = []
      i++
      while (i < lines.length && !/^```/.test(lines[i])) {
        codeLines.push(escapeHtml(lines[i]))
        i++
      }
      out.push(`<pre><code${lang ? ` class="lang-${escapeHtml(lang)}"` : ''}>${codeLines.join('\n')}</code></pre>`)
      i++
      continue
    }

    // Heading
    const hMatch = line.match(/^(#{1,6})\s+(.+)/)
    if (hMatch) {
      const level = hMatch[1].length
      out.push(`<h${level}>${inlineRender(hMatch[2])}</h${level}>`)
      i++
      continue
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
      out.push('<hr />')
      i++
      continue
    }

    // Blockquote
    if (/^> /.test(line)) {
      const bqLines = []
      while (i < lines.length && /^> /.test(lines[i])) {
        bqLines.push(lines[i].slice(2))
        i++
      }
      out.push(`<blockquote>${renderMarkdown(bqLines.join('\n'))}</blockquote>`)
      continue
    }

    // Unordered list
    if (/^[\s]*[-*+] /.test(line)) {
      const items = []
      while (i < lines.length && /^[\s]*[-*+] /.test(lines[i])) {
        items.push(`<li>${inlineRender(lines[i].replace(/^[\s]*[-*+] /, ''))}</li>`)
        i++
      }
      out.push(`<ul>${items.join('')}</ul>`)
      continue
    }

    // Ordered list
    if (/^\d+\. /.test(line)) {
      const items = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(`<li>${inlineRender(lines[i].replace(/^\d+\. /, ''))}</li>`)
        i++
      }
      out.push(`<ol>${items.join('')}</ol>`)
      continue
    }

    // Blank line
    if (line.trim() === '') {
      i++
      continue
    }

    // Paragraph — collect consecutive non-special lines
    const paraLines = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(#{1,6}\s|```|> |\s*[-*+] |\d+\. |---|===)/.test(lines[i])
    ) {
      paraLines.push(lines[i])
      i++
    }
    if (paraLines.length) {
      out.push(`<p>${inlineRender(paraLines.join('<br />'))}</p>`)
    }
  }

  return out.join('\n')
}

function inlineRender(text) {
  return text
    // Bold + italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, (_, code) => `<code>${escapeHtml(code)}</code>`)
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Strikethrough
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
}

export default function MarkdownViewerPage() {
  const [source, setSource] = useState(SAMPLE)

  const rendered = useMemo(() => renderMarkdown(source), [source])

  const handleClear = () => setSource('')
  const handleSample = () => setSource(SAMPLE)

  return (
    <div className="container" style={{ maxWidth: 1200 }}>
      <Link href="/" className="back-link">Back to Home</Link>
      <h1>Markdown Viewer</h1>
      <p className="subtitle">Paste Markdown on the left — live preview renders on the right. Runs entirely in your browser.</p>

      <div className="md-toolbar">
        <button className="md-btn-clear" onClick={handleClear}>Clear</button>
        <button className="md-btn-sample" onClick={handleSample}>Load Sample</button>
      </div>

      <div className="md-layout">
        <div className="md-pane">
          <div className="md-pane-label">Markdown</div>
          <textarea
            className="md-source"
            value={source}
            onChange={e => setSource(e.target.value)}
            placeholder="Paste your Markdown here…"
            spellCheck={false}
          />
        </div>

        <div className="md-pane">
          <div className="md-pane-label">Preview</div>
          <div
            className="md-preview"
            dangerouslySetInnerHTML={{ __html: rendered }}
          />
        </div>
      </div>
    </div>
  )
}
