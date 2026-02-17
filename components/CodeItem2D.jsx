'use client'

import { QRCodeCanvas } from 'qrcode.react'

export default function CodeItem2D({ value, label }) {
  return (
    <div className="code-2d-item">
      <QRCodeCanvas value={value} size={128} level="H" includeMargin={true} />
      <div className="code-2d-label">{label}</div>
    </div>
  )
}
