# LabelKit

A free, open-source label and QR code generation suite built with Next.js. Generate barcodes, Apple 2D codes, Wi-Fi QR codes, and contact cards entirely in your browser — no server, no sign-up.

## Tools

### Barcode Generator
Generate Code 128 barcodes in bulk. Paste one value per line, generate, and download all as a single print-ready PDF.

### Apple 2D Code Generator
Generate custom Apple 2D codes with Part Number, Box ID, Serial Numbers, IMEI 1, and IMEI 2 data. Produces three coded labels (V3, V4, V6 formats) and exports them as a PDF.

### Wi-Fi QR Code Maker
Fill in your network name, password, and security type (WPA/WEP/None). Generates a standard `WIFI:` QR code — scan with any phone to connect instantly without typing.

### Contact QR Code Maker
Enter a name, phone number, email, and company. Generates a vCard 3.0 QR code — scan with any phone to save the contact in one tap.

---

## Apple 2D Code Format

The generator produces three QR codes per entry:

| Code | Prefix | Data |
|------|--------|------|
| 1 | V3 | `V3,SSCC00{BoxId},GTIN00194253264743,SSC{BoxId},MPN{PartNumber},QTY{n},{Serial1},{Serial2},...` |
| 2 | V4 | `V4,SSCC00{BoxId},GTIN00194253264743,SSC{BoxId},MPN{PartNumber},QTY{n},IMEI{IMEI1_1},IMEI{IMEI1_2},...` |
| 3 | V6 | `V6,SSCC00{BoxId},GTIN00194253264743,SSC{BoxId},MPN{PartNumber},QTY{n},SIMEI{IMEI2_1},SIMEI{IMEI2_2},...` |

## Wi-Fi QR Format

```
WIFI:S:{SSID};T:{WPA|WEP|nopass};P:{Password};;
```

## Contact QR Format (vCard 3.0)

```
BEGIN:VCARD
VERSION:3.0
FN:{Full Name}
ORG:{Company}
TEL:{Phone}
EMAIL:{Email}
END:VCARD
```

---

## Getting Started

### Prerequisites

- Node.js 18+

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

---

## Tech Stack

| Package | Purpose |
|---------|---------|
| [Next.js 15](https://nextjs.org/) | React framework with App Router |
| [JsBarcode](https://github.com/lindell/JsBarcode) | Code 128 barcode generation |
| [qrcode.react](https://github.com/zpao/qrcode.react) | QR code rendering (2D codes, Wi-Fi, contact) |
| [jsPDF](https://github.com/parallax/jsPDF) | Client-side PDF generation |

---

## Project Structure

```
app/
  layout.jsx                # Root layout with global SEO metadata
  page.jsx                  # Landing page
  globals.css               # Global styles
  barcode/page.jsx          # Barcode generator route
  apple-2d-code/page.jsx    # Apple 2D code generator route
  wifi-qr/page.jsx          # Wi-Fi QR code maker route
  contact-qr/page.jsx       # Contact QR code maker route
components/
  LandingPage.jsx           # Landing page UI
  BarcodePage.jsx           # Barcode generator UI
  Apple2DCodePage.jsx       # Apple 2D code generator UI
  CodeItem2D.jsx            # Individual 2D code display component
  WifiQRPage.jsx            # Wi-Fi QR code maker UI
  ContactQRPage.jsx         # Contact QR code maker UI
```

---

## License

MIT
