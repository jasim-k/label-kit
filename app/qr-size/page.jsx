import QRSizeOptimizerPage from '../../components/QRSizeOptimizerPage'

export const metadata = {
    title: 'QR Size Optimizer',
    description:
        'Calculate the minimum safe print size for a QR code based on content length, error correction level, and print reliability. Free, browser-based, no sign-up.',
    alternates: {
        canonical: 'https://label-kit.vercel.app/qr-size',
    },
}

export default function Page() {
    return <QRSizeOptimizerPage />
}
