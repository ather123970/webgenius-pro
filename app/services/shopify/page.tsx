'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight, FiArrowLeft, FiShoppingCart, FiTrendingUp, FiZap } from 'react-icons/fi';
import { SiShopify } from 'react-icons/si';
import Link from 'next/link';
import Header from '@/app/components/sections/Header';
import Footer from '@/app/components/sections/Footer';
import { useGeolocation, formatGeoPrice } from '@/app/lib/useGeolocation';

export default function ShopifyPage() {
    const geoData = useGeolocation();

    const packagesData = [
        { name: 'Affordable', basePricePKR: 30000, features: ['Basic Theme Setup', '10 Products', 'Payment Setup', 'Basic SEO', '1 Month Support'], delivery: '1-2 weeks' },
        { name: 'Branded Pro', basePricePKR: 70000, features: ['Premium Theme', '30 Products', 'Advanced SEO', 'Speed Optimization', '2 Months Support'], delivery: '2-3 weeks', popular: true },
        { name: 'Branded Premium', basePricePKR: 130000, features: ['Custom Design', '50 Products', 'Email Marketing', 'Social Media Integration', '3 Months Support'], delivery: '3-4 weeks' },
        { name: 'Exclusive Basic', basePricePKR: 180000, features: ['Custom Development', '100 Products', 'Advanced Analytics', 'Inventory System', '4 Months Support'], delivery: '4-5 weeks' },
        { name: 'Exclusive Pro', basePricePKR: 350000, features: ['Enterprise Solution', 'Unlimited Products', 'Custom App', 'Multi-Language', '6 Months Support'], delivery: '6-8 weeks' },
        { name: 'Exclusive Premium', basePricePKR: 500000, features: ['Full Scale E-commerce', 'Dedicated Team', '24/7 Priority Support', 'Global CDN', '1 Year Support'], delivery: '8-12 weeks' }
    ];

    const packages = packagesData.map(pkg => ({
        ...pkg,
        price: formatGeoPrice(pkg.basePricePKR / 278, geoData)
    }));

    const features = [
        { icon: FiShoppingCart, title: 'Complete Store Setup', desc: 'From theme to payment gateway integration' },
        { icon: FiTrendingUp, title: 'Sales Optimization', desc: 'Conversion-focused design and marketing tools' },
        { icon: FiZap, title: 'Lightning Fast', desc: 'Optimized for speed and performance' },
    ];

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
                {/* Hero Section - Unique for Shopify */}
                <section className="section-padding relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5"></div>
                    <div className="container-custom relative">
                        <Link href="/#services" className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 mb-8 font-semibold transition-colors">
                            <FiArrowLeft className="w-4 h-4" />
                            Back to Services
                        </Link>

                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
                                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-6">
                                    <SiShopify className="w-6 h-6 text-green-600" />
                                    <span className="font-black text-green-700">E-Commerce Experts</span>
                                </div>

                                <h1 className="text-6xl md:text-7xl font-black mb-6">
                                    <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                        Shopify Stores
                                    </span>
                                </h1>

                                <p className="text-2xl text-gray-600 mb-8 leading-relaxed">
                                    Launch your dream online store with our expert Shopify development. From setup to scaling, we've got you covered.
                                </p>

                                <div className="flex flex-wrap gap-4 mb-12">
                                    <Link href="/#order" className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-black hover:shadow-2xl transition-all hover:scale-105 overflow-hidden">
                                        <span className="relative z-10 flex items-center gap-2">
                                            Start Your Store
                                            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </Link>
                                </div>

                                {/* Feature Pills */}
                                <div className="flex flex-wrap gap-4">
                                    {features.map((feature, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + idx * 0.1 }}
                                            className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-lg"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                                                <feature.icon className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-black text-sm text-gray-900">{feature.title}</p>
                                                <p className="text-xs text-gray-600">{feature.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="relative"
                            >
                                <div className="relative w-full aspect-square rounded-3xl bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-1 shadow-2xl">
                                    <div className="w-full h-full rounded-3xl bg-white flex items-center justify-center">
                                        <SiShopify className="w-64 h-64 text-green-600 opacity-20" />
                                    </div>
                                </div>
                                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full blur-3xl opacity-50"></div>
                                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full blur-3xl opacity-50"></div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Packages Section - Unique 3x2 Grid */}
                <section className="section-padding bg-white">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-5xl md:text-6xl font-black mb-4">
                                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                    Choose Your Package
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600">Perfect for every business size and budget</p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {packages.map((pkg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className={`relative group rounded-3xl overflow-hidden ${pkg.popular ? 'ring-4 ring-green-500/50 shadow-2xl' : 'shadow-lg hover:shadow-2xl'
                                        } transition-all`}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                            <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-black shadow-xl">
                                                ⭐ MOST POPULAR
                                            </div>
                                        </div>
                                    )}

                                    <div className={`absolute inset-0 ${pkg.popular ? 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50' : 'bg-gradient-to-br from-gray-50 to-white'
                                        }`}></div>

                                    <div className="relative p-8 h-full flex flex-col">
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-black mb-3 text-gray-900">{pkg.name}</h3>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-sm text-gray-600 font-bold">{geoData.currency}</span>
                                                <span className={`text-5xl font-black ${pkg.popular ? 'bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent' : 'text-gray-900'
                                                    }`}>
                                                    {pkg.price}
                                                </span>
                                            </div>
                                            <div className="mt-2 inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold">
                                                🚀 {pkg.delivery}
                                            </div>
                                        </div>

                                        <ul className="space-y-3 mb-8 flex-1">
                                            {pkg.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${pkg.popular ? 'bg-gradient-to-br from-green-400 to-emerald-600' : 'bg-gray-300'
                                                        }`}>
                                                        <FiCheck className="w-3 h-3 text-white" />
                                                    </div>
                                                    <span className="text-gray-700 font-medium">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Link
                                            href={`/?service=shopify&package=${pkg.name}#order`}
                                            className={`group/btn relative overflow-hidden block w-full py-4 rounded-xl font-black text-center transition-all ${pkg.popular
                                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg hover:shadow-2xl'
                                                : 'bg-gray-900 text-white hover:bg-gray-800'
                                                }`}
                                        >
                                            <span className="relative flex items-center justify-center gap-2">
                                                <FiShoppingCart className="w-5 h-5" />
                                                Order Now
                                                <FiArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                            </span>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="section-padding bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
                    <div className="container-custom relative text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-5xl md:text-6xl font-black mb-6">
                                Ready to Launch Your Store?
                            </h2>
                            <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
                                Join hundreds of successful online businesses powered by our Shopify expertise
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <Link
                                    href="/#order"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-600 rounded-xl font-black hover:shadow-2xl transition-all hover:scale-105"
                                >
                                    Get Started Today
                                    <FiArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
