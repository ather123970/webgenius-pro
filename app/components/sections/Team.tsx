'use client';

import { motion } from 'framer-motion';
import { TEAM_MEMBERS } from '@/app/lib/constants';
import Image from 'next/image';

export default function Team() {
    const founder = TEAM_MEMBERS[0];
    const otherMembers = TEAM_MEMBERS.slice(1);

    return (
        <section id="team" className="py-32 bg-gradient-to-b from-white via-blue-50/30 to-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-5 py-2 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 font-bold text-sm mb-6 shadow-sm"
                    >
                        👥 Our Team
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-6xl font-black text-gray-900 mb-6"
                    >
                        Meet The <span className="text-gradient-blue">Team</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600"
                    >
                        Talented experts bringing your digital vision to life.
                    </motion.p>
                </div>

                {/* Founder - Featured at Top Center with Special Animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        duration: 0.8
                    }}
                    className="max-w-2xl mx-auto mb-20"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.02, 1],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                        }}
                        whileHover={{ scale: 1.03 }}
                        className="relative bg-white rounded-3xl p-12 shadow-xl border-2 border-blue-200 hover:border-blue-400 transition-all hover:shadow-2xl"
                    >
                        {/* Founder Badge */}
                        <motion.div
                            animate={{
                                y: [0, -5, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut"
                            }}
                            className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-xs font-black shadow-lg"
                        >
                            FOUNDER & LEAD DEVELOPER
                        </motion.div>

                        <div className="flex flex-col items-center text-center pl-8">
                            {/* Circular Image with Animated Icons */}
                            <div className="relative mb-6 group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl"
                                >
                                    <Image
                                        src="/team/ather.jpg"
                                        alt="Ather"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        priority
                                    />
                                </motion.div>

                                {/* Floating Tech Icons with Bottom-to-Top Animation */}
                                {/* React Icon - Top */}
                                <motion.div
                                    initial={{ y: 100, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20 backdrop-blur-sm shadow-lg"
                                >
                                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#61DAFB">
                                        <circle cx="12" cy="12" r="2" />
                                        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" />
                                        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)" />
                                        <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(120 12 12)" />
                                    </svg>
                                </motion.div>

                                {/* Shopify Icon - Right */}
                                <motion.div
                                    initial={{ y: 100, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
                                    className="absolute top-1/4 right-0 translate-x-2 w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center border border-green-500/20 backdrop-blur-sm shadow-lg"
                                >
                                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#96bf48">
                                        <path d="M16.09 4.54c-.05-.08-.11-.15-.19-.2-.08-.05-.17-.08-.27-.08h-4.8c-.1 0-.19.03-.27.08-.08.05-.14.12-.19.2l-2.4 4.82c-.05.1-.08.2-.08.31v7.23c0 .24.19.43.43.43h9.86c.24 0 .43-.19.43-.43V9.67c0-.11-.03-.21-.08-.31l-2.44-4.82zM14.4 13.5h-1.35v1.35h-.9V13.5h-1.35v-.9h1.35v-1.35h.9v1.35h1.35v.9z" />
                                    </svg>
                                </motion.div>

                                {/* Next.js Icon - Bottom Right */}
                                <motion.div
                                    initial={{ y: 100, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
                                    className="absolute bottom-1/4 right-0 translate-x-2 w-12 h-12 bg-gray-900/10 rounded-lg flex items-center justify-center border border-gray-900/20 backdrop-blur-sm shadow-lg"
                                >
                                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#000000">
                                        <path d="M11.5 0h1l8.5 15h-1.5l-7-12.25L5 15H3.5L11.5 0z" />
                                        <path d="M5.5 15h13v1.5h-13V15z" />
                                    </svg>
                                </motion.div>

                                {/* AI/Brain Icon - Bottom */}
                                <motion.div
                                    initial={{ y: 100, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
                                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center border border-orange-500/20 backdrop-blur-sm shadow-lg"
                                >
                                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
                                        <circle cx="12" cy="12" r="3" />
                                        <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
                                    </svg>
                                </motion.div>

                                {/* Node.js Icon - Left */}
                                <motion.div
                                    initial={{ y: 100, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.7, duration: 0.6, type: "spring" }}
                                    className="absolute top-1/4 left-0 -translate-x-2 w-12 h-12 bg-green-600/10 rounded-lg flex items-center justify-center border border-green-600/20 backdrop-blur-sm shadow-lg"
                                >
                                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="#68A063">
                                        <path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.47 1.71.47 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22v8.47c0 .66-.68 1.31-1.77.76L4.45 16.5a.26.26 0 0 1-.11-.21V7.71c0-.09.04-.17.11-.21l7.44-4.29c.06-.04.16-.04.22 0l7.44 4.29c.07.04.11.12.11.21v8.58c0 .08-.04.16-.11.21l-7.44 4.29c-.06.04-.16.04-.22 0L10 19.65c-.08-.03-.16-.04-.21-.01-.53.3-.63.36-1.12.51-.12.04-.31.11.07.32l2.48 1.47c.24.14.51.2.78.2s.54-.07.77-.2l7.44-4.29c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.23-.13-.5-.2-.77-.2z" />
                                    </svg>
                                </motion.div>

                                {/* Design/Figma Icon - Bottom Left */}
                                <motion.div
                                    initial={{ y: 100, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
                                    className="absolute bottom-1/4 left-0 -translate-x-2 w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center border border-pink-500/20 backdrop-blur-sm shadow-lg"
                                >
                                    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2">
                                        <rect x="3" y="3" width="7" height="7" />
                                        <rect x="14" y="3" width="7" height="7" />
                                        <rect x="14" y="14" width="7" height="7" />
                                        <rect x="3" y="14" width="7" height="7" />
                                    </svg>
                                </motion.div>
                            </div>

                            {/* Name & Role */}
                            <h3 className="text-4xl font-black text-gray-900 mb-2">Ather</h3>
                            <p className="text-xl font-bold text-blue-600 mb-6">Founder & Lead Developer</p>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-6 mb-8 w-full max-w-md">
                                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
                                    <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">50+</div>
                                    <div className="text-sm text-gray-600 font-bold mt-1">Projects</div>
                                </div>
                                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
                                    <div className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">5.0</div>
                                    <div className="text-sm text-gray-600 font-bold mt-1">Rating</div>
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-3 justify-center">
                                {founder.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-300 text-blue-700 text-sm rounded-xl font-black hover:scale-105 transition-transform"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Other Team Members - Names & Skills Only */}
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {otherMembers.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-300 transition-all shadow-lg hover:shadow-xl"
                        >
                            {/* Name & Role */}
                            <div className="text-center mb-4 pb-4 border-b-2 border-gray-100">
                                <h4 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {member.name}
                                </h4>
                                <p className="text-sm font-bold text-blue-600 uppercase tracking-wide">
                                    {member.role}
                                </p>
                            </div>

                            {/* Skills */}
                            <div className="flex flex-wrap gap-2 justify-center">
                                {member.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 bg-gray-100 border border-gray-300 text-gray-700 text-xs rounded-lg font-bold hover:bg-gray-200 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
