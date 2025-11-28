'use client';

import React from 'react';

export default function StructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "AtherTechy",
        "alternateName": "Ather Web Agency",
        "url": "https://athertechy.onrender.com",
        "logo": "https://athertechy.onrender.com/faviicon.png",
        "description": "Premium software development agency specializing in web applications, Shopify stores, UI/UX design, SEO, and AI solutions.",
        "foundingDate": "2023",
        "founders": [
            {
                "@type": "Person",
                "name": "Ather"
            }
        ],
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "PK",
            "addressRegion": "Punjab",
            "addressLocality": "Lahore"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+92-343-4153736",
            "contactType": "Customer Service",
            "areaServed": "Worldwide",
            "availableLanguage": ["English", "Urdu"]
        },
        "email": "muhammadather212437@gmail.com",
        "sameAs": [
            "https://www.facebook.com/athertechy",
            "https://www.linkedin.com/company/athertechy",
            "https://twitter.com/athertechy",
            "https://github.com/athertechy"
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "50",
            "bestRating": "5",
            "worstRating": "1"
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "AtherTechy",
        "url": "https://athertechy.onrender.com",
        "description": "Professional web development agency offering custom solutions for modern businesses",
        "publisher": {
            "@type": "Organization",
            "name": "AtherTechy"
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://athertechy.onrender.com/?s={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    const servicesSchema = [
        {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Shopify Development",
            "provider": {
                "@type": "Organization",
                "name": "AtherTechy"
            },
            "description": "Custom Shopify store development with premium themes, conversion optimization, and full e-commerce setup",
            "areaServed": "Worldwide",
            "offers": {
                "@type": "Offer",
                "priceCurrency": "USD",
                "price": "500",
                "priceSpecification": {
                    "@type": "PriceSpecification",
                    "priceCurrency": "USD",
                    "price": "500",
                    "minPrice": "500",
                    "maxPrice": "5000"
                }
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Web Application Development",
            "provider": {
                "@type": "Organization",
                "name": "AtherTechy"
            },
            "description": "Custom web applications built with React, Next.js, and modern technologies for startups and enterprises",
            "areaServed": "Worldwide"
        },
        {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "UI/UX Design",
            "provider": {
                "@type": "Organization",
                "name": "AtherTechy"
            },
            "description": "Professional UI/UX design services focused on conversion, user experience, and modern aesthetics",
            "areaServed": "Worldwide"
        },
        {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "SEO Optimization",
            "provider": {
                "@type": "Organization",
                "name": "AtherTechy"
            },
            "description": "Technical SEO, on-page optimization, and search engine ranking improvements for better visibility",
            "areaServed": "Worldwide"
        },
        {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "AI Solutions",
            "provider": {
                "@type": "Organization",
                "name": "AtherTechy"
            },
            "description": "AI-powered solutions including chatbots, automation, and intelligent features for modern applications",
            "areaServed": "Worldwide"
        }
    ];

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://athertechy.onrender.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://athertechy.onrender.com/#services"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Portfolio",
                "item": "https://athertechy.onrender.com/#portfolio"
            },
            {
                "@type": "ListItem",
                "position": 4,
                "name": "Contact",
                "item": "https://athertechy.onrender.com/#contact"
            }
        ]
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How long does a project take?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Timeline varies by complexity. A standard website takes 2-4 weeks, while custom web apps can take 8-12 weeks. We provide detailed timelines during consultation."
                }
            },
            {
                "@type": "Question",
                "name": "Do you offer maintenance?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we offer comprehensive maintenance packages to ensure your site remains secure, up-to-date, and performing optimally."
                }
            },
            {
                "@type": "Question",
                "name": "What is your payment structure?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We typically require a 50% deposit to start the project, with the remaining balance due upon successful delivery and your approval."
                }
            },
            {
                "@type": "Question",
                "name": "Can you help with hosting?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. We can recommend and set up the best hosting solution for your specific needs, whether it's shared hosting, VPS, or cloud infrastructure."
                }
            },
            {
                "@type": "Question",
                "name": "Do you work with international clients?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we work with clients worldwide. We're based in Pakistan but serve clients globally with remote collaboration tools and clear communication."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            {servicesSchema.map((schema, index) => (
                <script
                    key={index}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </>
    );
}
