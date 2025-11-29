'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiEdit2, FiX, FiCheckCircle, FiClock, FiTruck, FiAlertCircle, FiPackage, FiRefreshCw, FiBell } from 'react-icons/fi';
import Link from 'next/link';
import emailjs from '@emailjs/browser';

// Order status stages
const ORDER_STAGES = [
    { id: 'confirmed', name: 'Order Confirmed', icon: FiCheckCircle, color: 'green' },
    { id: 'in-progress', name: 'In Progress', icon: FiClock, color: 'blue' },
    { id: 'review', name: 'Under Review', icon: FiAlertCircle, color: 'orange' },
    { id: 'completed', name: 'Completed', icon: FiTruck, color: 'purple' }
];

export default function AdminDashboard() {
    const [searchId, setSearchId] = useState('');
    const [orders, setOrders] = useState<any[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [lastUpdate, setLastUpdate] = useState(new Date());
    const [showAnnounce, setShowAnnounce] = useState(false);
    const [announcement, setAnnouncement] = useState({ title: '', message: '' });

    // Initialize EmailJS and load orders
    useEffect(() => {
        emailjs.init('NP2Sat5tqcJqQqoQ2');
        loadAllOrders();
    }, []);

    // Auto-refresh every 10 seconds for real-time updates
    useEffect(() => {
        const interval = setInterval(() => {
            loadAllOrders(true); // Silent refresh
        }, 10000); // 10 seconds

        return () => clearInterval(interval);
    }, []);

    const loadAllOrders = useCallback(async (silent = false) => {
        if (!silent) setLoading(true);
        setRefreshing(true);

        try {
            const response = await fetch('/api/orders?limit=100');
            const data = await response.json();

            if (data.success && data.data) {
                setOrders(data.data);
                setLastUpdate(new Date());

                if (!silent) {
                    console.log('✅ Loaded', data.data.length, 'orders');
                }
            }
        } catch (error) {
            console.error('⚠️ Failed to load orders:', error);
            if (!silent) {
                setNotification({
                    show: true,
                    message: 'Failed to load orders. Please refresh.',
                    type: 'error'
                });
            }
        }

        setLoading(false);
        setRefreshing(false);
    }, []);

    const searchOrder = async () => {
        if (!searchId.trim()) {
            setNotification({ show: true, message: 'Please enter an Order ID', type: 'error' });
            setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
            return;
        }

        setLoading(true);

        try {
            // Use API for direct search (fastest)
            const response = await fetch(`/api/orders/${searchId}`);
            const data = await response.json();

            if (data.success && data.data) {
                setSelectedOrder(data.data);
                setIsEditing(false);
                setNotification({ show: true, message: 'Order found!', type: 'success' });
            } else {
                setSelectedOrder(null);
                setNotification({ show: true, message: 'Order not found', type: 'error' });
            }
        } catch (error) {
            console.error('Search error:', error);
            setSelectedOrder(null);
            setNotification({ show: true, message: 'Order not found', type: 'error' });
        }

        setLoading(false);
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };

    const updateOrderStatus = async (newStatus: string, customNote?: string) => {
        if (!selectedOrder) return;

        setLoading(true);

        try {
            const response = await fetch(`/api/orders/${selectedOrder.orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: newStatus,
                    adminNote: customNote
                }),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Failed to update order');
            }

            // Update local state immediately for real-time feel
            const updatedOrder = data.data;
            if (newStatus === 'completed') {
                setOrders(prev => prev.filter(o => o.orderId !== selectedOrder.orderId));
                setSelectedOrder(null);
                setNotification({ show: true, message: 'Order completed!', type: 'success' });
            } else {
                setOrders(prev => prev.map(o =>
                    o.orderId === updatedOrder.orderId ? updatedOrder : o
                ));
                setSelectedOrder(updatedOrder);
                setNotification({ show: true, message: 'Order updated successfully!', type: 'success' });
            }

            // Send notification email (non-blocking)
            emailjs.send(
                'service_bopwq39',
                'template_wkgimvt',
                {
                    order_id: selectedOrder.orderId,
                    from_name: selectedOrder.name,
                    from_email: selectedOrder.email,
                    phone: selectedOrder.phone || 'Not provided',
                    company: selectedOrder.company || 'Not provided',
                    service: selectedOrder.serviceType,
                    budget: selectedOrder.budget,
                    description: customNote || `Status updated to: ${newStatus}`,
                    deadline: selectedOrder.deadline || 'Not specified',
                    order_date: new Date(selectedOrder.createdAt).toLocaleString(),
                    update_date: new Date().toLocaleString(),
                    order_status: newStatus,
                    tracking_link: `https://athertechy.com/track-order?id=${selectedOrder.orderId}`,
                    notification_type: 'STATUS_UPDATE'
                },
                'NP2Sat5tqcJqQqoQ2'
            ).catch(err => console.warn('Email failed:', err));

            setIsEditing(false);

        } catch (error: any) {
            console.error('Failed to update order:', error);
            setNotification({ show: true, message: error.message || 'Failed to update order', type: 'error' });
        }

        setLoading(false);
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
    };

    const getStatusInfo = (status: string) => {
        return ORDER_STAGES.find(stage => stage.id === status) || ORDER_STAGES[0];
    };

    const getOrderStats = () => {
        const stats = {
            total: orders.length,
            confirmed: orders.filter(o => o.status === 'confirmed').length,
            inProgress: orders.filter(o => o.status === 'in-progress').length,
            review: orders.filter(o => o.status === 'review').length,
            completed: orders.filter(o => o.status === 'completed').length
        };
        return stats;
    };

    const stats = getOrderStats();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                <FiPackage className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-gray-900">Admin Dashboard</h1>
                                <p className="text-xs text-gray-500">
                                    Last updated: {lastUpdate.toLocaleTimeString()}
                                    {refreshing && <span className="ml-2 text-blue-600">● Refreshing...</span>}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowAnnounce(true)}
                                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium transition-all hover:shadow-lg flex items-center gap-2"
                            >
                                <FiBell className="w-4 h-4" />
                                Announce
                            </button>
                            <button
                                onClick={() => loadAllOrders(false)}
                                disabled={refreshing}
                                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                                <FiRefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                                Refresh
                            </button>
                            <Link
                                href="/"
                                className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                            >
                                Back to Site
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Notification */}
                {notification.show && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mb-6 p-4 rounded-xl border ${notification.type === 'success'
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            {notification.type === 'success' ? (
                                <FiCheckCircle className="w-5 h-5" />
                            ) : (
                                <FiAlertCircle className="w-5 h-5" />
                            )}
                            <span className="font-medium">{notification.message}</span>
                        </div>
                    </motion.div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl p-6 border border-gray-200"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm">Total Orders</p>
                                <p className="text-3xl font-black text-gray-900">{stats.total}</p>
                            </div>
                            <FiPackage className="w-8 h-8 text-gray-400" />
                        </div>
                    </motion.div>

                    {ORDER_STAGES.map((stage, index) => (
                        <motion.div
                            key={stage.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl p-6 border border-gray-200"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">{stage.name}</p>
                                    <p className="text-3xl font-black text-gray-900">
                                        {stats[stage.id as keyof typeof stats] || 0}
                                    </p>
                                </div>
                                <stage.icon className={`w-8 h-8 text-${stage.color}-500`} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Search Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8"
                >
                    <h2 className="text-2xl font-black text-gray-900 mb-6">Search Order</h2>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && searchOrder()}
                                placeholder="Enter Order ID (e.g., ORD-ABCD1234-XYZ789)"
                                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all font-medium"
                            />
                        </div>
                        <button
                            onClick={searchOrder}
                            disabled={loading}
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-black hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105 disabled:opacity-70 flex items-center gap-2"
                        >
                            <FiSearch className="w-5 h-5" />
                            Search
                        </button>
                    </div>
                </motion.div>

                {/* Order Details */}
                {selectedOrder && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-black text-gray-900">Order Details</h2>
                            <div className="flex items-center gap-3">
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
                                    >
                                        <FiEdit2 className="w-4 h-4" />
                                        Update Status
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-6 py-3 bg-gray-600 text-white rounded-xl font-bold hover:bg-gray-700 transition-all flex items-center gap-2"
                                    >
                                        <FiX className="w-4 h-4" />
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Order Info */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-black text-gray-900 mb-4">Order Information</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Order ID:</span>
                                            <span className="font-bold text-gray-900">{selectedOrder.orderId}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Status:</span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-bold text-white bg-${getStatusInfo(selectedOrder.status).color}-600`}>
                                                {getStatusInfo(selectedOrder.status).name}
                                            </span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Service:</span>
                                            <span className="font-bold text-gray-900 capitalize">{selectedOrder.serviceType?.replace('-', ' ')}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Budget:</span>
                                            <span className="font-bold text-gray-900">{selectedOrder.budget}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Created:</span>
                                            <span className="font-bold text-gray-900">{new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Info */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-black text-gray-900 mb-4">Customer Information</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Name:</span>
                                            <span className="font-bold text-gray-900">{selectedOrder.name}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Email:</span>
                                            <span className="font-bold text-gray-900">{selectedOrder.email}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Phone:</span>
                                            <span className="font-bold text-gray-900">{selectedOrder.phone || 'Not provided'}</span>
                                        </div>
                                        <div className="flex justify-between py-3 border-b border-gray-100">
                                            <span className="text-gray-600">Company:</span>
                                            <span className="font-bold text-gray-900">{selectedOrder.company || 'Not provided'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Project Description */}
                        {selectedOrder.description && (
                            <div className="mt-8">
                                <h3 className="text-lg font-black text-gray-900 mb-4">Project Description</h3>
                                <p className="text-gray-700 bg-gray-50 rounded-xl p-4">{selectedOrder.description}</p>
                            </div>
                        )}

                        {/* Status Update Section */}
                        {isEditing && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200"
                            >
                                <h3 className="text-lg font-black text-gray-900 mb-6">Update Order Status</h3>
                                <div className="grid md:grid-cols-2 gap-4 mb-6">
                                    {ORDER_STAGES.map((stage) => (
                                        <button
                                            key={stage.id}
                                            onClick={() => updateOrderStatus(stage.id)}
                                            disabled={loading}
                                            className={`p-4 rounded-xl border-2 transition-all hover:scale-105 disabled:opacity-50 ${selectedOrder.status === stage.id
                                                ? 'border-blue-600 bg-blue-600 text-white'
                                                : 'border-gray-200 bg-white hover:border-blue-300'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <stage.icon className="w-6 h-6" />
                                                <div className="text-left">
                                                    <p className="font-bold">{stage.name}</p>
                                                    <p className="text-sm opacity-80">Click to update</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <div className="text-sm text-gray-600">
                                    <p>💡 Customer will receive an email notification when you update the status</p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {/* Recent Orders */}
                {!selectedOrder && orders.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
                    >
                        <h2 className="text-2xl font-black text-gray-900 mb-6">Recent Orders</h2>
                        <div className="space-y-4">
                            {orders.slice(0, 10).map((order) => (
                                <div
                                    key={order.orderId}
                                    onClick={() => setSelectedOrder(order)}
                                    className="p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 cursor-pointer transition-all hover:shadow-md"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-gray-900">{order.orderId}</p>
                                            <p className="text-sm text-gray-600">{order.name} - {order.serviceType?.replace('-', ' ')}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-sm font-bold text-white bg-${getStatusInfo(order.status).color}-600`}>
                                                {getStatusInfo(order.status).name}
                                            </span>
                                            <FiSearch className="w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
