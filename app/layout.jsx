import './globals.css'

export const viewport = {
  themeColor: '#6366f1',
}

const siteUrl = 'https://my-toolhaus.vercel.app'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Toolhaus - Free Browser-Based Developer Tools',
    template: '%s | Toolhaus',
  },
  description: 'Free browser-based tools for developers — barcodes, QR codes, Markdown viewer, HTML playground, password generator, and more. No sign-up required.',
  keywords: ['barcode generator', 'QR code generator', 'password generator', 'markdown viewer', 'html viewer', 'Apple 2D code', 'Code 128', 'PDF barcode', 'Toolhaus', 'free developer tools', 'browser tools'],
  authors: [{ name: 'Jasim K' }],
  creator: 'Jasim K',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Toolhaus - Free Browser-Based Developer Tools',
    description: 'Free browser-based tools — barcodes, QR codes, Markdown, HTML, passwords and more. Runs entirely in your browser.',
    url: siteUrl,
    siteName: 'Toolhaus',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Toolhaus - Free Browser-Based Developer Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toolhaus - Free Browser-Based Developer Tools',
    description: 'Free browser-based tools — barcodes, QR codes, Markdown, HTML, passwords and more.',
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
              name: 'Toolhaus',
              url: siteUrl,
              description: 'Free browser-based developer tools — barcodes, QR codes, Markdown, HTML, passwords and more.',
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
