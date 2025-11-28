'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { FiSearch, FiCheckCircle, FiClock, FiTruck, FiAlertCircle } from 'react-icons/fi';
import Link from 'next/link';

function TrackOrderContent() {
    const searchParams = useSearchParams();
    const [orderId, setOrderId] = useState('');
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const id = searchParams.get('id');
        if (id) {
            setOrderId(id);
            searchOrder(id);
        }
    }, [searchParams]);

    const searchOrder = (id: string) => {
        setLoading(true);
        setError('');

        // Simulate API call - in real app, this would be a backend call
        setTimeout(() => {
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            const foundOrder = orders.find((o: any) => o.orderId === id);

            if (foundOrder) {
                setOrder(foundOrder);
            } else {
                setError('Order not found. Please check your Order ID.');
            }
            setLoading(false);
        }, 500);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (orderId.trim()) {
            searchOrder(orderId);
        }
    };

    // Order status timeline
    const getOrderStatus = (order: any) => {
        const createdDate = new Date(order.createdAt);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));

        const statuses = [
            { 
                step: 1, 
                title: 'Order Confirmed', 
                description: 'Payment received and verified',
                completed: true,
                date: createdDate.toLocaleDateString()
            },
            { 
                step: 2, 
                title: 'In Development', 
                description: 'Our team is working on your project',
                completed: daysDiff >= 1,
                date: daysDiff >= 1 ? new Date(createdDate.getTime() + 1 * 24 * 60 * 60 * 1000).toLocaleDateString() : 'In progress'
            },
            { 
                step: 3, 
                title: 'Quality Review', 
                description: 'Testing and quality assurance',
                completed: daysDiff >= 7,
                date: daysDiff >= 7 ? new Date(createdDate.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString() : 'Pending'
            },
            { 
                step: 4, 
                title: 'Delivery Ready', 
                description: 'Project ready for deployment',
                completed: daysDiff >= 14,
                date: daysDiff >= 14 ? new Date(createdDate.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString() : 'Pending'
            },
        ];

        return statuses;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-20">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
                        Track Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Order</span>
                    </h1>
                    <p className="text-xl text-gray-600">Monitor your project progress in real-time</p>
                </motion.div>

                {/* Search Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="max-w-2xl mx-auto mb-12"
                >
                    <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-6 md:p-8">
                        <div className="flex gap-3">
                            <div className="flex-1 relative">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                    placeholder="Enter your Order ID (e.g., ORD-XXXXX-XXXXXX)"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-black hover:bg-blue-700 transition-all hover:scale-105 disabled:opacity-70"
                            >
                                {loading ? 'Searching...' : 'Track'}
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto mb-12 bg-red-50 border-2 border-red-200 rounded-2xl p-6 flex gap-4"
                    >
                        <FiAlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="font-black text-red-900 mb-1">Order Not Found</h3>
                            <p className="text-red-700">{error}</p>
                        </div>
                    </motion.div>
                )}

                {/* Order Details */}
                {order && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        {/* Order Header */}
                        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8 mb-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <p className="text-sm text-gray-600 font-bold mb-2">Order ID</p>
                                    <p className="text-2xl font-black text-blue-600 break-all">{order.orderId}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-bold mb-2">Status</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                        <p className="text-lg font-black text-green-600">{order.status}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-bold mb-2">Order Date</p>
                                    <p className="text-lg font-bold text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 font-bold mb-2">Service</p>
                                    <p className="text-lg font-bold text-gray-900 capitalize">{order.serviceType}</p>
                                </div>
                            </div>
                        </div>

                        {/* Order Timeline */}
                        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8 mb-8">
                            <h2 className="text-2xl font-black text-gray-900 mb-8">Project Progress</h2>
                            <div className="space-y-6">
                                {getOrderStatus(order).map((status, index) => (
                                    <div key={status.step} className="flex gap-6">
                                        {/* Timeline dot and line */}
                                        <div className="flex flex-col items-center">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: index * 0.1 }}
                                                className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-white ${
                                                    status.completed
                                                        ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                                                        : 'bg-gradient-to-r from-gray-300 to-gray-400'
                                                }`}
                                            >
                                                {status.completed ? (
                                                    <FiCheckCircle className="w-6 h-6" />
                                                ) : (
                                                    <FiClock className="w-6 h-6" />
                                                )}
                                            </motion.div>
                                            {index < getOrderStatus(order).length - 1 && (
                                                <div className={`w-1 h-12 mt-2 ${status.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                            )}
                                        </div>

                                        {/* Status content */}
                                        <div className="flex-1 pt-2">
                                            <h3 className={`text-lg font-black mb-1 ${status.completed ? 'text-gray-900' : 'text-gray-600'}`}>
                                                {status.title}
                                            </h3>
                                            <p className={`text-sm mb-2 ${status.completed ? 'text-gray-600' : 'text-gray-500'}`}>
                                                {status.description}
                                            </p>
                                            <p className={`text-xs font-bold ${status.completed ? 'text-green-600' : 'text-gray-400'}`}>
                                                {status.date}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            {/* Contact Info */}
                            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8">
                                <h3 className="text-lg font-black text-gray-900 mb-6">Contact Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-600 font-bold mb-1">Name</p>
                                        <p className="text-gray-900 font-medium">{order.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 font-bold mb-1">Email</p>
                                        <p className="text-gray-900 font-medium break-all">{order.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 font-bold mb-1">Phone</p>
                                        <p className="text-gray-900 font-medium">{order.phone || 'Not provided'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Project Details */}
                            <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-8">
                                <h3 className="text-lg font-black text-gray-900 mb-6">Project Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-600 font-bold mb-1">Budget</p>
                                        <p className="text-gray-900 font-medium">{order.budget}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 font-bold mb-1">Deadline</p>
                                        <p className="text-gray-900 font-medium">{order.deadline || 'Flexible'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 font-bold mb-1">Payment Received</p>
                                        <p className="text-green-600 font-black">PKR {order.paymentAmount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Support Section */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200 p-8 text-center">
                            <h3 className="text-xl font-black text-gray-900 mb-3">Need Help?</h3>
                            <p className="text-gray-600 mb-6">Have questions about your order? Contact our support team.</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a href="mailto:support@atherweb.agency" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
                                    Email Support
                                </a>
                                <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all">
                                    WhatsApp
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Empty State */}
                {!order && !error && !loading && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl mx-auto text-center"
                    >
                        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 p-12">
                            <FiTruck className="w-16 h-16 text-gray-400 mx-auto mb-6" />
                            <h3 className="text-2xl font-black text-gray-900 mb-3">Enter Your Order ID</h3>
                            <p className="text-gray-600 mb-6">Use the search box above to track your order status and project progress.</p>
                            <Link href="/" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all">
                                Back to Home
                            </Link>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default function TrackOrder() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <TrackOrderContent />
        </Suspense>
    );
}
