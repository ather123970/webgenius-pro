'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight, FiArrowLeft, FiPenTool, FiEye, FiHeart } from 'react-icons/fi';
import { HiColorSwatch } from 'react-icons/hi';
import Link from 'next/link';
import Header from '@/app/components/sections/Header';
import Footer from '@/app/components/sections/Footer';

export default function DesignPage() {
    const packages = [
        { name: 'Affordable', price: '20,000', features: ['Landing Page', 'Mobile Responsive', 'Basic Assets', '2 Revisions', 'Source Files'], delivery: '1 week', color: 'from-pink-400 to-rose-500' },
        { name: 'Branded Pro', price: '50,000', features: ['5 Pages Design', 'Design System', 'Interactive Prototype', '5 Revisions', 'Style Guide'], delivery: '2 weeks', popular: true, color: 'from-purple-400 to-pink-500' },
        { name: 'Branded Premium', price: '90,000', features: ['10 Pages Design', 'Advanced Interactions', 'Custom Icons', 'Unlimited Revisions', 'Dev Handoff'], delivery: '3 weeks', color: 'from-violet-400 to-purple-500' },
        { name: 'Exclusive Basic', price: '120,000', features: ['Full App Design', 'User Research', 'Wireframing', 'Usability Testing', 'Priority Support'], delivery: '4 weeks', color: 'from-fuchsia-400 to-pink-600' },
        { name: 'Exclusive Pro', price: '250,000', features: ['Enterprise Product', 'Design Strategy', 'Motion Design', 'Design Ops', 'Consultation'], delivery: '6 weeks', color: 'from-purple-500 to-indigo-600' },
        { name: 'Exclusive Premium', price: '450,000', features: ['Global Brand Identity', 'Full Ecosystem', 'Design Leadership', 'Workshops', 'Retainer'], delivery: '8 weeks', color: 'from-pink-600 to-rose-700' }
    ];

    return (
        <>
            <Header />
            <main className="min-h-screen pt-24 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
                {/* Hero - Creative/Artistic Theme */}
                <section className="section-padding relative overflow-hidden">
                    {/* Abstract shapes */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                        <div className="absolute top-1/3 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
                    </div>

                    <div className="container-custom relative">
                        <Link href="/#services" className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-8 font-semibold transition-colors">
                            <FiArrowLeft className="w-4 h-4" />
                            Back to Services
                        </Link>

                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
                                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-6">
                                    <HiColorSwatch className="w-6 h-6 text-purple-600" />
                                    <span className="font-black text-purple-700">Design Excellence</span>
                                </div>

                                <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
                                    <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                                        UI/UX Design
                                    </span>
                                    <br />
                                    <span className="text-gray-900">That Speaks</span>
                                </h1>

                                <p className="text-2xl text-gray-600 mb-8 leading-relaxed">
                                    Beautiful, user-centric designs that not only look stunning but deliver exceptional user experiences.
                                </p>

                                <div className="flex flex-wrap gap-4 mb-12">
                                    <Link href="/#order" className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white rounded-2xl font-black text-lg hover:shadow-2xl transition-all hover:scale-105">
                                        <span className="relative z-10 flex items-center gap-3">
                                            <FiPenTool className="w-6 h-6" />
                                            Start Designing
                                            <FiArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </Link>
                                </div>

                                {/* Design Principles */}
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { icon: FiEye, label: 'Visual Harmony', color: 'purple' },
                                        { icon: FiHeart, label: 'User Love', color: 'pink' },
                                        { icon: FiPenTool, label: 'Pixel Perfect', color: 'rose' }
                                    ].map((item, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.2 + idx * 0.1 }}
                                            className={`p-4 rounded-2xl bg-gradient-to-br from-${item.color}-100 to-${item.color}-200 text-center`}
                                        >
                                            <item.icon className={`w-6 h-6 text-${item.color}-600 mx-auto mb-2`} />
                                            <p className={`font-black text-xs text-${item.color}-800`}>{item.label}</p>
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
                                {/* Creative canvas illustration */}
                                <div className="relative w-full aspect-square rounded-3xl bg-white p-8 shadow-2xl">
                                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-purple-100 via-pink-100 to-rose-100 flex items-center justify-center">
                                        <HiColorSwatch className="w-48 h-48 text-purple-600 opacity-30" />
                                    </div>
                                    {/* Floating elements */}
                                    <motion.div
                                        animate={{ y: [-10, 10, -10] }}
                                        transition={{ repeat: Infinity, duration: 3 }}
                                        className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl shadow-xl"
                                    ></motion.div>
                                    <motion.div
                                        animate={{ y: [10, -10, 10] }}
                                        transition={{ repeat: Infinity, duration: 4 }}
                                        className="absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full shadow-xl"
                                    ></motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Packages - Masonry-style Grid */}
                <section className="section-padding bg-white">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-5xl md:text-6xl font-black mb-4">
                                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Design Packages
                                </span>
                            </h2>
                            <p className="text-xl text-gray-600">Crafted for every design need</p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {packages.map((pkg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ y: -10, scale: 1.03 }}
                                    className={`relative group rounded-3xl overflow-hidden ${pkg.popular ? 'ring-4 ring-purple-500/50 shadow-2xl' : 'shadow-xl hover:shadow-2xl'
                                        } transition-all`}
                                >
                                    {pkg.popular && (
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                                            <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-black shadow-xl">
                                                🎨 DESIGNER'S CHOICE
                                            </div>
                                        </div>
                                    )}

                                    <div className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-10`}></div>

                                    <div className="relative p-8 h-full flex flex-col bg-white/90 backdrop-blur-sm">
                                        <div className="mb-6">
                                            <h3 className="text-2xl font-black mb-3 text-gray-900">{pkg.name}</h3>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-sm text-gray-600 font-bold">PKR</span>
                                                <span className={`text-5xl font-black bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                                                    {pkg.price}
                                                </span>
                                            </div>
                                            <div className="mt-3 inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">
                                                🎯 {pkg.delivery}
                                            </div>
                                        </div>

                                        <ul className="space-y-3 mb-8 flex-1">
                                            {pkg.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-gradient-to-br ${pkg.color}`}>
                                                        <FiCheck className="w-3 h-3 text-white" />
                                                    </div>
                                                    <span className="text-gray-700 font-medium">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <Link
                                            href={`/?service=design&package=${pkg.name}#order`}
                                            className={`group/btn relative overflow-hidden block w-full py-4 rounded-xl font-black text-center transition-all bg-gradient-to-r ${pkg.color} text-white shadow-lg hover:shadow-2xl`}
                                        >
                                            <span className="relative flex items-center justify-center gap-2">
                                                <FiPenTool className="w-5 h-5" />
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
                <section className="section-padding bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 text-white relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute w-96 h-96 bg-white/10 rounded-full -top-48 -left-48"></div>
                        <div className="absolute w-96 h-96 bg-white/10 rounded-full -bottom-48 -right-48"></div>
                    </div>
                    <div className="container-custom relative text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-5xl md:text-6xl font-black mb-6">
                                Create Beautiful Experiences
                            </h2>
                            <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
                                Let's design something that your users will love
                            </p>
                            <Link
                                href="/#order"
                                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-purple-600 rounded-2xl font-black text-lg hover:shadow-2xl transition-all hover:scale-105"
                            >
                                Start Your Design
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
