'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight, FiArrowLeft, FiCpu, FiZap, FiActivity } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import Link from 'next/link';
import Header from '@/app/components/sections/Header';
import Footer from '@/app/components/sections/Footer';

export default function AIPage() {
    const packages = [
        { name: 'Affordable', price: '20,000', features: ['Basic Chatbot', 'FAQ Automation', 'Script Setup', '1 Platform', 'Basic Support'], delivery: '1 week', glow: 'indigo' },
        { name: 'Branded Pro', price: '50,000', features: ['Custom Chatbot', 'Lead Gen', 'CRM Integration', '2 Platforms', 'Training'], delivery: '2 weeks', popular: true, glow: 'purple' },
        { name: 'Branded Premium', price: '100,000', features: ['Advanced AI Agent', 'Workflow Auto', 'API Connectors', 'Custom Logic', 'Analytics'], delivery: '3 weeks', glow: 'violet' },
        { name: 'Exclusive Basic', price: '150,000', features: ['Custom ML Model', 'Data Processing', 'Predictive Analytics', 'Scalable', 'Priority Support'], delivery: '4 weeks', glow: 'fuchsia' },
        { name: 'Exclusive Pro', price: '300,000', features: ['Enterprise AI', 'Multi-agent System', 'Fine-tuning', 'On-premise Option', 'Consulting'], delivery: '6 weeks', glow: 'purple' },
        { name: 'Exclusive Premium', price: '500,000', features: ['Full AI Transformation', 'R&D', 'Custom Hardware Setup', 'Dedicated Team', 'Lifetime License'], delivery: '8-12 weeks', glow: 'indigo' }
    ];

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 bg-black text-white overflow-hidden">
                {/* Hero - Futuristic AI Theme with Neon */}
                <section className="section-padding relative">
                    {/* Neon grid background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:14px_24px]"></div>

                    {/* Glowing orbs */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-[128px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

                    <div className="container-custom relative">
                        <Link href="/#services" className="inline-flex items-center gap-2 text-gray-400 hover:text-indigo-400 mb-8 font-semibold transition-colors">
                            <FiArrowLeft className="w-4 h-4" />
                            Back to Services
                        </Link>

                        <div className="text-center max-w-6xl mx-auto">
                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 rounded-full mb-8 backdrop-blur-sm">
                                    <HiSparkles className="w-6 h-6 text-indigo-400" />
                                    <span className="font-black text-indigo-300">Intelligent Solutions</span>
                                </div>

                                <h1 className="text-7xl md:text-9xl font-black mb-8 leading-tight">
                                    <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                                        AI Integration
                                    </span>
                                </h1>

                                <p className="text-2xl text-gray-400 mb-12 leading-relaxed max-w-3xl mx-auto">
                                    Harness the power of artificial intelligence to automate, optimize, and transform your business operations.
                                </p>

                                <div className="flex flex-wrap gap-6 justify-center mb-16">
                                    <Link href="/#order" className="group relative px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-black text-lg hover:shadow-[0_0_50px_rgba(99,102,241,0.5)] transition-all hover:scale-105">
                                        <span className="relative z-10 flex items-center gap-3">
                                            <FiCpu className="w-6 h-6" />
                                            Get AI Powered
                                            <FiArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Link>
                                </div>

                                {/* AI Features */}
                                <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
                                    {[
                                        { icon: FiActivity, label: 'Smart Learning', color: 'indigo' },
                                        { icon: FiZap, label: 'Lightning Fast', color: 'purple' },
                                        { icon: FiCpu, label: 'Auto Scaling', color: 'pink' }
                                    ].map((feature, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.3 + idx * 0.1 }}
                                            className="p-6 rounded-2xl bg-gradient-to-br from-indigo-600/10 to-indigo-600/5 border border-indigo-500/20 backdrop-blur-sm"
                                        >
                                            <feature.icon className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
                                            <p className="font-black text-indigo-300">{feature.label}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Packages - Neon Cards */}
                <section className="section-padding bg-gradient-to-b from-black to-indigo-950/20">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-5xl md:text-6xl font-black mb-4">
                                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                    AI Packages
                                </span>
                            </h2>
                            <p className="text-xl text-gray-400">Power up with artificial intelligence</p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {packages.map((pkg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className={`relative group rounded-3xl overflow-hidden ${pkg.popular
                                            ? 'ring-2 ring-indigo-500/50 shadow-[0_0_50px_rgba(99,102,241,0.3)]'
                                            : 'shadow-[0_0_30px_rgba(0,0,0,0.5)]'
                                        } transition-all`}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-black shadow-lg">
                                                🤖 AI POWERED
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 to-black"></div>

                                    {/* Neon glow effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                    <div className="relative p-8 h-full flex flex-col border border-gray-800 bg-black/50 backdrop-blur-sm">
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-black mb-3 text-white">{pkg.name}</h3>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-sm text-gray-500 font-bold">PKR</span>
                                                <span className="text-5xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                                    {pkg.price}
                                                </span>
                                            </div>
                                            <div className="mt-3 inline-block px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-500/30 text-indigo-300 text-sm font-bold">
                                                ⚡ {pkg.delivery}
                                            </div>
                                        </div>

                                        <ul className="space-y-3 mb-8 flex-1">
                                            {pkg.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gradient-to-br from-indigo-500 to-purple-600">
                                                        <FiCheck className="w-3 h-3 text-white" />
                                                    </div>
                                                    <span className="text-gray-300 font-medium">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Link
                                            href={`/?service=ai&package=${pkg.name}#order`}
                                            className="group/btn relative overflow-hidden block w-full py-4 rounded-xl font-black text-center transition-all bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
                                        >
                                            <span className="relative flex items-center justify-center gap-2">
                                                <FiCpu className="w-5 h-5" />
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
                <section className="section-padding bg-gradient-to-r from-indigo-950 via-purple-950 to-pink-950 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50"></div>
                    <div className="container-custom relative text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-5xl md:text-6xl font-black mb-6 text-white">
                                Enter the AI Revolution
                            </h2>
                            <p className="text-xl mb-8 text-indigo-200 max-w-2xl mx-auto">
                                Transform your business with cutting-edge artificial intelligence
                            </p>
                            <Link
                                href="/#order"
                                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black text-lg hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all hover:scale-105"
                            >
                                Start AI Journey
                                <FiArrowRight className="w-6 h-6" />
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />

            <style jsx>{`
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </>
    );
}
