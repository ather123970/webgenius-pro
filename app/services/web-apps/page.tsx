'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight, FiArrowLeft, FiCode, FiDatabase, FiLayers } from 'react-icons/fi';
import { HiCode } from 'react-icons/hi';
import Link from 'next/link';
import Header from '@/app/components/sections/Header';
import Footer from '@/app/components/sections/Footer';
import { useGeolocation, formatGeoPrice } from '@/app/lib/useGeolocation';

export default function WebAppsPage() {
    const geoData = useGeolocation();

    // Base prices in PKR (Pakistan prices)
    const packagesData = [
        { name: 'Affordable', basePricePKR: 25000, features: ['Single Page App', 'Basic UI', 'Contact Form', 'Responsive', '1 Month Support'], delivery: '2 weeks', icon: '🚀' },
        { name: 'Branded Pro', basePricePKR: 49000, features: ['Multi-page App', 'Admin Dashboard', 'User Auth', 'Database', '2 Months Support'], delivery: '3-4 weeks', popular: true, icon: '⚡' },
        { name: 'Branded Premium', basePricePKR: 100000, features: ['Advanced Features', 'Payment Gateway', 'API Integration', 'Custom Design', '3 Months Support'], delivery: '4-6 weeks', icon: '💎' },
        { name: 'Exclusive Basic', basePricePKR: 250000, features: ['SaaS MVP', 'Complex Logic', 'Real-time Features', 'Scalable Arch', '4 Months Support'], delivery: '6-8 weeks', icon: '🔥' },
        { name: 'Exclusive Pro', basePricePKR: 500000, features: ['Enterprise SaaS', 'Microservices', 'High Performance', 'Security Audit', '6 Months Support'], delivery: '8-12 weeks', icon: '👑' },
        { name: 'Exclusive Premium', basePricePKR: 900000, features: ['Full Platform', 'AI Integration', 'Dedicated DevOps', 'SLA Support', '1 Year Support'], delivery: '3-4 months', icon: '🏆' }
    ];

    // Apply geo pricing
    const packages = packagesData.map(pkg => ({
        ...pkg,
        price: formatGeoPrice(pkg.basePricePKR, geoData)
    }));

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50">
                {/* Hero - Futuristic Tech Theme */}
                <section className="section-padding relative overflow-hidden">
                    {/* Animated background */}
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                        <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                    </div>

                    <div className="container-custom relative">
                        <Link href="/#services" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 font-semibold transition-colors">
                            <FiArrowLeft className="w-4 h-4" />
                            Back to Services
                        </Link>

                        <div className="text-center max-w-5xl mx-auto">
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full mb-8">
                                    <HiCode className="w-6 h-6 text-blue-600" />
                                    <span className="font-black text-blue-700">Custom Development</span>
                                </div>

                                <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
                                    <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                                        Web Applications
                                    </span>
                                    <br />
                                    <span className="text-gray-900">Built to Scale</span>
                                </h1>

                                <p className="text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                                    From MVPs to enterprise platforms. We build custom web applications that grow with your business.
                                </p>

                                <div className="flex flex-wrap gap-6 justify-center mb-16">
                                    <Link href="/#order" className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 text-white rounded-2xl font-black text-lg hover:shadow-2xl transition-all hover:scale-105">
                                        <span className="relative z-10 flex items-center gap-3">
                                            <FiCode className="w-6 h-6" />
                                            Start Building
                                            <FiArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Link>
                                </div>

                                {/* Tech Icons */}
                                <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
                                    {[
                                        { icon: FiCode, label: 'Clean Code' },
                                        { icon: FiDatabase, label: 'Scalable DB' },
                                        { icon: FiLayers, label: 'Modern Stack' }
                                    ].map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + idx * 0.1 }}
                                            className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl"
                                        >
                                            <item.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                                            <p className="font-black text-gray-900">{item.label}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Packages - Staggered Bento Grid */}
                <section className="section-padding bg-white">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-5xl md:text-6xl font-black mb-4">
                                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    Flexible Packages
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600">Choose the perfect plan for your project</p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {packages.map((pkg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30, rotate: -2 }}
                                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.05 }}
                                    whileHover={{ y: -12, rotate: idx % 2 === 0 ? 1 : -1, scale: 1.02 }}
                                    className={`relative group rounded-3xl overflow-hidden ${pkg.popular ? 'ring-4 ring-blue-500/50 shadow-2xl' : 'shadow-xl hover:shadow-2xl'
                                        } transition-all`}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-black shadow-xl">
                                                ✨ BEST VALUE
                                            </div>
                                        </div>
                                    )}

                                    <div className={`absolute inset-0 ${pkg.popular
                                        ? 'bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50'
                                        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
                                        }`}></div>

                                    {/* Animated gradient orb */}
                                    <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${pkg.popular ? 'bg-gradient-to-br from-blue-400/30 to-indigo-400/30' : 'bg-gray-300/20'
                                        } blur-3xl group-hover:scale-150 transition-transform duration-700`}></div>

                                    <div className="relative p-8 h-full flex flex-col">
                                        <div className="text-5xl mb-4">{pkg.icon}</div>
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-black mb-3 text-gray-900">{pkg.name}</h3>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-sm text-gray-600 font-bold">{geoData.currency}</span>
                                                <span className={`text-4xl font-black ${pkg.popular ? 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent' : 'text-gray-900'
                                                    }`}>
                                                    {pkg.price}
                                                </span>
                                            </div>
                                            <div className="mt-3 inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
                                                ⚡ {pkg.delivery}
                                            </div>
                                        </div>

                                        <ul className="space-y-3 mb-8 flex-1">
                                            {pkg.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${pkg.popular ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-gray-400'
                                                        }`}>
                                                        <FiCheck className="w-3 h-3 text-white" />
                                                    </div>
                                                    <span className="text-gray-700 font-medium">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Link
                                            href={`/?service=web-app&package=${pkg.name}#order`}
                                            className={`group/btn relative overflow-hidden block w-full py-4 rounded-xl font-black text-center transition-all ${pkg.popular
                                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-2xl'
                                                : 'bg-gray-900 text-white hover:bg-gray-800'
                                                }`}
                                        >
                                            <span className="relative flex items-center justify-center gap-2">
                                                <FiCode className="w-5 h-5" />
                                                Get Started
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
                <section className="section-padding bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
                    <div className="container-custom relative text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-5xl md:text-6xl font-black mb-6">
                                Let's Build Something Amazing
                            </h2>
                            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                                Turn your vision into reality with our expert development team
                            </p>
                            <Link
                                href="/#order"
                                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-600 rounded-2xl font-black text-lg hover:shadow-2xl transition-all hover:scale-105"
                            >
                                Start Your Project
                                <FiArrowRight className="w-6 h-6" />
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />

            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </>
    );
}
