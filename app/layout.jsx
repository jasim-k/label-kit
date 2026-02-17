import './globals.css'

export const viewport = {
  themeColor: '#6366f1',
}

const siteUrl = 'https://label-kit.vercel.app'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'LabelKit - Free Online Barcode & Apple 2D Code Generator',
    template: '%s | LabelKit',
  },
  description: 'Free online barcode and Apple 2D code generator. Create Code 128 barcodes and custom Apple 2D codes with Part Number, Box ID, Serial, and IMEI data. Download as PDF instantly. No sign-up required.',
  keywords: ['barcode generator', 'Apple 2D code', '2D code generator', 'Code 128', 'PDF barcode', 'IMEI barcode', 'serial number barcode', 'LabelKit', 'free barcode maker', 'bulk barcode generator', 'barcode to PDF'],
  authors: [{ name: 'Jasim K' }],
  creator: 'Jasim K',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'LabelKit - Free Online Barcode & Apple 2D Code Generator',
    description: 'Generate barcodes and Apple 2D codes instantly. Bulk Code 128 barcodes, custom Apple 2D codes with IMEI & serial data. Download as PDF free.',
    url: siteUrl,
    siteName: 'LabelKit',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'LabelKit - Free Barcode & Apple 2D Code Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LabelKit - Free Barcode & Apple 2D Code Generator',
    description: 'Generate barcodes and Apple 2D codes instantly. Download as PDF free.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'LabelKit',
              url: siteUrl,
              description: 'Free online barcode and Apple 2D code generator with PDF export.',
              applicationCategory: 'UtilityApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              author: {
                '@type': 'Person',
                name: 'Jasim K',
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
