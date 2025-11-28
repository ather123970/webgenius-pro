'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight, FiArrowLeft, FiTrendingUp, FiSearch, FiBarChart } from 'react-icons/fi';
import { HiSearchCircle } from 'react-icons/hi';
import Link from 'next/link';
import Header from '@/app/components/sections/Header';
import Footer from '@/app/components/sections/Footer';

export default function SEOPage() {
    const packages = [
        { name: 'Affordable', price: '15,000', features: ['Basic Audit', 'Keyword Research', 'On-page SEO', 'Meta Tags', 'Monthly Report'], delivery: 'Monthly', badge: '🌱' },
        { name: 'Branded Pro', price: '40,000', features: ['Technical SEO', 'Content Strategy', 'Backlink Building', 'Speed Opt', 'Bi-weekly Report'], delivery: 'Monthly', popular: true, badge: '🔥' },
        { name: 'Branded Premium', price: '75,000', features: ['Advanced Link Building', 'Local SEO', 'Competitor Analysis', 'Content Creation', 'Weekly Report'], delivery: 'Monthly', badge: '💎' },
        { name: 'Exclusive Basic', price: '100,000', features: ['National SEO', 'PR Outreach', 'Conversion Opt', 'Schema Markup', 'Priority Support'], delivery: 'Monthly', badge: '⚡' },
        { name: 'Exclusive Pro', price: '200,000', features: ['International SEO', 'Enterprise Audit', 'Growth Hacking', 'Dedicated Manager', 'Custom Strategy'], delivery: 'Monthly', badge: '🚀' },
        { name: 'Exclusive Premium', price: '400,000', features: ['Full Market Domination', 'Brand Reputation', 'Crisis Mgmt', 'Executive Reporting', '24/7 Support'], delivery: 'Monthly', badge: '👑' }
    ];

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
                {/* Hero - Growth/Chart Theme */}
                <section className="section-padding relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNmOTczMTYiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9zdmc+')] opacity-40"></div>

                    <div className="container-custom relative">
                        <Link href="/#services" className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-8 font-semibold transition-colors">
                            <FiArrowLeft className="w-4 h-4" />
                            Back to Services
                        </Link>

                        <div className="text-center max-w-5xl mx-auto">
                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full mb-8">
                                    <HiSearchCircle className="w-6 h-6 text-orange-600" />
                                    <span className="font-black text-orange-700">Growth Acceleration</span>
                                </div>

                                <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
                                    <span className="text-gray-900">Dominate</span>
                                    <br />
                                    <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                                        Search Rankings
                                    </span>
                                </h1>

                                <p className="text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                                    Get found by customers actively searching for your services. Our data-driven SEO strategies deliver measurable results.
                                </p>

                                <div className="flex flex-wrap gap-6 justify-center mb-16">
                                    <Link href="/#order" className="group relative px-10 py-5 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-2xl font-black text-lg hover:shadow-2xl transition-all hover:scale-105">
                                        <span className="relative z-10 flex items-center gap-3">
                                            <FiTrendingUp className="w-6 h-6" />
                                            Boost Rankings
                                            <FiArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Link>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
                                    {[
                                        { value: '300%', label: 'Traffic Increase' },
                                        { value: '#1', label: 'Page Rankings' },
                                        { value: '95%', label: 'Client Retention' }
                                    ].map((stat, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.3 + idx * 0.1, type: 'spring' }}
                                            className="p-6 rounded-2xl bg-white shadow-xl"
                                        >
                                            <div className="text-4xl font-black bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
                                                {stat.value}
                                            </div>
                                            <p className="font-bold text-gray-600">{stat.label}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Packages - Card Stack */}
                <section className="section-padding bg-gradient-to-br from-white to-orange-50">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-5xl md:text-6xl font-black mb-4">
                                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                                    SEO Packages
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600">Monthly plans to grow your online presence</p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {packages.map((pkg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.08 }}
                                    whileHover={{ y: -12 }}
                                    className={`relative group rounded-3xl overflow-hidden ${pkg.popular ? 'ring-4 ring-orange-500/50 shadow-2xl scale-105' : 'shadow-xl hover:shadow-2xl'
                                        } transition-all`}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                            <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-2 rounded-full text-sm font-black shadow-xl">
                                                📈 BEST GROWTH
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50"></div>

                                    <div className="relative p-8 h-full flex flex-col bg-white">
                                        <div className="text-6xl mb-4">{pkg.badge}</div>
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-black mb-3 text-gray-900">{pkg.name}</h3>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-sm text-gray-600 font-bold">PKR</span>
                                                <span className={`text-5xl font-black ${pkg.popular ? 'bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent' : 'text-gray-900'
                                                    }`}>
                                                    {pkg.price}
                                                </span>
                                                <span className="text-gray-600 font-bold">/mo</span>
                                            </div>
                                            <div className="mt-3 inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-bold">
                                                📊 {pkg.delivery}
                                            </div>
                                        </div>

                                        <ul className="space-y-3 mb-8 flex-1">
                                            {pkg.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${pkg.popular ? 'bg-gradient-to-br from-orange-500 to-amber-600' : 'bg-orange-300'
                                                        }`}>
                                                        <FiCheck className="w-3 h-3 text-white" />
                                                    </div>
                                                    <span className="text-gray-700 font-medium">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Link
                                            href={`/?service=seo&package=${pkg.name}#order`}
                                            className={`group/btn relative overflow-hidden block w-full py-4 rounded-xl font-black text-center transition-all ${pkg.popular
                                                    ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg hover:shadow-2xl'
                                                    : 'bg-gray-900 text-white hover:bg-gray-800'
                                                }`}
                                        >
                                            <span className="relative flex items-center justify-center gap-2">
                                                <FiTrendingUp className="w-5 h-5" />
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

                {/* CTA */}
                <section className="section-padding bg-gradient-to-br from-orange-600 via-amber-600 to-yellow-600 text-white">
                    <div className="container-custom text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-5xl md:text-6xl font-black mb-6">
                                Ready to Rank #1?
                            </h2>
                            <p className="text-xl mb-8 text-orange-100 max-w-2xl mx-auto">
                                Start your SEO journey today and watch your business grow
                            </p>
                            <Link
                                href="/#order"
                                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-orange-600 rounded-2xl font-black text-lg hover:shadow-2xl transition-all hover:scale-105"
                            >
                                Start Growing Now
                                <FiArrowRight className="w-6 h-6" />
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
