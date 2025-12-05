#!/usr/bin/env node

/**
 * SEO Audit Script
 * Validates SEO implementation for AtherTechy website
 */

const https = require('https');
const http = require('http');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const AGENCY_NAME = 'AtherTechy';
const PHONE = '03434153736';
const EMAIL = 'muhammadather212437@gmail.com';

const results = {
    passed: [],
    failed: [],
    warnings: []
};

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        client.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
        }).on('error', reject);
    });
}

async function checkHomepageMeta() {
    console.log('\n🔍 Checking homepage metadata...');
    try {
        const response = await makeRequest(BASE_URL);
        const html = response.body;

        // Check title
        if (html.includes('<title>') && html.includes(AGENCY_NAME)) {
            results.passed.push('✅ Homepage has title tag with agency name');
        } else {
            results.failed.push('❌ Homepage missing proper title tag');
        }

        // Check meta description
        if (html.includes('name="description"') && html.match(/content="[^"]{50,160}"/)) {
            results.passed.push('✅ Meta description present (50-160 chars)');
        } else {
            results.failed.push('❌ Meta description missing or incorrect length');
        }

        // Check canonical
        if (html.includes('rel="canonical"')) {
            results.passed.push('✅ Canonical URL present');
        } else {
            results.failed.push('❌ Canonical URL missing');
        }

        // Check OpenGraph
        if (html.includes('property="og:title"') && html.includes('property="og:description"')) {
            results.passed.push('✅ OpenGraph tags present');
        } else {
            results.failed.push('❌ OpenGraph tags missing');
        }

        // Check Twitter Card
        if (html.includes('name="twitter:card"')) {
            results.passed.push('✅ Twitter Card meta present');
        } else {
            results.failed.push('❌ Twitter Card meta missing');
        }

        // Check JSON-LD Organization schema
        if (html.includes('"@type":"Organization"') || html.includes('"@type": "Organization"')) {
            results.passed.push('✅ Organization schema present');
        } else {
            results.failed.push('❌ Organization schema missing');
        }

        // Check LocalBusiness schema
        if (html.includes('"@type":"LocalBusiness"') || html.includes('"@type": "LocalBusiness"')) {
            results.passed.push('✅ LocalBusiness schema present');
        } else {
            results.warnings.push('⚠️  LocalBusiness schema not found (optional)');
        }

    } catch (error) {
        results.failed.push(`❌ Failed to fetch homepage: ${error.message}`);
    }
}

async function checkSitemap() {
    console.log('\n🔍 Checking sitemap...');
    try {
        const response = await makeRequest(`${BASE_URL}/sitemap.xml`);

        if (response.statusCode === 200) {
            results.passed.push('✅ Sitemap accessible at /sitemap.xml');

            const xml = response.body;
            if (xml.includes('<urlset') && xml.includes('<url>')) {
                results.passed.push('✅ Sitemap contains valid XML structure');
            } else {
                results.failed.push('❌ Sitemap XML structure invalid');
            }

            if (xml.includes('<lastmod>')) {
                results.passed.push('✅ Sitemap includes lastmod timestamps');
            } else {
                results.warnings.push('⚠️  Sitemap missing lastmod timestamps');
            }

            const urlCount = (xml.match(/<loc>/g) || []).length;
            if (urlCount >= 3) {
                results.passed.push(`✅ Sitemap contains ${urlCount} URLs`);
            } else {
                results.warnings.push(`⚠️  Sitemap only has ${urlCount} URLs`);
            }
        } else {
            results.failed.push(`❌ Sitemap returned status ${response.statusCode}`);
        }
    } catch (error) {
        results.failed.push(`❌ Sitemap check failed: ${error.message}`);
    }
}

async function checkRobots() {
    console.log('\n🔍 Checking robots.txt...');
    try {
        const response = await makeRequest(`${BASE_URL}/robots.txt`);

        if (response.statusCode === 200) {
            results.passed.push('✅ robots.txt accessible');

            const txt = response.body;
            if (txt.includes('User-agent:')) {
                results.passed.push('✅ robots.txt has User-agent directive');
            } else {
                results.failed.push('❌ robots.txt missing User-agent');
            }

            if (txt.includes('Sitemap:') && txt.includes('/sitemap.xml')) {
                results.passed.push('✅ robots.txt includes sitemap location');
            } else {
                results.failed.push('❌ robots.txt missing sitemap reference');
            }
        } else {
            results.failed.push(`❌ robots.txt returned status ${response.statusCode}`);
        }
    } catch (error) {
        results.failed.push(`❌ robots.txt check failed: ${error.message}`);
    }
}

async function runAudit() {
    console.log('🚀 Starting SEO Audit for', BASE_URL);
    console.log('================================================');

    await checkHomepageMeta();
    await checkSitemap();
    await checkRobots();

    // Print results
    console.log('\n\n📊 AUDIT RESULTS');
    console.log('================================================');

    if (results.passed.length > 0) {
        console.log('\n✅ PASSED CHECKS:', results.passed.length);
        results.passed.forEach(msg => console.log(msg));
    }

    if (results.warnings.length > 0) {
        console.log('\n⚠️  WARNINGS:', results.warnings.length);
        results.warnings.forEach(msg => console.log(msg));
    }

    if (results.failed.length > 0) {
        console.log('\n❌ FAILED CHECKS:', results.failed.length);
        results.failed.forEach(msg => console.log(msg));
    }

    console.log('\n================================================');
    console.log(`SCORE: ${results.passed.length}/${results.passed.length + results.failed.length} checks passed`);

    if (results.failed.length === 0) {
        console.log('✅ SEO audit passed!');
        process.exit(0);
    } else {
        console.log('❌ SEO audit failed. Please fix the issues above.');
        process.exit(1);
    }
}

runAudit();
