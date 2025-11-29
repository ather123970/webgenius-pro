'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FiCalendar, FiUser, FiMail, FiPhone, FiMessageSquare, FiArrowRight, FiCheck, FiBriefcase } from 'react-icons/fi';
import emailjs from '@emailjs/browser';

function BookMeetingContent() {
    const searchParams = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Initialize EmailJS
    useEffect(() => {
        emailjs.init('NP2Sat5tqcJqQqoQ2');
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: searchParams.get('service') || '',
        package: searchParams.get('package') || '',
        message: '',
        preferredDate: '',
        preferredTime: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Show success IMMEDIATELY
        setIsSubmitting(false);
        setIsSuccess(true);

        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);

        // Generate unique meeting ID
        const meetingId = `MTG-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

        // Send emails in background (non-blocking)
        console.log('📧 Preparing to send booking emails...');
        console.log('Customer email:', formData.email);

        // 1. Send to Customer
        emailjs.send(
            'service_bopwq39',
            'template_wkgimvt', // Your Booking Template ID
            {
                meeting_id: meetingId,
                to_name: formData.name,
                to_email: formData.email, // CRITICAL: Customer's email
                customer_email: formData.email,
                from_name: "Ather Web Agency",
                reply_to: "businessman2124377@gmail.com", // Where customer can reply
                phone: formData.phone,
                company: formData.company || 'Not provided',
                service: formData.service || 'Not specified',
                package: formData.package || 'Not specified',
                message: formData.message || 'No additional message',
                preferred_date: formData.preferredDate || 'Flexible',
                preferred_time: formData.preferredTime || 'Flexible time',
                booking_date: new Date().toLocaleString(),
                meeting_type: 'Free 30-Minute Consultation',
                message_type: 'CUSTOMER_CONFIRMATION'
            },
            'NP2Sat5tqcJqQqoQ2'
        ).then((response) => {
            console.log('✅ Customer booking email sent successfully to:', formData.email);
            console.log('EmailJS response:', response);
        }).catch(err => {
            console.error('❌ Customer booking email FAILED:', err);
            console.error('Error details:', err.text || err.message);
        });

        // 2. Send to Admin (Business Owner)
        emailjs.send(
            'service_bopwq39',
            'template_wkgimvt', // Same Booking Template ID
            {
                meeting_id: meetingId,
                to_name: "Admin",
                to_email: 'businessman2124377@gmail.com', // CRITICAL: Admin's email
                customer_email: formData.email,
                from_name: formData.name,
                reply_to: formData.email, // Admin can reply to customer
                phone: formData.phone,
                company: formData.company || 'Not provided',
                service: formData.service || 'Not specified',
                package: formData.package || 'Not specified',
                message: formData.message || 'No additional message',
                preferred_date: formData.preferredDate || 'Flexible',
                preferred_time: formData.preferredTime || 'Flexible time',
                booking_date: new Date().toLocaleString(),
                meeting_type: 'New Consultation Request',
                message_type: 'ADMIN_NOTIFICATION'
            },
            'NP2Sat5tqcJqQqoQ2'
        ).then((response) => {
            console.log('✅ Admin booking email sent successfully');
            console.log('EmailJS response:', response);
        }).catch(err => {
            console.error('❌ Admin booking email FAILED:', err);
            console.error('Error details:', err.text || err.message);
        });
    };

    const services = [
        'Shopify Store',
        'Web Application',
        'UI/UX Design',
        'SEO Services',
        'AI Solutions',
        'Support & Maintenance',
        'Other'
    ];

    return (
        <div className="container-custom py-20">
            {isSuccess ? (
                // Success Message
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <div className="bg-white rounded-3xl shadow-2xl border-2 border-green-200 p-16">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <FiCheck className="w-12 h-12 text-green-600" />
                        </div>
                        <h2 className="text-4xl font-black text-gray-900 mb-4">Meeting Request Sent! 🎉</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Thank you for reaching out! We've received your consultation request and will contact you via email within 24 hours to confirm your meeting time.
                        </p>
                        <p className="text-sm text-gray-500">Redirecting to home...</p>
                    </div>
                </motion.div>
            ) : (
                // Booking Form
                <div className="max-w-4xl mx-auto">
                    {/* Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-sm mb-6">
                            <FiCalendar className="inline w-4 h-4 mr-2" />
                            Schedule Your Free Consultation
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-6">
                            Let's Discuss Your
                            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"> Project</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Book a free 30-minute consultation call. We'll discuss your needs and show you exactly how we can help.
                        </p>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden"
                    >
                        <form onSubmit={handleSubmit} className="p-8 md:p-12">
                            <div className="space-y-6">
                                {/* Personal Info */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                            <FiUser className="w-4 h-4" />
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                            placeholder="Muhammad Ather"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                            <FiMail className="w-4 h-4" />
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                            <FiPhone className="w-4 h-4" />
                                            WhatsApp Number *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                            placeholder="+92 300 1234567"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                            <FiBriefcase className="w-4 h-4" />
                                            Company/Business
                                        </label>
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                            placeholder="Optional"
                                        />
                                    </div>
                                </div>

                                {/* Service Selection */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">
                                            Service Interested In
                                        </label>
                                        <select
                                            name="service"
                                            value={formData.service}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                        >
                                            <option value="">Select a service</option>
                                            {services.map(service => (
                                                <option key={service} value={service}>{service}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">
                                            Package (if known)
                                        </label>
                                        <input
                                            type="text"
                                            name="package"
                                            value={formData.package}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                            placeholder="Optional"
                                        />
                                    </div>
                                </div>

                                {/* Meeting Time */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                            <FiCalendar className="w-4 h-4" />
                                            Preferred Date
                                        </label>
                                        <input
                                            type="date"
                                            name="preferredDate"
                                            value={formData.preferredDate}
                                            onChange={handleChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700">
                                            Preferred Time
                                        </label>
                                        <select
                                            name="preferredTime"
                                            value={formData.preferredTime}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                        >
                                            <option value="">Select time</option>
                                            <option value="morning">Morning (9am - 12pm)</option>
                                            <option value="afternoon">Afternoon (12pm - 5pm)</option>
                                            <option value="evening">Evening (5pm - 8pm)</option>
                                            <option value="flexible">Flexible</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                                        <FiMessageSquare className="w-4 h-4" />
                                        Tell us about your project
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none font-medium"
                                        placeholder="Briefly describe what you need help with..."
                                    />
                                </div>

                                {/* Info Box */}
                                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                                    <div className="flex items-start gap-3">
                                        <FiCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <div className="text-sm text-blue-900">
                                            <div className="font-black mb-1">What happens next?</div>
                                            <div className="font-medium">
                                                After submitting, we'll contact you on WhatsApp within 24 hours to confirm the meeting time and send you a calendar invite.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-black text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        'Submitting...'
                                    ) : (
                                        <>
                                            Schedule Free Consultation
                                            <FiArrowRight className="w-5 h-5" />
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>

                    {/* Benefits */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-12 grid md:grid-cols-3 gap-6 text-center"
                    >
                        <div className="p-6 bg-white rounded-2xl border border-gray-200">
                            <div className="text-4xl mb-2">⚡</div>
                            <div className="font-black text-gray-900 mb-1">Quick Response</div>
                            <div className="text-sm text-gray-600">Reply within 24 hours</div>
                        </div>
                        <div className="p-6 bg-white rounded-2xl border border-gray-200">
                            <div className="text-4xl mb-2">💯</div>
                            <div className="font-black text-gray-900 mb-1">No Commitment</div>
                            <div className="text-sm text-gray-600">Free consultation, no strings attached</div>
                        </div>
                        <div className="p-6 bg-white rounded-2xl border border-gray-200">
                            <div className="text-4xl mb-2">🎯</div>
                            <div className="font-black text-gray-900 mb-1">Expert Advice</div>
                            <div className="text-sm text-gray-600">Get actionable insights</div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}

export default function BookMeetingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-50">
                <div className="container-custom py-4 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-black">
                        Ather<span className="text-blue-600">Web</span>
                    </Link>
                    <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">
                        ← Back to Home
                    </Link>
                </div>
            </div>

            <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
                <BookMeetingContent />
            </Suspense>
        </div>
    );
}
