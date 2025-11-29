'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiInstagram } from 'react-icons/fi';
import { SiTiktok } from 'react-icons/si';

export default function SocialMediaSection() {
    // TikTok and Instagram data
    const socialProfiles = [
        {
            platform: 'Instagram',
            username: '@athertechy',
            icon: FiInstagram,
            color: 'from-purple-600 to-pink-600',
            profileUrl: 'https://instagram.com/athertechy',
            description: 'Web development tips & portfolio showcase'
        },
        {
            platform: 'TikTok',
            username: '@athertechy',
            icon: SiTiktok,
            color: 'from-black to-gray-800',
            profileUrl: 'https://tiktok.com/@athertechy',
            description: 'Quick tech tips & coding tutorials'
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
                        Follow Our <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Journey</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Stay connected with us on social media for the latest updates, behind-the-scenes content, and tech insights!
                    </p>
                </motion.div>

                {/* Social Profiles */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {socialProfiles.map((profile, index) => (
                        <motion.a
                            key={profile.platform}
                            href={profile.profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, rotateY: 5 }}
                            style={{ perspective: '1000px' }}
                            className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 hover:border-blue-300 transition-all"
                        >
                            <div className="flex items-center gap-6">
                                {/* Profile Icon */}
                                <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${profile.color} flex items-center justify-center shadow-lg`}>
                                    <profile.icon className="w-10 h-10 text-white" />
                                </div>

                                {/* Profile Info */}
                                <div className="flex-1">
                                    <h3 className="text-2xl font-black text-gray-900 mb-1">{profile.platform}</h3>
                                    <p className="text-blue-600 font-bold text-lg mb-2">{profile.username}</p>
                                    <p className="text-gray-600 text-sm">
                                        {profile.description}
                                    </p>
                                </div>

                                {/* Follow Button */}
                                <div className={`px-6 py-3 rounded-xl bg-gradient-to-r ${profile.color} text-white font-bold hover:scale-110 transition-transform`}>
                                    Follow
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-xl text-gray-700 font-bold mb-6">
                        Want to collaborate or have questions?
                    </p>
                    <a
                        href="#contact"
                        className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-black text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                    >
                        Get in Touch
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
