'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight, FiArrowLeft, FiShield, FiTool, FiClock } from 'react-icons/fi';
import Link from 'next/link';
import Header from '@/app/components/sections/Header';
import Footer from '@/app/components/sections/Footer';

export default function MaintenancePage() {
    const packages = [
        { name: 'Affordable', price: '8,000', features: ['Weekly Backups', 'Uptime Monitor', 'Plugin Updates', 'Security Scan', 'Email Support'], delivery: 'Monthly', icon: '🛡️' },
        { name: 'Branded Pro', price: '20,000', features: ['Daily Backups', 'Performance Opt', 'Content Updates', 'Bug Fixes', 'Priority Email'], delivery: 'Monthly', popular: true, icon: '⚙️' },
        { name: 'Branded Premium', price: '35,000', features: ['Real-time Monitor', 'Malware Removal', 'Speed Tweaks', '1hr Dev Time', 'Chat Support'], delivery: 'Monthly', icon: '🔧' },
        { name: 'Exclusive Basic', price: '50,000', features: ['24/7 Monitoring', 'Hacked Site Repair', 'Database Opt', '3hr Dev Time', 'Phone Support'], delivery: 'Monthly', icon: '🚀' },
        { name: 'Exclusive Pro', price: '100,000', features: ['Dedicated Server Mgmt', 'Load Balancing', 'Code Review', '10hr Dev Time', 'Priority Phone'], delivery: 'Monthly', icon: '💪' },
        { name: 'Exclusive Premium', price: '180,000', features: ['Full Infrastructure', 'Disaster Recovery', 'Scalability Plan', 'Unlimited Dev', 'Dedicated Agent'], delivery: 'Monthly', icon: '👨‍💻' }
    ];

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
                {/* Hero - Professional/Clean Theme */}
                <section className="section-padding relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjNjQ3NDhiIiBmaWxsLW9wYWNpdHk9IjAuMDUiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>

                    <div className="container-custom relative">
                        <Link href="/#services" className="inline-flex items-center gap-2 text-gray-600 hover:text-slate-700 mb-8 font-semibold transition-colors">
                            <FiArrowLeft className="w-4 h-4" />
                            Back to Services
                        </Link>

                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
                                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-100 to-gray-100 rounded-full mb-6">
                                    <FiShield className="w-6 h-6 text-slate-700" />
                                    <span className="font-black text-slate-800">Always Protected</span>
                                </div>

                                <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
                                    <span className="text-gray-900">Keep Your Site</span>
                                    <br />
                                    <span className="bg-gradient-to-r from-slate-700 via-gray-700 to-zinc-700 bg-clip-text text-transparent">
                                        Running Smooth
                                    </span>
                                </h1>

                                <p className="text-2xl text-gray-600 mb-8 leading-relaxed">
                                    Professional website maintenance and support to ensure your site is secure, fast, and always available.
                                </p>

                                <div className="flex flex-wrap gap-4 mb-12">
                                    <Link href="/#order" className="group relative px-10 py-5 bg-gradient-to-r from-slate-700 to-gray-800 text-white rounded-2xl font-black text-lg hover:shadow-2xl transition-all hover:scale-105">
                                        <span className="relative z-10 flex items-center gap-3">
                                            <FiTool className="w-6 h-6" />
                                            Get Protected
                                            <FiArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Link>
                                </div>

                                {/* Benefits */}
                                <div className="space-y-4">
                                    {[
                                        { icon: FiShield, text: '24/7 Security Monitoring' },
                                        { icon: FiClock, text: 'Regular Backups & Updates' },
                                        { icon: FiTool, text: 'Expert Technical Support' }
                                    ].map((benefit, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 + idx * 0.1 }}
                                            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-100 to-gray-200 flex items-center justify-center">
                                                <benefit.icon className="w-6 h-6 text-slate-700" />
                                            </div>
                                            <p className="font-bold text-gray-900">{benefit.text}</p>
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
                                <div className="relative w-full aspect-square rounded-3xl bg-gradient-to-br from-slate-200 to-gray-300 p-8 shadow-2xl">
                                    <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                                        <FiShield className="w-48 h-48 text-slate-700 opacity-20" />
                                    </div>
                                    {/* Floating badges */}
                                    <motion.div
                                        animate={{ y: [-10, 10, -10] }}
                                        transition={{ repeat: Infinity, duration: 4 }}
                                        className="absolute top-10 right-10 px-4 py-2 bg-green-500 text-white rounded-lg font-black shadow-lg"
                                    >
                                        99.9% Uptime
                                    </motion.div>
                                    <motion.div
                                        animate={{ y: [10, -10, 10] }}
                                        transition={{ repeat: Infinity, duration: 5 }}
                                        className="absolute bottom-10 left-10 px-4 py-2 bg-blue-500 text-white rounded-lg font-black shadow-lg"
                                    >
                                        24/7 Support
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Packages - Clean Professional Grid */}
                <section className="section-padding bg-white">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-5xl md:text-6xl font-black mb-4">
                                <span className="bg-gradient-to-r from-slate-700 to-gray-800 bg-clip-text text-transparent">
                                    Maintenance Plans
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600">Monthly plans to keep your website healthy</p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {packages.map((pkg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.08 }}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    className={`relative group rounded-3xl overflow-hidden ${pkg.popular ? 'ring-4 ring-slate-500/50 shadow-2xl' : 'shadow-xl hover:shadow-2xl'
                                        } transition-all bg-white`}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                            <div className="bg-gradient-to-r from-slate-700 to-gray-800 text-white px-6 py-2 rounded-full text-sm font-black shadow-xl">
                                                🏆 BEST VALUE
                                            </div>
                                        </div>
                                    )}

                                    <div className={`absolute inset-0 ${pkg.popular ? 'bg-gradient-to-br from-slate-50 to-gray-100' : 'bg-gradient-to-br from-gray-50 to-white'
                                        }`}></div>

                                    <div className="relative p-8 h-full flex flex-col">
                                        <div className="text-6xl mb-4">{pkg.icon}</div>
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-black mb-3 text-gray-900">{pkg.name}</h3>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-sm text-gray-600 font-bold">PKR</span>
                                                <span className={`text-5xl font-black ${pkg.popular ? 'bg-gradient-to-r from-slate-700 to-gray-800 bg-clip-text text-transparent' : 'text-gray-900'
                                                    }`}>
                                                    {pkg.price}
                                                </span>
                                                <span className="text-gray-600 font-bold">/mo</span>
                                            </div>
                                            <div className="mt-3 inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-bold">
                                                🔄 {pkg.delivery}
                                            </div>
                                        </div>

                                        <ul className="space-y-3 mb-8 flex-1">
                                            {pkg.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${pkg.popular ? 'bg-gradient-to-br from-slate-600 to-gray-700' : 'bg-gray-400'
                                                        }`}>
                                                        <FiCheck className="w-3 h-3 text-white" />
                                                    </div>
                                                    <span className="text-gray-700 font-medium">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Link
                                            href={`/?service=maintenance&package=${pkg.name}#order`}
                                            className={`group/btn relative overflow-hidden block w-full py-4 rounded-xl font-black text-center transition-all ${pkg.popular
                                                    ? 'bg-gradient-to-r from-slate-700 to-gray-800 text-white shadow-lg hover:shadow-2xl'
                                                    : 'bg-gray-900 text-white hover:bg-gray-800'
                                                }`}
                                        >
                                            <span className="relative flex items-center justify-center gap-2">
                                                <FiShield className="w-5 h-5" />
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
                <section className="section-padding bg-gradient-to-br from-slate-800 via-gray-800 to-zinc-900 text-white">
                    <div className="container-custom text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-5xl md:text-6xl font-black mb-6">
                                Secure Your Website Today
                            </h2>
                            <p className="text-xl mb-8 text-slate-300 max-w-2xl mx-auto">
                                Don't wait for problems to happen. Get proactive maintenance and support now.
                            </p>
                            <Link
                                href="/#order"
                                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-slate-800 rounded-2xl font-black text-lg hover:shadow-2xl transition-all hover:scale-105"
                            >
                                Start Maintenance Plan
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
