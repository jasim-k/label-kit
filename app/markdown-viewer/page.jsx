import MarkdownViewerPage from '../../components/MarkdownViewerPage'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Markdown Viewer',
  url: 'https://my-toolhaus.vercel.app/markdown-viewer',
  description: 'Free online Markdown viewer with live preview. Paste Markdown and instantly see the rendered output.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: ['Live preview', 'Headings, lists, code blocks', 'Links & images', 'No sign-up required'],
}

export const metadata = {
  title: 'Free Markdown Viewer Online — Live Preview & Renderer',
  description: 'Free online Markdown viewer with live preview. Paste your Markdown on the left and instantly see the rendered output on the right. Supports headings, code blocks, lists, links and more.',
  keywords: [
    'markdown viewer online',
    'markdown viewer',
    'markdown preview',
    'markdown renderer online',
    'online markdown editor',
    'markdown live preview',
    'markdown to html',
    'free markdown viewer',
    'markdown editor online',
    'markdown preview tool',
  ],
  alternates: { canonical: '/markdown-viewer' },
  openGraph: {
    title: 'Free Markdown Viewer Online — Live Preview',
    description: 'Paste Markdown and instantly see the rendered preview. Supports headings, code, lists & more. Free.',
    url: '/markdown-viewer',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Free Markdown Viewer Online',
    description: 'Live Markdown preview in your browser. Paste and see it rendered instantly. Free.',
  },
}

export default function MarkdownViewer() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarkdownViewerPage />
    </>
  )
}
