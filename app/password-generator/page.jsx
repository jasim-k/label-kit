import PasswordGeneratorPage from '../../components/PasswordGeneratorPage'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Password Generator',
  url: 'https://my-toolhaus.vercel.app/password-generator',
  description: 'Free cryptographically secure password generator. Custom length, character sets, bulk generation. Runs entirely in your browser.',
  applicationCategory: 'SecurityApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Cryptographically secure (crypto.getRandomValues)',
    'Custom length up to 128 characters',
    'Uppercase, lowercase, numbers, symbols',
    'Bulk generation up to 50 passwords',
    'No sign-up required',
  ],
}

export const metadata = {
  title: 'Free Password Generator — Strong & Secure Random Passwords Online',
  description: 'Free secure password generator. Create strong random passwords with custom length, uppercase, lowercase, numbers and symbols. Generate up to 50 passwords at once. Runs in your browser — nothing is sent anywhere.',
  keywords: [
    'password generator',
    'free password generator',
    'random password generator',
    'strong password generator',
    'secure password generator',
    'password generator online',
    'password maker',
    'generate strong password',
    'random password',
    'bulk password generator',
    'password creator',
    'safe password generator',
  ],
  alternates: { canonical: '/password-generator' },
  openGraph: {
    title: 'Free Password Generator — Strong & Secure',
    description: 'Generate strong random passwords instantly. Custom length, character sets, bulk generation. Free, nothing sent anywhere.',
    url: '/password-generator',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Free Password Generator Online',
    description: 'Generate strong random passwords. Custom options, bulk generation. Free, browser-based.',
  },
}

export default function PasswordGenerator() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PasswordGeneratorPage />
    </>
  )
}
