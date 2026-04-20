import ContactQRPage from '../../components/ContactQRPage'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Contact QR Code Generator',
  url: 'https://my-toolhaus.vercel.app/contact-qr',
  description: 'Generate a vCard QR code from name, phone, email and company. Scan to save the contact in one tap.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: ['vCard format', 'PNG download', 'Name, phone, email, company', 'No sign-up required'],
}

export const metadata = {
  title: 'Free Contact QR Code Generator — vCard QR Codes Online',
  description: 'Free contact QR code generator. Enter a name, phone, email and company — create a vCard QR code anyone can scan to save the contact instantly. Download as PNG. No sign-up.',
  keywords: [
    'contact qr code generator',
    'vcard qr code generator',
    'vcard qr code',
    'contact qr code',
    'business card qr code',
    'qr code contact',
    'free contact qr code',
    'phone number qr code',
    'qr code vcard',
    'digital business card qr',
  ],
  alternates: { canonical: '/contact-qr' },
  openGraph: {
    title: 'Free Contact QR Code Generator — vCard QR Codes',
    description: 'Create a vCard QR code from name, phone, email & company. Scan to save the contact in one tap. Free.',
    url: '/contact-qr',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Free Contact QR Code Generator',
    description: 'Generate a vCard QR code. Scan to save contact in one tap. Free, no sign-up.',
  },
}

export default function ContactQR() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContactQRPage />
    </>
  )
}
