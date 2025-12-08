'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiArrowRight, FiArrowLeft, FiUpload, FiAlertCircle, FiCheckCircle, FiUser, FiMail, FiPhone, FiBriefcase, FiFileText, FiCalendar, FiCreditCard, FiPackage } from 'react-icons/fi';
import Link from 'next/link';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import emailjs from '@emailjs/browser';
import { useGeolocation } from '@/app/lib/useGeolocation';

// Package pricing configuration
const PACKAGES = {
    'design': { // UI/UX Design
        'Affordable': { price: 20000, advance: 6000 },
        'Branded Pro': { price: 50000, advance: 15000 },
        'Branded Premium': { price: 90000, advance: 27000 },
        'Exclusive Basic': { price: 120000, advance: 36000 },
        'Exclusive Pro': { price: 250000, advance: 75000 },
        'Exclusive Premium': { price: 450000, advance: 135000 }
    },
    'seo': { // SEO & Growth
        'Affordable': { price: 15000, advance: 4500 },
        'Branded Pro': { price: 40000, advance: 12000 },
        'Branded Premium': { price: 75000, advance: 22500 },
        'Exclusive Basic': { price: 100000, advance: 30000 },
        'Exclusive Pro': { price: 200000, advance: 60000 },
        'Exclusive Premium': { price: 400000, advance: 120000 }
    },
    'ai': { // AI Integration
        'Affordable': { price: 20000, advance: 6000 },
        'Branded Pro': { price: 50000, advance: 15000 },
        'Branded Premium': { price: 100000, advance: 30000 },
        'Exclusive Basic': { price: 150000, advance: 45000 },
        'Exclusive Pro': { price: 300000, advance: 90000 },
        'Exclusive Premium': { price: 500000, advance: 150000 }
    },
    'maintenance': { // Maintenance & Support
        'Affordable': { price: 8000, advance: 2400 },
        'Branded Pro': { price: 20000, advance: 6000 },
        'Branded Premium': { price: 35000, advance: 10500 },
        'Exclusive Basic': { price: 50000, advance: 15000 },
        'Exclusive Pro': { price: 100000, advance: 30000 },
        'Exclusive Premium': { price: 180000, advance: 54000 }
    },
    'web-app': { // Custom Web Applications
        'Affordable': { price: 25000, advance: 7500 },
        'Branded Pro': { price: 49000, advance: 14700 },
        'Branded Premium': { price: 100000, advance: 30000 },
        'Exclusive Basic': { price: 250000, advance: 75000 },
        'Exclusive Pro': { price: 500000, advance: 150000 },
        'Exclusive Premium': { price: 900000, advance: 270000 }
    },
    'shopify': { // Shopify Stores
        'Affordable': { price: 30000, advance: 9000 },
        'Branded Pro': { price: 70000, advance: 21000 },
        'Branded Premium': { price: 130000, advance: 39000 },
        'Exclusive Basic': { price: 180000, advance: 54000 },
        'Exclusive Pro': { price: 350000, advance: 105000 },
        'Exclusive Premium': { price: 500000, advance: 150000 }
    }
};

const ADDONS = [
    { id: 'seo_basic', name: 'On-Page SEO', price: 5000, desc: 'Basic SEO optimization for all pages' },
    { id: 'priority', name: 'Priority Support', price: 15000, desc: '24/7 dedicated support line' },
    { id: 'speed', name: 'Speed Optimization', price: 8000, desc: 'Score 90+ on Google PageSpeed' },
    { id: 'content', name: 'Content Writing', price: 10000, desc: 'Professional content for 5 pages' },
    { id: 'security', name: 'Advanced Security', price: 12000, desc: 'Firewall & Malware Protection' },
    { id: 'analytics', name: 'Analytics Setup', price: 5000, desc: 'Google Analytics 4 & Search Console' }
];

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
    const pathname = usePathname();
    const router = useRouter();
    const geoData = useGeolocation(); // Add geolocation detection
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

        if (service) {
            setFormData(prev => ({
                ...prev,
                serviceType: service,
                // Try to match package if provided, otherwise empty
                budget: packageParam && PACKAGES[service as keyof typeof PACKAGES] &&
                    Object.keys(PACKAGES[service as keyof typeof PACKAGES]).includes(packageParam)
                    ? packageParam : ''
            }));
        }
    }, [searchParams]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        serviceType: '',
        budget: '', // Now acts as 'Package Name'
        description: '',
        deadline: '',
        paymentAmount: '',
        paymentProof: null as File | null,
        paymentProofUrl: '',
        files: null as FileList | null,
        addons: [] as string[]
    });

    const toggleAddon = (addonId: string) => {
        setFormData(prev => {
            const newAddons = prev.addons.includes(addonId)
                ? prev.addons.filter(id => id !== addonId)
                : [...prev.addons, addonId];
            return { ...prev, addons: newAddons };
        });
    };

    const calculateTotal = () => {
        if (!formData.serviceType || !formData.budget) return 0;
        const basePrice = PACKAGES[formData.serviceType as keyof typeof PACKAGES]?.[formData.budget as keyof typeof PACKAGES[keyof typeof PACKAGES]]?.price || 0;
        const addonsPrice = formData.addons.reduce((total, addonId) => {
            const addon = ADDONS.find(a => a.id === addonId);
            return total + (addon?.price || 0);
        }, 0);
        return basePrice + addonsPrice;
    };

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


    // Validate payment against selected package (only for Pakistan/India)
    const validatePayment = (): boolean => {
        // Skip validation for non-Pakistan/India users
        if (!geoData.isLocal) {
            return true; // No payment required
        }

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
            setPaymentError(`Payment mismatch! Required Advance: PKR ${requiredAdvance}, You entered: PKR ${paymentAmount}`);
            return false;
        }

        if (!formData.paymentProof) {
            setPaymentError('Please upload payment proof screenshot');
            return false;
        }

        return true;
    };

    // Convert file to Base64
    const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

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
            // Convert payment proof to Base64 first
            let paymentProofBase64 = '';
            if (formData.paymentProof) {
                try {
                    paymentProofBase64 = await toBase64(formData.paymentProof);
                } catch (err) {
                    console.error('Error converting file to base64:', err);
                }
            }

            console.log('📧 Starting order submission process...');
            console.log('Customer email:', formData.email);

            try {
                // 1. Send emails FIRST (wait for them to complete)
                console.log('📧 Sending customer email to:', formData.email);

                const customerEmailResult = await emailjs.send(
                    'service_bopwq39',
                    'template_1ubs0z8',
                    {
                        order_id: newOrderId,
                        to_name: formData.name,
                        to_email: formData.email, // CRITICAL: Customer's email
                        customer_email: formData.email,
                        from_name: "Ather Web Agency",
                        reply_to: "athertechy@gmail.com", // Where customer can reply
                        phone: formData.phone || 'Not provided',
                        company: formData.company || 'Not provided',
                        service: formData.serviceType,
                        budget: formData.budget,
                        advance_payment: PACKAGES[formData.serviceType as keyof typeof PACKAGES]?.[formData.budget as keyof typeof PACKAGES[keyof typeof PACKAGES]]?.advance || 0,
                        payment_received: formData.paymentAmount,
                        addons: formData.addons.map(id => ADDONS.find(a => a.id === id)?.name).join(', ') || 'None',
                        total_price: calculateTotal(),
                        description: formData.description,
                        deadline: formData.deadline || 'Not specified',
                        order_date: new Date().toLocaleString(),
                        order_status: 'Confirmed - Payment Received',
                        tracking_link: `https://athertechy.com/track-order?id=${newOrderId}`,
                        message_type: 'CUSTOMER_CONFIRMATION'
                    },
                    'NP2Sat5tqcJqQqoQ2'
                );

                console.log('✅ Customer email sent successfully!');
                console.log('EmailJS response:', customerEmailResult);

                // Send to Admin
                console.log('📧 Sending admin email...');

                const adminEmailResult = await emailjs.send(
                    'service_bopwq39',
                    'template_1ubs0z8',
                    {
                        order_id: newOrderId,
                        to_name: "Admin",
                        to_email: 'athertechy@gmail.com', // CRITICAL: Admin's email
                        customer_email: formData.email,
                        from_name: formData.name,
                        reply_to: formData.email, // Admin can reply to customer
                        phone: formData.phone || 'Not provided',
                        company: formData.company || 'Not provided',
                        service: formData.serviceType,
                        budget: formData.budget,
                        advance_payment: PACKAGES[formData.serviceType as keyof typeof PACKAGES]?.[formData.budget as keyof typeof PACKAGES[keyof typeof PACKAGES]]?.advance || 0,
                        payment_received: formData.paymentAmount,
                        addons: formData.addons.map(id => ADDONS.find(a => a.id === id)?.name).join(', ') || 'None',
                        total_price: calculateTotal(),
                        description: formData.description,
                        deadline: formData.deadline || 'Not specified',
                        order_date: new Date().toLocaleString(),
                        order_status: 'Confirmed - Payment Received',
                        tracking_link: `https://athertechy.com/track-order?id=${newOrderId}`,
                        message_type: 'ADMIN_NOTIFICATION'
                    },
                    'NP2Sat5tqcJqQqoQ2'
                );

                console.log('✅ Admin email sent successfully!');
                console.log('EmailJS response:', adminEmailResult);

                // 2. Save to Database
                try {
                    const dbResponse = await fetch('/api/orders', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            orderId: newOrderId,
                            name: formData.name,
                            email: formData.email,
                            phone: formData.phone,
                            company: formData.company,
                            serviceType: formData.serviceType,
                            budget: formData.budget,
                            description: formData.description,
                            deadline: formData.deadline,
                            paymentAmount: parseInt(formData.paymentAmount),
                            paymentProof: paymentProofBase64,
                            addons: formData.addons,
                            totalPrice: calculateTotal(),
                            status: 'confirmed'
                        }),
                    });

                    if (!dbResponse.ok) {
                        const errorData = await dbResponse.json();
                        console.warn('⚠️ Database save failed:', errorData.error);
                    } else {
                        console.log('✅ Order saved to database');
                    }
                } catch (dbError) {
                    console.error('⚠️ Database error:', dbError);
                }

                // 3. Store in localStorage as backup
                const orders = JSON.parse(localStorage.getItem('orders') || '[]');
                orders.push({
                    orderId: newOrderId,
                    ...formData,
                    totalPrice: calculateTotal(),
                    status: 'Confirmed',
                    createdAt: new Date().toISOString()
                });
                localStorage.setItem('orders', JSON.stringify(orders));
                console.log('✅ Order saved to localStorage');

                // Success! Show confirmation
                setIsSubmitting(false);
                setIsSuccess(true);

                // Auto-copy Order ID
                try {
                    await navigator.clipboard.writeText(newOrderId);
                } catch (err) {
                    // Ignore clipboard errors
                }

                // Redirect to tracking page after 3 seconds
                setTimeout(() => {
                    router.push(`/track-order?id=${newOrderId}`);
                }, 3000);

            } catch (emailError: any) {
                console.error('❌ EMAIL SENDING FAILED!');
                console.error('Error details:', emailError);
                console.error('Error text:', emailError.text || emailError.message);

                setIsSubmitting(false);
                alert(`Failed to send confirmation email!\n\nError: ${emailError.text || emailError.message}\n\nPlease contact us directly via WhatsApp: +92 343 4153736`);
                return; // Stop here if emails fail
            }
        } catch (error: any) {
            console.error('❌ Order submission failed:', error);
            setIsSubmitting(false);
            const errorMessage = error?.text || error?.message || 'Unknown error occurred';
            alert(`Failed to submit order: ${errorMessage}\n\nPlease try again or contact us directly via WhatsApp at +92 343 4153736`);
        }
    };

    const nextStep = () => {
        setStep(step + 1);
        if (pathname === '/order') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const prevStep = () => {
        setStep(step - 1);
        if (pathname === '/order') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Conditional steps based on location
    // Pakistan/India: 4 steps (Contact, Project, Payment, Final)
    // Other countries: 3 steps (Contact, Project, Final) - No advance payment required
    const steps = geoData.isLocal
        ? [
            { id: 1, title: 'Contact', icon: FiUser },
            { id: 2, title: 'Project', icon: FiFileText },
            { id: 3, title: 'Payment', icon: FiCreditCard },
            { id: 4, title: 'Final', icon: FiPackage }
        ]
        : [
            { id: 1, title: 'Contact', icon: FiUser },
            { id: 2, title: 'Project', icon: FiFileText },
            { id: 3, title: 'Final', icon: FiPackage }
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
                                        }}
                                        className="text-2xl md:text-3xl font-black text-blue-600 break-all cursor-pointer hover:text-blue-700 transition-colors"
                                        title="Click to copy"
                                    >
                                        {orderId}
                                    </p>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(orderId);
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
                                                    onChange={(e) => {
                                                        setFormData({ ...formData, serviceType: e.target.value, budget: '' });
                                                    }}
                                                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                                >
                                                    <option value="">Select Service</option>
                                                    <option value="web-app">Custom Web Applications</option>
                                                    <option value="shopify">Shopify Stores</option>
                                                    <option value="seo">SEO & Growth</option>
                                                    <option value="design">UI/UX Design</option>
                                                    <option value="ai">AI Integration</option>
                                                    <option value="maintenance">Maintenance & Support</option>
                                                </select>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Select Package *</label>
                                                <select
                                                    name="budget"
                                                    required
                                                    value={formData.budget}
                                                    onChange={handleChange}
                                                    disabled={!formData.serviceType}
                                                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium disabled:bg-gray-100 disabled:text-gray-400"
                                                >
                                                    <option value="">{formData.serviceType ? 'Select a Package' : 'Select Service First'}</option>
                                                    {formData.serviceType && PACKAGES[formData.serviceType as keyof typeof PACKAGES] &&
                                                        Object.entries(PACKAGES[formData.serviceType as keyof typeof PACKAGES]).map(([pkgName, pkgDetails]) => (
                                                            <option key={pkgName} value={pkgName}>
                                                                {pkgName} - PKR {pkgDetails.price.toLocaleString()}
                                                            </option>
                                                        ))
                                                    }
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

                                {/* Step 3: Payment Details - ONLY FOR PAKISTAN/INDIA */}
                                {step === 3 && geoData.isLocal && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        className="space-y-8"
                                    >
                                        <h3 className="text-3xl font-black text-gray-900 mb-8">Payment Information</h3>

                                        {/* Payment Summary */}
                                        {formData.serviceType && formData.budget && PACKAGES[formData.serviceType as keyof typeof PACKAGES]?.[formData.budget as keyof typeof PACKAGES[keyof typeof PACKAGES]] && (
                                            <div className="space-y-6">
                                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-2xl p-8">
                                                    <div className="grid md:grid-cols-2 gap-6">
                                                        <div>
                                                            <p className="text-xs text-gray-600 font-bold uppercase tracking-wide mb-2">Your Selected Package</p>
                                                            <p className="text-2xl font-black text-gray-900 mb-1">{formData.budget}</p>
                                                            <p className="text-sm text-gray-600 capitalize">{formData.serviceType.replace('-', ' ')}</p>
                                                            <p className="text-lg font-bold text-blue-600 mt-2">
                                                                Total: PKR {PACKAGES[formData.serviceType as keyof typeof PACKAGES][formData.budget as keyof typeof PACKAGES[keyof typeof PACKAGES]].price.toLocaleString()}
                                                            </p>
                                                        </div>
                                                        <div className="border-l-2 border-blue-200 pl-6">
                                                            <p className="text-xs text-blue-700 font-bold uppercase tracking-wide mb-2">💰 Advance Payment Required</p>
                                                            <p className="text-4xl font-black text-blue-600">
                                                                PKR {PACKAGES[formData.serviceType as keyof typeof PACKAGES][formData.budget as keyof typeof PACKAGES[keyof typeof PACKAGES]].advance.toLocaleString()}
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
                                                            <span className="text-gray-600">Total Package Price:</span>
                                                            <span className="font-bold text-gray-900">
                                                                PKR {PACKAGES[formData.serviceType as keyof typeof PACKAGES][formData.budget as keyof typeof PACKAGES[keyof typeof PACKAGES]].price.toLocaleString()}
                                                            </span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Advance Payment (30%):</span>
                                                            <span className="font-bold text-blue-600">
                                                                PKR {PACKAGES[formData.serviceType as keyof typeof PACKAGES][formData.budget as keyof typeof PACKAGES[keyof typeof PACKAGES]].advance.toLocaleString()}
                                                            </span>
                                                        </div>
                                                        <div className="border-t border-gray-200 pt-3 flex justify-between">
                                                            <span className="text-gray-600">Remaining Balance (70%):</span>
                                                            <span className="font-bold text-gray-900">
                                                                PKR {(PACKAGES[formData.serviceType as keyof typeof PACKAGES][formData.budget as keyof typeof PACKAGES[keyof typeof PACKAGES]].price - PACKAGES[formData.serviceType as keyof typeof PACKAGES][formData.budget as keyof typeof PACKAGES[keyof typeof PACKAGES]].advance).toLocaleString()}
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

                                {/* Step 3 OR 4: Final Details - Conditional based on location */}
                                {((step === 3 && !geoData.isLocal) || (step === 4 && geoData.isLocal)) && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        className="space-y-8"
                                    >
                                        <h3 className="text-3xl font-black text-gray-900 mb-8">Final Details</h3>

                                        {/* Add-ons Selection */}
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-black text-gray-900">Optional Add-ons</h3>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {ADDONS.map((addon) => (
                                                    <div
                                                        key={addon.id}
                                                        onClick={() => toggleAddon(addon.id)}
                                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.addons.includes(addon.id)
                                                            ? 'border-blue-500 bg-blue-50'
                                                            : 'border-gray-200 hover:border-blue-300'
                                                            }`}
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${formData.addons.includes(addon.id)
                                                                ? 'bg-blue-500 border-blue-500'
                                                                : 'border-gray-300'
                                                                }`}>
                                                                {formData.addons.includes(addon.id) && <FiCheckCircle className="w-4 h-4 text-white" />}
                                                            </div>
                                                            <div>
                                                                <div className="flex justify-between items-center mb-1">
                                                                    <span className="font-bold text-gray-900">{addon.name}</span>
                                                                    <span className="text-sm font-bold text-blue-600">+PKR {addon.price.toLocaleString()}</span>
                                                                </div>
                                                                <p className="text-xs text-gray-500">{addon.desc}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Order Summary */}
                                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
                                            <h4 className="text-lg font-black text-gray-900 mb-6">Order Review</h4>
                                            <div className="space-y-4 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Service:</span>
                                                    <span className="font-bold text-gray-900 capitalize">{formData.serviceType?.replace('-', ' ')}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Package:</span>
                                                    <span className="font-bold text-gray-900">{formData.budget}</span>
                                                </div>

                                                {formData.addons.length > 0 && (
                                                    <div className="py-2 border-y border-gray-200 space-y-2">
                                                        <p className="text-xs font-bold text-gray-500 uppercase">Selected Add-ons:</p>
                                                        {formData.addons.map(addonId => {
                                                            const addon = ADDONS.find(a => a.id === addonId);
                                                            return (
                                                                <div key={addonId} className="flex justify-between text-gray-600">
                                                                    <span>{addon?.name}</span>
                                                                    <span>+PKR {addon?.price.toLocaleString()}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}

                                                <div className="flex justify-between text-lg">
                                                    <span className="font-bold text-gray-900">Total Project Value:</span>
                                                    <span className="font-black text-blue-600">PKR {calculateTotal().toLocaleString()}</span>
                                                </div>

                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Advance Paid:</span>
                                                    <span className="font-bold text-green-600">- PKR {parseInt(formData.paymentAmount || '0').toLocaleString()}</span>
                                                </div>

                                                <div className="border-t border-gray-300 pt-4 flex justify-between">
                                                    <span className="text-gray-600 font-bold">Remaining Balance:</span>
                                                    <span className="font-bold text-gray-900">PKR {(calculateTotal() - parseInt(formData.paymentAmount || '0')).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Error Message Display for Step 4 */}
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

                                {/* Navigation Buttons */}
                                <div className="flex justify-between pt-8 border-t border-gray-100">
                                    {step > 1 ? (
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all flex items-center gap-2"
                                        >
                                            <FiArrowLeft className="w-5 h-5" />
                                            Previous
                                        </button>
                                    ) : (
                                        <div></div>
                                    )}

                                    {step < 4 ? (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105 shadow-xl flex items-center gap-2"
                                        >
                                            Next Step
                                            <FiArrowRight className="w-5 h-5" />
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all hover:scale-105 shadow-xl flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    Confirm Order
                                                    <FiSend className="w-5 h-5" />
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </AnimatePresence>
                        </form>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
