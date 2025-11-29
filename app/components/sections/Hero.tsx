'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiCalendar, FiShoppingCart } from 'react-icons/fi';
import { SiShopify } from 'react-icons/si';
import { HiCode, HiColorSwatch, HiSearchCircle } from 'react-icons/hi';

// Counter animation hook
function useCounter(end: number, duration: number = 2000, start: boolean = true) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (hasAnimated || !start) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setHasAnimated(true);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, hasAnimated, start]);

    return count;
}

export default function Hero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, 100]);
    const y2 = useTransform(scrollY, [0, 300], [0, -50]);

    const counterRef = React.useRef(null);
    const isCounterInView = useInView(counterRef, { once: true, margin: "-100px" });
    const revenue = useCounter(450, 2500, isCounterInView);

    const services = [
        { icon: 'shopify', label: "Shopify", count: "20+" },
        { icon: 'webapp', label: "Web Apps", count: "30+" },
        { icon: 'uiux', label: "UI/UX", count: "50+" },
        { icon: 'seo', label: "SEO", count: "25+" },
    ];

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
            {/* Animated Gradient Orbs */}
            <motion.div
                style={{ y: y1 }}
                className="absolute top-20 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/40 to-cyan-100/30 rounded-full blur-3xl"
            />
            <motion.div
                style={{ y: y2 }}
                className="absolute bottom-0 -right-40 w-[800px] h-[800px] bg-gradient-to-tl from-blue-100/40 to-indigo-100/30 rounded-full blur-3xl"
            />

            <div className="container-custom relative z-10 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* LEFT: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                            </span>
                            <span className="text-sm font-bold text-blue-900">Trusted by 50+ Brands Worldwide</span>
                        </motion.div>

                        {/* Main Headline */}
                        <div className="space-y-4">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="text-6xl lg:text-8xl xl:text-9xl font-black leading-[0.95] text-gray-900"
                            >
                                We build Brands
                                <br />
                                <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
                                    That Customer Trust
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-xl lg:text-2xl text-gray-700 font-medium leading-relaxed max-w-xl"
                            >
                                Premium web apps, Shopify stores & AI solutions designed to drive real revenue.
                                <span className="text-blue-600 font-bold"> From concept to launch in weeks.</span>
                            </motion.p>
                        </div>

                        {/* CTAs - Updated & Animated */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-wrap gap-4"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <Link
                                    href="/book-meeting"
                                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-black text-white text-lg shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow flex items-center gap-2"
                                >
                                    <FiCalendar className="w-5 h-5" />
                                    Book Meeting
                                    <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <Link
                                    href="/order"
                                    className="px-8 py-4 bg-white border-2 border-blue-600 rounded-xl font-bold text-blue-600 text-lg hover:bg-blue-50 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                                >
                                    <FiShoppingCart className="w-5 h-5" />
                                    Order Now
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Trust Stats */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9 }}
                            className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200"
                        >
                            <div>
                                <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">50+</div>
                                <div className="text-sm text-gray-600 font-medium">Projects Built</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">5.0</div>
                                <div className="text-sm text-gray-600 font-medium">Client Rating</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">24/7</div>
                                <div className="text-sm text-gray-600 font-medium">Support</div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT: 3D Browser Mockup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="relative h-[650px] md:h-[600px] lg:h-[750px] overflow-visible"
                    >
                        {/* Ather's Profile - Top Right with Service Badges */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="absolute top-8 -right-20 hidden xl:block z-0"
                        >
                            <div className="relative" style={{ perspective: "1000px" }}>
                                {/* Profile Image - Larger Size with 3D Effect */}
                                <motion.div
                                    className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl"
                                    style={{
                                        transformStyle: "preserve-3d",
                                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 20px -5px rgba(59, 130, 246, 0.3)"
                                    }}
                                    animate={{
                                        rotateY: [0, 5, 0, -5, 0],
                                    }}
                                    transition={{
                                        duration: 10,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-20"></div>
                                    <motion.div
                                        animate={{
                                            filter: ["grayscale(100%)", "grayscale(0%)", "grayscale(100%)"]
                                        }}
                                        transition={{
                                            duration: 7.4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="w-full h-full"
                                    >
                                        <Image
                                            src="/team/ather.jpg"
                                            alt="Ather - Founder"
                                            fill
                                            className="object-cover relative z-10"
                                            priority
                                        />
                                    </motion.div>
                                </motion.div>

                                {/* Service Badges Around Profile - Further Away */}
                                {/* Shopify - Top */}
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6, type: "spring" }}
                                    className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white rounded-xl py-2 px-3 shadow-lg border-2 border-green-200"
                                >
                                    <div className="flex items-center gap-2">
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#96bf48">
                                            <path d="M16.09 4.54c-.05-.08-.11-.15-.19-.2-.08-.05-.17-.08-.27-.08h-4.8c-.1 0-.19.03-.27.08-.08.05-.14.12-.19.2l-2.4 4.82c-.05.1-.08.2-.08.31v7.23c0 .24.19.43.43.43h9.86c.24 0 .43-.19.43-.43V9.67c0-.11-.03-.21-.08-.31l-2.44-4.82zM14.4 13.5h-1.35v1.35h-.9V13.5h-1.35v-.9h1.35v-1.35h.9v1.35h1.35v.9z" />
                                        </svg>
                                        <div>
                                            <div className="text-lg font-black text-green-600">20+</div>
                                            <div className="text-[9px] font-bold text-gray-600 -mt-1">Shopify</div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Web Apps - Bottom Right (Away from Face) */}
                                <motion.div
                                    initial={{ x: -30, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.7, type: "spring" }}
                                    className="absolute bottom-20 -right-8 bg-white rounded-xl py-2 px-3 shadow-lg border-2 border-blue-200"
                                >
                                    <div className="flex items-center gap-2">
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                                            <polyline points="16 18 22 12 16 6" />
                                            <polyline points="8 6 2 12 8 18" />
                                        </svg>
                                        <div>
                                            <div className="text-lg font-black text-blue-600">30+</div>
                                            <div className="text-[9px] font-bold text-gray-600 -mt-1">Web Apps</div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* UI/UX - Bottom */}
                                <motion.div
                                    initial={{ y: -30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.8, type: "spring" }}
                                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-xl py-2 px-3 shadow-lg border-2 border-purple-200"
                                >
                                    <div className="flex items-center gap-2">
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2">
                                            <rect x="3" y="3" width="18" height="18" rx="2" />
                                            <path d="M9 9h6M9 15h6" />
                                        </svg>
                                        <div>
                                            <div className="text-lg font-black text-purple-600">50+</div>
                                            <div className="text-[9px] font-bold text-gray-600 -mt-1">UI/UX</div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* SEO - Left */}
                                <motion.div
                                    initial={{ x: 30, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.9, type: "spring" }}
                                    className="absolute top-16 -left-10 bg-white rounded-xl py-2 px-3 shadow-lg border-2 border-orange-200"
                                >
                                    <div className="flex items-center gap-2">
                                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
                                            <circle cx="11" cy="11" r="8" />
                                            <path d="m21 21-4.35-4.35" />
                                        </svg>
                                        <div>
                                            <div className="text-lg font-black text-orange-600">25+</div>
                                            <div className="text-[9px] font-bold text-gray-600 -mt-1">SEO</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Main Browser Window */}
                        <motion.div
                            style={{ y: y1 }}
                            className="absolute left-0 top-0 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full max-w-[90%] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[580px] pl-4 md:pl-0"
                        >
                            <div className="relative group">
                                {/* Glow */}
                                <div className="absolute -inset-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 rounded-[2.5rem] opacity-30 blur-3xl group-hover:opacity-45 transition-opacity duration-700 animate-pulse" />

                                {/* Browser */}
                                <div className="relative bg-white rounded-2xl lg:rounded-[2.5rem] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.3)] border-2 border-gray-200 overflow-hidden">
                                    {/* Browser Chrome */}
                                    <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-3 md:px-6 md:py-5 border-b-2 border-gray-200 flex items-center gap-2 md:gap-3">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-500"></div>
                                            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-yellow-500"></div>
                                            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-500"></div>
                                        </div>
                                        <div className="flex-1 bg-white rounded-lg md:rounded-xl px-3 py-2 md:px-5 md:py-2.5 text-xs md:text-sm text-gray-500 font-semibold border border-gray-200 truncate">
                                            athertechy.com
                                        </div>
                                    </div>

                                    {/* Dashboard Content */}
                                    <div className="p-6 md:p-8 lg:p-10 space-y-5 md:space-y-7 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
                                        {/* Animated Shopify Logo - BOTTOM TO TOP */}
                                        <motion.div
                                            initial={{ y: 0, opacity: 0, bottom: '1rem' }}
                                            animate={{ y: -200, opacity: 1 }}
                                            transition={{
                                                delay: 0.5,
                                                duration: 2,
                                                type: "spring",
                                                stiffness: 40,
                                                damping: 20
                                            }}
                                            className="absolute right-4 md:right-8 w-16 h-16 md:w-20 md:h-20 z-10"
                                            style={{ bottom: '1rem' }}
                                        >
                                            <motion.div
                                                animate={{ y: [0, -10, 0] }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                    delay: 2.5
                                                }}
                                            >
                                                <Image
                                                    src="/team/shopify-app-icon-on-transparent-background-free-png.webp"
                                                    alt="Shopify"
                                                    width={80}
                                                    height={80}
                                                    className="w-full h-full object-contain drop-shadow-2xl"
                                                />
                                                {/* Counter Badge - 0 to 60 */}
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
                                                    className="absolute -bottom-2 -right-2 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full px-2 py-1 flex flex-col items-center justify-center font-black text-xs shadow-lg"
                                                >
                                                    <motion.span
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 2.7 }}
                                                        className="text-sm md:text-base"
                                                    >
                                                        {Math.floor(useCounter(60, 1500))}
                                                    </motion.span>
                                                    <span className="text-[8px] md:text-[9px] font-semibold opacity-90">Projects</span>
                                                </motion.div>
                                            </motion.div>
                                        </motion.div>

                                        {/* Revenue */}
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="min-w-0" ref={counterRef}>
                                                <div className="text-xs md:text-sm text-gray-600 font-bold mb-1 md:mb-2">Total Revenue</div>
                                                <div className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
                                                    ${revenue}K
                                                </div>
                                                <div className="flex items-center gap-1 md:gap-2 mt-2 md:mt-3">
                                                    <span className="text-green-600 font-black text-base md:text-xl">↗ +127%</span>
                                                    <span className="text-gray-500 text-xs md:text-sm font-medium">this month</span>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white px-4 py-2 md:px-7 md:py-3.5 rounded-xl md:rounded-2xl font-black text-xs md:text-sm shadow-lg whitespace-nowrap">
                                                LIVE
                                            </div>
                                        </div>

                                        {/* Chart */}
                                        <div className="h-32 md:h-44 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 p-4 md:p-6 flex items-end gap-1.5 md:gap-2.5 border-2 border-blue-100 relative">
                                            {/* Animated Zig-Zag Arrow Line - Follows Bar Heights */}
                                            <motion.svg
                                                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                                                viewBox="0 0 100 100"
                                                preserveAspectRatio="none"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: isCounterInView ? 1 : 0 }}
                                                transition={{ delay: 0.5, duration: 0.5 }}
                                            >
                                                {/* Zig-Zag Path Following Bar Heights */}
                                                <motion.path
                                                    d="M 6 50 L 18 30 L 30 40 L 42 10 L 54 20 L 66 0 L 78 5 L 90 -5"
                                                    stroke="#3b82f6"
                                                    strokeWidth="3"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    initial={{ pathLength: 0 }}
                                                    animate={{ pathLength: isCounterInView ? 1 : 0 }}
                                                    transition={{
                                                        delay: 0.5,
                                                        duration: 3,
                                                        ease: "easeInOut"
                                                    }}
                                                />
                                                {/* Arrow Head at End - Filled Triangle */}
                                                <motion.polygon
                                                    points="95,-5 90,-2 90,-8"
                                                    fill="#3b82f6"
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: isCounterInView ? 1 : 0, scale: isCounterInView ? 1 : 0 }}
                                                    transition={{ delay: 3.3, duration: 0.3 }}
                                                    style={{ transformOrigin: "92px -5px" }}
                                                />
                                            </motion.svg>

                                            {/* Bars - Sequential Animation */}
                                            {[50, 70, 60, 90, 80, 100, 95, 105].map((height, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ scaleY: 0 }}
                                                    animate={{ scaleY: isCounterInView ? 1 : 0 }}
                                                    transition={{
                                                        delay: i * 0.35,
                                                        duration: 0.3,
                                                        ease: "easeOut"
                                                    }}
                                                    className="flex-1 bg-gradient-to-t from-blue-600 via-cyan-500 to-cyan-400 rounded-t-lg md:rounded-t-xl origin-bottom shadow-lg"
                                                    style={{ height: `${Math.min(100, height)}%` }}
                                                />
                                            ))}
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-3 gap-3 md:gap-4">
                                            <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-5 border-2 border-gray-200 text-center shadow-sm hover:shadow-lg transition-shadow">
                                                <div className="text-2xl md:text-4xl font-black text-gray-900">2.5K</div>
                                                <div className="text-[10px] md:text-xs text-gray-600 mt-1 md:mt-1.5 font-semibold">Users</div>
                                            </div>
                                            <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-5 border-2 border-gray-200 text-center shadow-sm hover:shadow-lg transition-shadow">
                                                <div className="text-2xl md:text-4xl font-black text-gray-900">99%</div>
                                                <div className="text-[10px] md:text-xs text-gray-600 mt-1 md:mt-1.5 font-semibold">Uptime</div>
                                            </div>
                                            <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-5 border-2 border-gray-200 text-center shadow-sm hover:shadow-lg transition-shadow">
                                                <div className="text-2xl md:text-4xl font-black text-gray-900">4.9</div>
                                                <div className="text-[10px] md:text-xs text-gray-600 mt-1 md:mt-1.5 font-semibold">Rating</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>




                    </motion.div>
                </div>
            </div>
        </section>
    );
}
