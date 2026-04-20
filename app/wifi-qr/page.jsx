import WifiQRPage from '../../components/WifiQRPage'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Wi-Fi QR Code Generator',
  url: 'https://my-toolhaus.vercel.app/wifi-qr',
  description: 'Generate a Wi-Fi QR code that connects phones to your network instantly. Free, browser-based.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: ['WPA/WPA2/WEP support', 'PNG download', 'Instant QR generation', 'No sign-up required'],
}

export const metadata = {
  title: 'Free Wi-Fi QR Code Generator — Create WiFi QR Codes Instantly',
  description: 'Free Wi-Fi QR code generator. Enter your network name, password and security type — generate a QR code anyone can scan to connect instantly. Download as PNG. No sign-up.',
  keywords: [
    'wifi qr code generator',
    'wifi qr code',
    'free wifi qr code generator',
    'qr code wifi password',
    'wifi qr code maker',
    'wifi qr generator',
    'wi-fi qr code',
    'connect wifi qr code',
    'qr code generator wifi',
    'wireless qr code',
  ],
  alternates: { canonical: '/wifi-qr' },
  openGraph: {
    title: 'Free Wi-Fi QR Code Generator',
    description: 'Generate a Wi-Fi QR code in seconds. Scan to connect — no typing needed. Free, no sign-up.',
    url: '/wifi-qr',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Free Wi-Fi QR Code Generator',
    description: 'Generate a Wi-Fi QR code anyone can scan to connect instantly. Free, browser-based.',
  },
}

export default function WifiQR() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <WifiQRPage />
    </>
  )
}
