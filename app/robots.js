export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://label-kit.vercel.app/sitemap.xml',
  }
}
