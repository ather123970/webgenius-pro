'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiArrowRight, FiArrowLeft, FiUpload, FiAlertCircle, FiCheckCircle, FiUser, FiMail, FiPhone, FiBriefcase, FiFileText, FiCalendar, FiCreditCard, FiPackage } from 'react-icons/fi';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import emailjs from '@emailjs/browser';

// Package pricing configuration
const PACKAGES = {
    'web-app': {
        '30k-70k': { min: 30000, max: 70000, advance: 9000 },
        '70k-150k': { min: 70000, max: 150000, advance: 21000 },
        '150k-300k': { min: 150000, max: 300000, advance: 45000 },
        '300k+': { min: 300000, max: 999999, advance: 90000 }
    },
    'shopify': {
        '30k-70k': { min: 30000, max: 70000, advance: 9000 },
        '70k-150k': { min: 70000, max: 150000, advance: 21000 },
        '150k-300k': { min: 150000, max: 300000, advance: 45000 },
        '300k+': { min: 300000, max: 999999, advance: 90000 }
    },
    'seo': {
        '30k-70k': { min: 30000, max: 70000, advance: 9000 },
        '70k-150k': { min: 70000, max: 150000, advance: 21000 },
        '150k-300k': { min: 150000, max: 300000, advance: 45000 },
        '300k+': { min: 300000, max: 999999, advance: 90000 }
    },
    'design': {
        '30k-70k': { min: 30000, max: 70000, advance: 9000 },
        '70k-150k': { min: 70000, max: 150000, advance: 21000 },
        '150k-300k': { min: 150000, max: 300000, advance: 45000 },
        '300k+': { min: 300000, max: 999999, advance: 90000 }
    },
    'maintenance': {
        '30k-70k': { min: 30000, max: 70000, advance: 9000 },
        '70k-150k': { min: 70000, max: 150000, advance: 21000 },
        '150k-300k': { min: 150000, max: 300000, advance: 45000 },
        '300k+': { min: 300000, max: 999999, advance: 90000 }
    }
};

// Generate unique Order ID
const generateOrderId = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `ORD-${timestamp}-${random}`;
};

// Extract thousands from amount (e.g., 3100 -> 3)
const getThousands = (amount: number) => Math.floor(amount / 1000);

export default function OrderFormNew() {
    const searchParams = useSearchParams();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [paymentError, setPaymentError] = useState('');

    // Initialize EmailJS and handle URL parameters
    useEffect(() => {
        emailjs.init('NP2Sat5tqcJqQqoQ2');

        // Pre-fill form from URL parameters
        const service = searchParams.get('service');
        const packageParam = searchParams.get('package');

        if (service || packageParam) {
            setFormData(prev => ({
                ...prev,
                serviceType: service || '',
                budget: packageParam || ''
            }));
        }
    }, [searchParams]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        serviceType: '',
        budget: '',
        description: '',
        deadline: '',
        paymentAmount: '',
        paymentProof: null as File | null,
        paymentProofUrl: '',
        files: null as FileList | null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setPaymentError('');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'paymentProof' | 'files') => {
        if (fileType === 'paymentProof' && e.target.files?.[0]) {
            const file = e.target.files[0];
            const url = URL.createObjectURL(file);
            setFormData({ ...formData, paymentProof: file, paymentProofUrl: url });
        } else if (fileType === 'files') {
            setFormData({ ...formData, files: e.target.files });
        }
    };

    const handleReplacePaymentProof = () => {
        setFormData({ ...formData, paymentProof: null, paymentProofUrl: '' });
        // Reset file input
        const fileInput = document.getElementById('paymentProof') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    // Validate payment against selected package
    const validatePayment = (): boolean => {
        if (!formData.serviceType || !formData.budget || !formData.paymentAmount) {
            setPaymentError('Please fill all payment fields');
            return false;
        }

        const packageInfo = PACKAGES[formData.serviceType as keyof typeof PACKAGES]?.[formData.budget as keyof typeof PACKAGES[keyof typeof PACKAGES]];
        if (!packageInfo) {
            setPaymentError('Invalid package selection');
            return false;
        }

        const paymentAmount = parseInt(formData.paymentAmount);
        const requiredAdvance = packageInfo.advance;

        // Check thousands only (ignore hundreds and below)
        const paymentThousands = getThousands(paymentAmount);
        const requiredThousands = getThousands(requiredAdvance);

        if (paymentThousands !== requiredThousands) {
            setPaymentError(`Payment mismatch! Required: PKR ${requiredAdvance} (${requiredThousands}k), You entered: PKR ${paymentAmount} (${paymentThousands}k)`);
            return false;
        }

        if (!formData.paymentProof) {
            setPaymentError('Please upload payment proof screenshot');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate payment
        if (!validatePayment()) {
            setIsSubmitting(false);
            return;
        }

        setIsSubmitting(true);
        const newOrderId = generateOrderId();
        setOrderId(newOrderId);

        try {
            // Send order confirmation email to customer
            const customerResult = await emailjs.send(
                'service_bopwq39', // Your Service ID
                'template_1ubs0z8', // Your Template ID (Order Confirmation Template)
                {
                    order_id: newOrderId,
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone || 'Not provided',
                    company: formData.company || 'Not provided',
                    service: formData.serviceType,
                    budget: formData.budget,
                    advance_payment: PACKAGES[formData.serviceType as keyof typeof PACKAGES]?.[formData.budget as keyof typeof PACKAGES[keyof typeof PACKAGES]]?.advance || 0,
                    payment_received: formData.paymentAmount,
                    description: formData.description,
                    deadline: formData.deadline || 'Not specified',
                    order_date: new Date().toLocaleString(),
                    order_status: 'Confirmed - Payment Received',
                    tracking_link: `https://atherweb.agency/track-order?id=${newOrderId}`
                },
                'NP2Sat5tqcJqQqoQ2' // Your Public Key
            );

            console.log('Customer confirmation sent:', customerResult.text);

            // Send order notification to business email
            const businessResult = await emailjs.send(
                'service_bopwq39', // Your Service ID
                'template_1ubs0z8', // Same Template ID (or create separate admin template)
                {
                    order_id: newOrderId,
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone || 'Not provided',
                    company: formData.company || 'Not provided',
                    service: formData.serviceType,
                    budget: formData.budget,
                    advance_payment: PACKAGES[formData.serviceType as keyof typeof PACKAGES]?.[formData.budget as keyof typeof PACKAGES[keyof typeof PACKAGES]]?.advance || 0,
                    payment_received: formData.paymentAmount,
                    description: formData.description,
                    deadline: formData.deadline || 'Not specified',
                    order_date: new Date().toLocaleString(),
                    order_status: 'Confirmed - Payment Received',
                    tracking_link: `https://atherweb.agency/track-order?id=${newOrderId}`,
                    to_email: 'businessman2124377@gmail.com', // Business email for admin notification
                    notification_type: 'ADMIN_NOTIFICATION'
                },
                'NP2Sat5tqcJqQqoQ2' // Your Public Key
            );

            console.log('Business notification sent:', businessResult.text);
            setIsSubmitting(false);
            setIsSuccess(true);

            // Store order in localStorage for tracking
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            orders.push({
                orderId: newOrderId,
                ...formData,
                status: 'Confirmed',
                createdAt: new Date().toISOString()
            });
            localStorage.setItem('orders', JSON.stringify(orders));

            // Reset form after 5 seconds
            setTimeout(() => {
                setIsSuccess(false);
                setStep(1);
                setFormData({
                    name: '', email: '', company: '', phone: '', serviceType: '',
                    budget: '', description: '', deadline: '', paymentAmount: '',
                    paymentProof: null, paymentProofUrl: '', files: null
                });
            }, 5000);
        } catch (error: any) {
            console.error('Failed to send order:', error);
            setIsSubmitting(false);
            const errorMessage = error?.text || error?.message || 'Unknown error occurred';
            alert(`Failed to send order: ${errorMessage}\n\nPlease try again or contact us directly via WhatsApp.`);
        }
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const steps = [
        { id: 1, title: 'Contact', icon: FiUser },
        { id: 2, title: 'Project', icon: FiFileText },
        { id: 3, title: 'Payment', icon: FiCreditCard },
        { id: 4, title: 'Final', icon: FiPackage }
    ];

    return (
        <section id="order" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
            </div>

            <div className="max-w-5xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-6">
                        <FiPackage className="w-4 h-4 mr-2" />
                        Start Your Project
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">
                        Let's Build Something
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Amazing</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Transform your ideas into reality. Our expert team is ready to bring your vision to life.
                    </p>
                </motion.div>

                {/* Progress Steps */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex justify-center mb-12"
                >
                    <div className="flex items-center space-x-4">
                        {steps.map((s, index) => (
                            <React.Fragment key={s.id}>
                                <div className="flex items-center">
                                    <motion.div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= s.id
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                                : 'bg-gray-200 text-gray-500'
                                            }`}
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <s.icon className="w-5 h-5" />
                                    </motion.div>
                                    <span className={`ml-3 font-medium text-sm ${step >= s.id ? 'text-gray-900' : 'text-gray-500'
                                        }`}>
                                        {s.title}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`w-12 h-0.5 mx-4 ${step > s.id ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-300'
                                        }`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
                >
                    {isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-20 px-8"
                        >
                            <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
                                <FiCheckCircle className="w-12 h-12 text-green-600" />
                            </div>
                            <h3 className="text-4xl font-black text-gray-900 mb-4">Order Confirmed! 🎉</h3>
                            <p className="text-xl text-gray-600 mb-8">Your project is now in our expert hands. We'll be in touch within 24 hours.</p>

                            {/* Order ID Display */}
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8 border-2 border-blue-200 max-w-md mx-auto">
                                <p className="text-sm text-gray-600 font-bold mb-2">Your Order ID</p>
                                <div className="flex items-center justify-between gap-4">
                                    <p
                                        onClick={() => {
                                            navigator.clipboard.writeText(orderId);
                                            alert('✅ Order ID copied to clipboard!');
                                        }}
                                        className="text-2xl md:text-3xl font-black text-blue-600 break-all cursor-pointer hover:text-blue-700 transition-colors"
                                        title="Click to copy"
                                    >
                                        {orderId}
                                    </p>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(orderId);
                                            alert('✅ Order ID copied to clipboard!');
                                        }}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all flex items-center gap-2 whitespace-nowrap text-sm"
                                        title="Copy to clipboard"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        Copy
                                    </button>
                                </div>
                                <p className="text-sm text-gray-500 mt-3">Save this ID to track your order</p>
                            </div>


                            <Link
                                href={`/track-order?id=${orderId}`}
                                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105 shadow-xl"
                            >
                                Track Your Order
                                <FiArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                            <p className="text-sm text-gray-500 mt-6">Redirecting in 5 seconds...</p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-8 md:p-12">
                            <AnimatePresence mode="wait">
                                {/* Step 1: Contact Details */}
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        className="space-y-8"
                                    >
                                        <h3 className="text-3xl font-black text-gray-900 mb-8">Contact Information</h3>

                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
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
                                                    placeholder="John Doe"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
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
                                                    placeholder="john@example.com"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                                    <FiPhone className="w-4 h-4" />
                                                    Phone Number *
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
                                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                                    <FiBriefcase className="w-4 h-4" />
                                                    Company Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="company"
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                                    placeholder="Acme Inc."
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Project Details */}
                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        className="space-y-8"
                                    >
                                        <h3 className="text-3xl font-black text-gray-900 mb-8">Project Details</h3>

                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Service Type *</label>
                                                <select
                                                    name="serviceType"
                                                    required
                                                    value={formData.serviceType}
                                                    onChange={handleChange}
                                                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                                >
                                                    <option value="">Select Service</option>
                                                    <option value="web-app">Web Application</option>
                                                    <option value="shopify">Shopify Store</option>
                                                    <option value="seo">SEO Services</option>
                                                    <option value="design">UI/UX Design</option>
                                                    <option value="maintenance">Maintenance Services</option>
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Budget Range *</label>
                                                <select
                                                    name="budget"
                                                    required
                                                    value={formData.budget}
                                                    onChange={handleChange}
                                                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                                >
                                                    <option value="">Select Budget</option>
                                                    <option value="30k-70k">30k - 70k</option>
                                                    <option value="70k-150k">70k - 150k</option>
                                                    <option value="150k-300k">150k - 300k</option>
                                                    <option value="300k+">300k+</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                                <FiFileText className="w-4 h-4" />
                                                Project Description *
                                            </label>
                                            <textarea
                                                name="description"
                                                required
                                                value={formData.description}
                                                onChange={handleChange}
                                                rows={4}
                                                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium resize-none"
                                                placeholder="Tell us about your project requirements..."
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                                <FiCalendar className="w-4 h-4" />
                                                Expected Deadline
                                            </label>
                                            <input
                                                type="date"
                                                name="deadline"
                                                value={formData.deadline}
                                                onChange={handleChange}
                                                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Payment Details */}
                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        className="space-y-8"
                                    >
                                        <h3 className="text-3xl font-black text-gray-900 mb-8">Payment Information</h3>

                                        {/* Payment Summary */}
                                        {formData.serviceType && formData.budget && (
                                            <div className="space-y-6">
                                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-2xl p-8">
                                                    <div className="grid md:grid-cols-2 gap-6">
                                                        <div>
                                                            <p className="text-xs text-gray-600 font-bold uppercase tracking-wide mb-2">Your Selected Package</p>
                                                            <p className="text-2xl font-black text-gray-900 mb-1">{formData.budget}</p>
                                                            <p className="text-sm text-gray-600 capitalize">{formData.serviceType.replace('-', ' ')}</p>
                                                        </div>
                                                        <div className="border-l-2 border-blue-200 pl-6">
                                                            <p className="text-xs text-blue-700 font-bold uppercase tracking-wide mb-2">💰 Advance Payment Required</p>
                                                            <p className="text-4xl font-black text-blue-600">
                                                                PKR {PACKAGES[formData.serviceType as keyof typeof PACKAGES]?.[formData.budget as keyof typeof PACKAGES[keyof typeof PACKAGES]]?.advance || 0}
                                                            </p>
                                                            <p className="text-xs text-blue-600 font-bold mt-2">30% of total package</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Payment breakdown */}
                                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                                    <p className="text-xs font-bold text-gray-600 mb-4">PAYMENT BREAKDOWN</p>
                                                    <div className="space-y-3 text-sm">
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Advance Payment (30%):</span>
                                                            <span className="font-bold text-blue-600">PKR {PACKAGES[formData.serviceType as keyof typeof PACKAGES]?.[formData.budget as keyof typeof PACKAGES[keyof typeof PACKAGES]]?.advance || 0}</span>
                                                        </div>
                                                        <div className="border-t border-gray-200 pt-3 flex justify-between">
                                                            <span className="text-gray-600">Remaining Balance (70%):</span>
                                                            <span className="font-bold text-gray-900">
                                                                PKR {Math.round((PACKAGES[formData.serviceType as keyof typeof PACKAGES]?.[formData.budget as keyof typeof PACKAGES[keyof typeof PACKAGES]]?.advance || 0) * 7 / 3)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Payment amount input */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                                <FiCreditCard className="w-4 h-4" />
                                                Amount Paid (PKR) *
                                            </label>
                                            <input
                                                type="number"
                                                name="paymentAmount"
                                                required
                                                value={formData.paymentAmount}
                                                onChange={handleChange}
                                                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                                placeholder="Enter amount paid"
                                            />
                                        </div>

                                        {/* Bank Details */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                                <FiCreditCard className="w-4 h-4" />
                                                Bank Transfer Details
                                            </label>
                                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
                                                <div className="space-y-3 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600 font-medium">Bank:</span>
                                                        <span className="font-bold text-gray-900">MEEZAN DIGITAL CENTRE</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600 font-medium">Account Title:</span>
                                                        <span className="font-bold text-gray-900">ASIYA PARVEEN</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600 font-medium">Account Number:</span>
                                                        <span className="font-bold text-gray-900">00300112941126</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600 font-medium">IBAN:</span>
                                                        <span className="font-bold text-gray-900">PK68MEZN0000300112941126</span>
                                                    </div>
                                                </div>
                                                <div className="mt-4 p-3 bg-green-100 rounded-lg">
                                                    <p className="text-xs text-green-800 font-medium">
                                                        💡 Please transfer the advance payment amount and upload the payment receipt/screenshot below
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Payment proof upload with preview */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                                <FiUpload className="w-4 h-4" />
                                                Payment Proof Screenshot *
                                            </label>

                                            {formData.paymentProofUrl ? (
                                                <div className="border-2 border-blue-300 rounded-xl p-4 bg-blue-50">
                                                    <div className="relative">
                                                        <img
                                                            src={formData.paymentProofUrl}
                                                            alt="Payment Proof"
                                                            className="w-full h-64 object-contain rounded-lg bg-white"
                                                        />
                                                        <div className="absolute top-2 right-2">
                                                            <button
                                                                type="button"
                                                                onClick={handleReplacePaymentProof}
                                                                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
                                                            >
                                                                <FiUpload className="w-4 h-4" />
                                                                Replace
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 text-center">
                                                        <p className="text-sm text-gray-700 font-medium">{formData.paymentProof?.name}</p>
                                                        <p className="text-xs text-gray-500">Payment proof uploaded successfully</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleFileChange(e, 'paymentProof')}
                                                        className="hidden"
                                                        id="paymentProof"
                                                    />
                                                    <label htmlFor="paymentProof" className="cursor-pointer">
                                                        <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                        <p className="text-gray-600 font-medium">
                                                            Click to upload payment screenshot
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-2">JPG, PNG up to 10MB</p>
                                                    </label>
                                                </div>
                                            )}
                                        </div>

                                        {/* Payment Error */}
                                        {paymentError && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl"
                                            >
                                                <FiAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                                <p className="text-red-700 font-medium">{paymentError}</p>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}

                                {/* Step 4: Final Details */}
                                {step === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        className="space-y-8"
                                    >
                                        <h3 className="text-3xl font-black text-gray-900 mb-8">Final Details</h3>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                                <FiCalendar className="w-4 h-4" />
                                                Project Deadline
                                            </label>
                                            <input
                                                type="date"
                                                name="deadline"
                                                value={formData.deadline}
                                                onChange={handleChange}
                                                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                            />
                                        </div>

                                        {/* Additional Files */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                                <FiPackage className="w-4 h-4" />
                                                Additional Files (Optional)
                                            </label>
                                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
                                                <input
                                                    type="file"
                                                    multiple
                                                    onChange={(e) => handleFileChange(e, 'files')}
                                                    className="hidden"
                                                    id="additionalFiles"
                                                />
                                                <label htmlFor="additionalFiles" className="cursor-pointer">
                                                    <FiPackage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                    <p className="text-gray-600 font-medium">
                                                        {formData.files ? `${formData.files.length} files selected` : 'Click to upload additional files'}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-2">Multiple files allowed</p>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Order Summary */}
                                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
                                            <h4 className="text-lg font-black text-gray-900 mb-6">Order Summary</h4>
                                            <div className="space-y-4 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Service:</span>
                                                    <span className="font-bold text-gray-900 capitalize">{formData.serviceType?.replace('-', ' ')}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Package:</span>
                                                    <span className="font-bold text-gray-900">{formData.budget}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Advance Payment:</span>
                                                    <span className="font-bold text-blue-600">PKR {PACKAGES[formData.serviceType as keyof typeof PACKAGES]?.[formData.budget as keyof typeof PACKAGES[keyof typeof PACKAGES]]?.advance || 0}</span>
                                                </div>
                                                <div className="border-t border-gray-300 pt-4 flex justify-between">
                                                    <span className="text-gray-600">Amount Paid:</span>
                                                    <span className="font-bold text-green-600">PKR {formData.paymentAmount}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between items-center mt-12">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-8 py-4 text-gray-600 font-black hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all flex items-center gap-2"
                                    >
                                        <FiArrowLeft className="w-5 h-5" />
                                        Back
                                    </button>
                                )}

                                <div className="ml-auto">
                                    {step < 4 ? (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-black text-lg hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105 shadow-xl flex items-center gap-2"
                                        >
                                            Next Step
                                            <FiArrowRight className="w-5 h-5" />
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-12 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-black text-lg hover:from-green-700 hover:to-emerald-700 transition-all hover:scale-105 shadow-xl flex items-center gap-2 disabled:opacity-70"
                                        >
                                            {isSubmitting ? 'Processing...' : 'Confirm Order'}
                                            {!isSubmitting && <FiSend className="w-5 h-5" />}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
