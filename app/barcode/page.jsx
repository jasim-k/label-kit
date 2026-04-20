import BarcodePage from '../../components/BarcodePage'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Free Barcode Generator',
  url: 'https://my-toolhaus.vercel.app/barcode',
  description: 'Generate Code 128 barcodes in bulk for free. Paste values, generate instantly, download as PDF.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: ['Bulk barcode generation', 'Code 128 format', 'PDF export', 'No sign-up required'],
}

export const metadata = {
  title: 'Free Barcode Generator Online — Bulk Code 128 & PDF Export',
  description: 'Free online barcode generator. Create Code 128 barcodes in bulk — paste your values, generate instantly, and download all as a single print-ready PDF. No sign-up needed.',
  keywords: [
    'free barcode generator',
    'barcode generator',
    'barcode generator online',
    'code 128 barcode generator',
    'bulk barcode generator',
    'barcode maker online',
    'barcode generator free',
    'online barcode generator',
    'print barcodes pdf',
    'free barcode maker',
  ],
  alternates: { canonical: '/barcode' },
  openGraph: {
    title: 'Free Barcode Generator Online — Bulk Code 128 & PDF Export',
    description: 'Generate Code 128 barcodes in bulk. Paste values, generate instantly, download all as PDF. Free, no sign-up.',
    url: '/barcode',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Free Barcode Generator Online',
    description: 'Bulk Code 128 barcode generator with PDF export. Free, browser-based, no sign-up.',
  },
}

export default function Barcode() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BarcodePage />
    </>
  )
}
