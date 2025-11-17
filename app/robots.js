import { MetadataRoute } from 'next';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
    ],
    sitemap: 'https://srama.co.in/sitemap.xml',
    host: 'https://srama.co.in',
  };
}
