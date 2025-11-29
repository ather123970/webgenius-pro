'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiArrowRight, FiUpload, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
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

export default function OrderForm() {
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
        files: null as FileList | null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setPaymentError('');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'paymentProof' | 'files') => {
        if (fileType === 'paymentProof' && e.target.files?.[0]) {
            setFormData({ ...formData, paymentProof: e.target.files[0] });
        } else if (fileType === 'files') {
            setFormData({ ...formData, files: e.target.files });
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
                    tracking_link: `https://athertechy.com/track-order?id=${newOrderId}`
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
                    tracking_link: `https://athertechy.com/track-order?id=${newOrderId}`,
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
                    paymentProof: null, files: null
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

    return (
        <section id="order" className="py-32 bg-gradient-to-br from-blue-50 to-purple-50 relative">
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-sm mb-6">
                        Start Project
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">Launch Your Vision</h2>
                    <p className="text-xl text-gray-600">Tell us about your project. We'll make it amazing.</p>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
                    {/* Progress Bar */}
                    <div className="h-2 bg-gray-100 w-full">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                            initial={{ width: '0%' }}
                            animate={{ width: `${(step / 4) * 100}%` }}
                        />
                    </div>

                    <div className="p-10 md:p-12">
                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-16"
                            >
                                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FiCheckCircle className="w-12 h-12 text-green-600" />
                                </div>
                                <h3 className="text-3xl font-black text-gray-900 mb-3">Order Confirmed! 🎉</h3>
                                <p className="text-lg text-gray-600 mb-6">Payment received and order is being processed.</p>

                                {/* Order ID Display */}
                                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border-2 border-blue-200">
                                    <p className="text-sm text-gray-600 font-bold mb-2">Your Order ID</p>
                                    <p className="text-2xl font-black text-blue-600 break-all">{orderId}</p>
                                    <p className="text-xs text-gray-500 mt-3">Save this ID to track your order</p>
                                </div>

                                <a
                                    href={`/track-order?id=${orderId}`}
                                    className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
                                >
                                    Track Your Order
                                </a>
                                <p className="text-sm text-gray-500 mt-4">Redirecting in 5 seconds...</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                {/* Step 1 */}
                                {step === 1 && (
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                        <h3 className="text-2xl font-black text-gray-900 mb-8">Contact Details</h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Full Name *</label>
                                                <input type="text" name="name" required value={formData.name} onChange={handleChange}
                                                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                                    placeholder="John Doe" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Email *</label>
                                                <input type="email" name="email" required value={formData.email} onChange={handleChange}
                                                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                                    placeholder="john@example.com" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Phone</label>
                                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                                    placeholder="+92 300 1234567" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Company</label>
                                                <input type="text" name="company" value={formData.company} onChange={handleChange}
                                                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                                    placeholder="Acme Inc." />
                                            </div>
                                        </div>
                                        <div className="flex justify-end pt-6">
                                            <button type="button" onClick={nextStep}
                                                className="px-10 py-4 bg-blue-600 text-white rounded-xl font-black text-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
                                                Next <FiArrowRight />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2 */}
                                {step === 2 && (
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                        <h3 className="text-2xl font-black text-gray-900 mb-8">Project Details</h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Service *</label>
                                                <select name="serviceType" value={formData.serviceType} onChange={handleChange}
                                                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium">
                                                    <option value="">Select Service</option>
                                                    <option value="web-app">Custom Web App</option>
                                                    <option value="shopify">Shopify Store</option>
                                                    <option value="seo">SEO & Growth</option>
                                                    <option value="design">UI/UX Design</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-gray-700">Budget (PKR) *</label>
                                                <select name="budget" value={formData.budget} onChange={handleChange}
                                                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium">
                                                    <option value="">Select Budget</option>
                                                    <option value="30k-70k">30k - 70k</option>
                                                    <option value="70k-150k">70k - 150k</option>
                                                    <option value="150k-300k">150k - 300k</option>
                                                    <option value="300k+">300k+</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Description *</label>
                                            <textarea name="description" rows={4} value={formData.description} onChange={handleChange}
                                                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none font-medium"
                                                placeholder="Tell us about your project..." />
                                        </div>
                                        <div className="flex justify-between pt-6">
                                            <button type="button" onClick={prevStep}
                                                className="px-8 py-4 text-gray-600 font-black hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                                                Back
                                            </button>
                                            <button type="button" onClick={nextStep}
                                                className="px-10 py-4 bg-blue-600 text-white rounded-xl font-black text-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg flex items-center gap-2">
                                                Next <FiArrowRight />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3 - Payment */}
                                {step === 3 && (
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                        <h3 className="text-2xl font-black text-gray-900 mb-8">Payment Details (30% Advance)</h3>

                                        {/* Show required advance payment */}
                                        {formData.serviceType && formData.budget && (
                                            <div className="space-y-4">
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
                                                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                                    <p className="text-xs font-bold text-gray-600 mb-3">PAYMENT BREAKDOWN</p>
                                                    <div className="space-y-2 text-sm">
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Advance Payment (30%):</span>
                                                            <span className="font-bold text-blue-600">PKR {PACKAGES[formData.serviceType as keyof typeof PACKAGES]?.[formData.budget as keyof typeof PACKAGES[keyof typeof PACKAGES]]?.advance || 0}</span>
                                                        </div>
                                                        <div className="border-t border-gray-200 pt-2 flex justify-between">
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
                                            <label className="text-sm font-bold text-gray-700">Amount Paid (PKR) *</label>
                                            <input
                                                type="number"
                                                name="paymentAmount"
                                                value={formData.paymentAmount}
                                                onChange={handleChange}
                                                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                                placeholder="Enter amount you paid"
                                            />
                                            <p className="text-xs text-gray-500">Enter exact amount (checking thousands only)</p>
                                        </div>

                                        {/* Payment proof upload */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Payment Proof Screenshot *</label>
                                            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-500 transition-all cursor-pointer group">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileChange(e, 'paymentProof')}
                                                    className="hidden"
                                                    id="paymentProofInput"
                                                />
                                                <label htmlFor="paymentProofInput" className="cursor-pointer block">
                                                    <FiUpload className="w-10 h-10 text-gray-400 group-hover:text-blue-600 mx-auto mb-4 transition-colors" />
                                                    <p className="text-sm text-gray-600 font-bold">
                                                        <span className="text-blue-600">Click to upload</span> payment screenshot
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-2">JPG, PNG (Max 10MB)</p>
                                                    {formData.paymentProof && (
                                                        <p className="text-xs text-green-600 font-bold mt-2">✓ {formData.paymentProof.name}</p>
                                                    )}
                                                </label>
                                            </div>
                                        </div>

                                        {/* Error message */}
                                        {paymentError && (
                                            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex gap-3">
                                                <FiAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                                <p className="text-sm text-red-700 font-bold">{paymentError}</p>
                                            </div>
                                        )}

                                        <div className="flex justify-between pt-6">
                                            <button type="button" onClick={prevStep}
                                                className="px-8 py-4 text-gray-600 font-black hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                                                Back
                                            </button>
                                            <button type="button" onClick={nextStep}
                                                className="px-10 py-4 bg-blue-600 text-white rounded-xl font-black text-lg hover:bg-blue-700 transition-all hover:scale-105 shadow-lg flex items-center gap-2">
                                                Next <FiArrowRight />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 4 - Final Details */}
                                {step === 4 && (
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                        <h3 className="text-2xl font-black text-gray-900 mb-8">Final Details</h3>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Project Deadline</label>
                                            <input type="date" name="deadline" value={formData.deadline} onChange={handleChange}
                                                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium" />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-700">Additional Files (Optional)</label>
                                            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center hover:border-blue-500 transition-all cursor-pointer group">
                                                <input
                                                    type="file"
                                                    multiple
                                                    onChange={(e) => handleFileChange(e, 'files')}
                                                    className="hidden"
                                                    id="filesInput"
                                                />
                                                <label htmlFor="filesInput" className="cursor-pointer block">
                                                    <FiUpload className="w-10 h-10 text-gray-400 group-hover:text-blue-600 mx-auto mb-4 transition-colors" />
                                                    <p className="text-sm text-gray-600 font-bold">
                                                        <span className="text-blue-600">Click to upload</span> or drag files
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-2">PDF, DOC, JPG (Max 10MB each)</p>
                                                </label>
                                            </div>
                                        </div>

                                        <div className="flex justify-between pt-6">
                                            <button type="button" onClick={prevStep}
                                                className="px-8 py-4 text-gray-600 font-black hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
                                                Back
                                            </button>
                                            <button type="submit" disabled={isSubmitting}
                                                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-black text-lg hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105 shadow-xl flex items-center gap-2 disabled:opacity-70">
                                                {isSubmitting ? 'Processing...' : 'Confirm Order'}
                                                {!isSubmitting && <FiSend />}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
