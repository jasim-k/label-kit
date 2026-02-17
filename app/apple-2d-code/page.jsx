import Apple2DCodePage from '../../components/Apple2DCodePage'

export const metadata = {
  title: 'Apple 2D Code Generator - Custom Codes with IMEI & Serial Data',
  description: 'Generate custom Apple 2D codes with Part Number, Box ID, Serial Numbers, IMEI 1, and IMEI 2 data. Creates V3, V4, V6 format codes. Download all codes as a single PDF file free.',
  keywords: ['Apple 2D code', '2D code generator', 'IMEI code generator', 'serial number code', 'part number barcode', 'Apple 2D PDF', 'V3 V4 V6 code', 'SSCC GTIN code'],
  alternates: {
    canonical: '/apple-2d-code',
  },
  openGraph: {
    title: 'Apple 2D Code Generator - IMEI & Serial Data',
    description: 'Generate custom Apple 2D codes with Part Number, Box ID, Serial & IMEI data. Download as PDF free.',
    url: '/apple-2d-code',
  },
}

export default function Apple2DCode() {
  return <Apple2DCodePage />
}
