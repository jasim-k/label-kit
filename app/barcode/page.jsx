import BarcodePage from '../../components/BarcodePage'

export const metadata = {
  title: 'Free Online Barcode Generator - Code 128 Bulk Barcodes',
  description: 'Generate Code 128 barcodes in bulk for free. Paste your values, generate barcodes instantly, and download them all as a single PDF file. No sign-up required.',
  keywords: ['barcode generator', 'Code 128 barcode', 'bulk barcode generator', 'PDF barcode', 'barcode maker', 'free barcode generator online', 'print barcodes'],
  alternates: {
    canonical: '/barcode',
  },
  openGraph: {
    title: 'Free Online Barcode Generator - Code 128',
    description: 'Generate Code 128 barcodes in bulk. Paste values, generate instantly, download as PDF.',
    url: '/barcode',
  },
}

export default function Barcode() {
  return <BarcodePage />
}
