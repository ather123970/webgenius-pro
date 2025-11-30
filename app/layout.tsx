import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL('https://athertechy.onrender.com'),
    title: "AtherTechy - Premium Web Development & Shopify Agency | Pakistan",
    description: "Leading software agency in Pakistan specializing in custom web apps, Shopify stores, UI/UX design, SEO optimization, and AI solutions. Turn your ideas into profitable digital products with expert React, Next.js, and e-commerce development.",
    keywords: [
        // Core Services
        "web development agency pakistan",
        "shopify development pakistan",
        "custom web applications",
        "saas development",
        "ui ux design services",
        "seo optimization services",
        "ai solutions development",

        // Technologies
        "react development",
        "nextjs developer",
        "typescript development",
        "full stack development",
        "ecommerce development",

        // Location-based
        "software agency lahore",
        "web development lahore",
        "shopify expert pakistan",
        "pakistan web developers",

        // Service-specific
        "shopify store setup",
        "web app development",
        "mobile responsive design",
        "conversion optimization",
        "digital transformation",
        "startup mvp development",

        // Industry
        "software house pakistan",
        "digital agency",
        "tech solutions provider"
    ],
    authors: [{ name: "AtherTechy", url: "https://athertechy.onrender.com" }],
    creator: "AtherTechy",
    publisher: "AtherTechy",

    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/faviicon.png', type: 'image/png' }
        ],
        apple: '/faviicon.png',
        shortcut: '/favicon.ico',
    },

    manifest: "/manifest.json",

    openGraph: {
        title: "AtherTechy - Premium Web Development & Shopify Agency",
        description: "Transform your business with expert web development, Shopify stores, and custom software solutions. Trusted by 50+ brands worldwide for stunning, high-performance digital products.",
        type: "website",
        locale: "en_US",
        url: "https://athertechy.onrender.com",
        siteName: "AtherTechy",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "AtherTechy - Premium Web Development Agency",
            }
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "AtherTechy - Premium Web Development & Shopify Agency",
        description: "Expert web apps, Shopify stores & AI solutions. From MVP to full-scale SaaS. Trusted by 50+ brands worldwide.",
        images: ["/og-image.png"],
        creator: "@athertechy",
        site: "@athertechy",
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    alternates: {
        canonical: "https://athertechy.onrender.com",
    },

    category: "technology",

    verification: {
        google: "your-google-verification-code", // Replace with actual code from Google Search Console
    },

    other: {
        "revisit-after": "7 days",
        "rating": "General",
        "distribution": "Global",
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
                <meta name="theme-color" content="#2563eb" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className="antialiased">
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-SJM3ZKQCP2"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-SJM3ZKQCP2');
                    `}
                </Script>
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=AW-17769509334"
                    strategy="afterInteractive"
                />
                <Script id="google-tag-manager" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'AW-17769509334');
                    `}
                </Script>
                {children}
            </body>
        </html>
    );
}
