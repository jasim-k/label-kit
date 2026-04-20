import HtmlViewerPage from '../../components/HtmlViewerPage'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'HTML Viewer & Editor Online',
  url: 'https://my-toolhaus.vercel.app/html-viewer',
  description: 'Free online HTML viewer and editor. Write or paste HTML and see a live preview with JavaScript support.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: ['Live HTML preview', 'JavaScript support', 'Download as .html', 'No sign-up required'],
}

export const metadata = {
  title: 'Free HTML Viewer & Editor Online — Live Preview with JavaScript',
  description: 'Free online HTML viewer and editor. Write or paste HTML and see a live preview instantly — JavaScript runs in a sandboxed iframe. Download your code as an .html file. No sign-up.',
  keywords: [
    'html viewer online',
    'html viewer',
    'online html editor',
    'html editor online',
    'html live preview',
    'html playground',
    'html preview online',
    'free html editor',
    'html code viewer',
    'online html viewer',
    'html sandbox online',
    'test html online',
  ],
  alternates: { canonical: '/html-viewer' },
  openGraph: {
    title: 'Free HTML Viewer & Editor Online — Live Preview',
    description: 'Write or paste HTML and see a live preview instantly. JavaScript supported. Download as .html. Free.',
    url: '/html-viewer',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Free HTML Viewer & Editor Online',
    description: 'Live HTML preview with JavaScript support. Free, browser-based, no sign-up.',
  },
}

export default function HtmlViewer() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HtmlViewerPage />
    </>
  )
}
