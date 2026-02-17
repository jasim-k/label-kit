# LabelKit

A free, open-source barcode and Apple 2D code generator built with Next.js. Generate barcodes and Apple 2D codes instantly in your browser and download them as PDF.

## Features

- **Barcode Generator** - Generate Code 128 barcodes in bulk. Paste one value per line, generate, and download all as a single PDF.
- **Apple 2D Code Generator** - Generate custom Apple 2D codes with Part Number, Box ID, Serial Numbers, IMEI 1, and IMEI 2 data. Produces 3 coded labels (V3, V4, V6 formats) and exports them as a single PDF.
- **PDF Export** - One-click download of all generated codes as a clean, print-ready PDF.
- **SEO Optimized** - Server-side rendered with Next.js for fast loading and search engine visibility.

## Apple 2D Code Format

The generator produces three 2D codes per entry:

| Code | Prefix | Data Format |
|------|--------|-------------|
| 1 | V3 | `V3,SSCC00{BoxId},GTIN00194253264743,SSC{BoxId},MPN{PartNumber},QTY{n},{Serial1},{Serial2},...` |
| 2 | V4 | `V4,SSCC00{BoxId},GTIN00194253264743,SSC{BoxId},MPN{PartNumber},QTY{n},IMEI{IMEI1_1},IMEI{IMEI1_2},...` |
| 3 | V6 | `V6,SSCC00{BoxId},GTIN00194253264743,SSC{BoxId},MPN{PartNumber},QTY{n},SIMEI{IMEI2_1},SIMEI{IMEI2_2},...` |

## Getting Started

### Prerequisites

- Node.js 18.x or later

### Installation

```bash
git clone https://github.com/jasim-k/LabelKit.git
cd LabelKit
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [JsBarcode](https://github.com/lindell/JsBarcode) - Code 128 barcode generation
- [qrcode.react](https://github.com/zpao/qrcode.react) - 2D code rendering
- [jsPDF](https://github.com/parallax/jsPDF) - Client-side PDF generation

## Project Structure

```
app/
  layout.jsx              # Root layout with global SEO metadata
  page.jsx                # Landing page
  globals.css             # Global styles
  barcode/page.jsx        # Barcode generator route
  apple-2d-code/page.jsx  # Apple 2D code generator route
components/
  LandingPage.jsx         # Landing page UI
  BarcodePage.jsx         # Barcode generator UI
  Apple2DCodePage.jsx     # Apple 2D code generator UI
  CodeItem2D.jsx          # Individual 2D code display component
```

## License

MIT
