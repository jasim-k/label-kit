export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://my-toolhaus.vercel.app/sitemap.xml',
  }
}
