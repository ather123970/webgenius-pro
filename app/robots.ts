import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://www.athertechy.com';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin*', '/api/orders*'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
