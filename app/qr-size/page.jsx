import QRSizeOptimizerPage from '../../components/QRSizeOptimizerPage'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'QR Code Size Calculator',
  url: 'https://my-toolhaus.vercel.app/qr-size',
  description: 'Calculate the minimum safe print size for any QR code based on content, error correction level, and print reliability.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: ['Minimum size calculation', 'mm, cm, inch output', 'Error correction guidance', 'No sign-up required'],
}

export const metadata = {
  title: 'QR Code Size Calculator — Minimum Safe Print Size Online',
  description: 'Free QR code size calculator. Find the minimum safe print size for any QR code — input your content, choose error correction level, get exact dimensions in mm, cm and inches.',
  keywords: [
    'qr code size calculator',
    'qr code minimum size',
    'qr code print size',
    'qr code size guide',
    'qr code dimensions',
    'minimum qr code size',
    'qr code size mm',
    'qr code size optimizer',
    'safe qr code size',
    'qr code print guide',
  ],
  alternates: { canonical: '/qr-size' },
  openGraph: {
    title: 'QR Code Size Calculator — Minimum Safe Print Size',
    description: 'Calculate the minimum safe print size for any QR code. Get exact mm, cm and inch dimensions free.',
    url: '/qr-size',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'QR Code Size Calculator',
    description: 'Find the minimum safe print size for your QR code. Free, browser-based.',
  },
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <QRSizeOptimizerPage />
    </>
  )
}
