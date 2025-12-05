# SEO Implementation Guide

## Overview
This guide explains the comprehensive SEO implementation for AtherTechy, including metadata, structured data, sitemaps, and verification.

## What Was Implemented

### 1. Dynamic Sitemap (`app/sitemap.ts`)
- Auto-generated XML sitemap at `/sitemap.xml`
- Includes all public pages with proper priorities and change frequencies
- Updates `lastModified` automatically

### 2. Dynamic Robots.txt (`app/robots.ts`)
- Auto-generated robots.txt at `/robots.txt`
- Configured to allow all search engines
- Protects `/admin*` and `/api/orders*` paths
- Points to sitemap location

### 3. Structured Data (`app/components/StructuredData.tsx`)
- **Organization Schema**: Business information, contact details, aggregate rating
- **LocalBusiness Schema**: NAP (Name, Address, Phone), opening hours
- **Website Schema**: Site search functionality
- **Service Schemas**: All 5 services (Shopify, Web Apps, UI/UX, SEO, AI)
- **Breadcrumb Schema**: Site navigation structure
- **FAQ Schema**: Common questions and answers

### 4. Canonical URLs & Redirects (`next.config.js`)
- Redirect `athertechy.com` → `www.athertechy.com`
- Redirect `athertechy.onrender.com` → `www.athertechy.com`
- All URLs canonicalized to HTTPS with www

### 5. SEO Audit Script (`scripts/seo-audit.js`)
- Automated testing for metadata presence
- Validates sitemap and robots.txt
- Checks structured data implementation
- Provides pass/fail report

## Config Values
```javascript
BASE_URL: https://www.athertechy.com
AGENCY_NAME: AtherTechy
PHONE: 03434153736
EMAIL: muhammadather212437@gmail.com
ADDRESS: Lahore, Pakistan
```

## How to Use

### Running the SEO Audit
```bash
# Start the development server
npm run dev

# In another terminal, run the audit
node scripts/seo-audit.js
```

### Verifying in Google Search Console

#### Step 1: Add Property
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://www.athertechy.com`

#### Step 2: Verify Ownership
You already have the verification file at:
`/public/googlec8c9b2366cb0c363.html`

Alternatively, you can verify via DNS or HTML tag.

#### Step 3: Submit Sitemap
1. In Google Search Console, go to **Sitemaps**
2. Enter: `https://www.athertechy.com/sitemap.xml`
3. Click **Submit**

**Or use the ping method:**
```bash
curl "https://www.google.com/ping?sitemap=https://www.athertechy.com/sitemap.xml"
```

### Lighthouse SEO Audit
```bash
# Install Lighthouse CLI (if not installed)
npm install -g lighthouse

# Run audit
lighthouse https://www.athertechy.com --only-categories=seo --view
```

## Acceptance Checklist

- [x] Homepage has proper `<title>` with agency name
- [x] Meta description is 50-160 characters  
- [x] Canonical URLs are set correctly
- [x] OpenGraph and Twitter Card tags present
- [x] Organization JSON-LD schema implemented
- [x] LocalBusiness JSON-LD schema implemented
- [x] `/sitemap.xml` accessible and valid
- [x] `/robots.txt` includes sitemap reference
- [x] Canonical redirects configured (non-www → www)
- [x] Google verification file present

## Troubleshooting

### Sitemap Not Updating
The sitemap is dynamically generated. Changes require a rebuild:
```bash
npm run build
```

### Redirects Not Working
Redirects only work in production builds. Test with:
```bash
npm run build
npm start
```

### Structured Data Errors
Validate using [Google's Rich Results Test](https://search.google.com/test/rich-results):
```
https://www.athertechy.com
```

## Next Steps

1. **Deploy to Production**: Push changes to GitHub and deploy to Render
2. **Verify in GSC**: Complete Google Search Console verification
3. **Submit Sitemap**: Submit sitemap URL in GSC
4. **Monitor Performance**: Check Search Console for indexing status
5. **Run Regular Audits**: Use the audit script weekly

## Additional Resources

- [Google Search Console](https://search.google.com/search-console)
- [Next.js Metadata Documentation](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Schema.org Documentation](https://schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
