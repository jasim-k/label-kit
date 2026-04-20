import Apple2DCodePage from '../../components/Apple2DCodePage'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Apple 2D Code Generator',
  url: 'https://my-toolhaus.vercel.app/apple-2d-code',
  description: 'Generate Apple 2D codes with Part Number, Box ID, Serial, and IMEI data in V3, V4, V6 format. Export as PDF.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: ['V3 V4 V6 format', 'IMEI & Serial support', 'Bulk PDF export', 'No sign-up required'],
}

export const metadata = {
  title: 'Apple 2D Code Generator — IMEI, Serial & Part Number Codes Free',
  description: 'Free Apple 2D code generator. Create V3, V4, V6 format codes with Part Number, Box ID, Serial Numbers, and IMEI data. Download all as a single PDF. No sign-up required.',
  keywords: [
    'Apple 2D code generator',
    'Apple 2D code',
    '2D code generator',
    'IMEI barcode generator',
    'serial number barcode',
    'part number barcode',
    'PDF417 barcode generator',
    'V3 V4 V6 code',
    'Apple label generator',
    'IMEI label generator',
  ],
  alternates: { canonical: '/apple-2d-code' },
  openGraph: {
    title: 'Apple 2D Code Generator — IMEI, Serial & Part Number',
    description: 'Generate Apple 2D codes with IMEI, Serial, Part Number & Box ID. V3/V4/V6 format. Export as PDF free.',
    url: '/apple-2d-code',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Apple 2D Code Generator — Free',
    description: 'Generate Apple 2D codes with IMEI, Serial & Part Number data. Export as PDF.',
  },
}

export default function Apple2DCode() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Apple2DCodePage />
    </>
  )
}
