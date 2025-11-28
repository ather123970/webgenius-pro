'use client';

import { useState } from 'react';

export default function AddOrderManually() {
    const [orderId, setOrderId] = useState('ORD-MIJBOC0V-2Q2BWS');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const addOrder = async () => {
        setLoading(true);
        setResult('');

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: orderId,
                    name: 'Test User',
                    email: 'test@example.com',
                    phone: '03001234567',
                    company: 'Test Company',
                    serviceType: 'shopify',
                    budget: 'Branded Pro',
                    description: 'Test order added manually',
                    deadline: '',
                    paymentAmount: 21000,
                    paymentProof: 'manual-entry',
                    addons: [],
                    totalPrice: 70000,
                    status: 'confirmed'
                })
            });

            const data = await response.json();

            if (data.success) {
                setResult(`✅ Order ${orderId} added successfully to Database!`);
            } else {
                throw new Error(data.error || 'Database save failed');
            }
        } catch (error: any) {
            console.warn('Database save failed, saving to localStorage...', error);

            // Fallback: Save to localStorage
            try {
                const orders = JSON.parse(localStorage.getItem('orders') || '[]');
                const newOrder = {
                    orderId: orderId,
                    name: 'Test User',
                    email: 'test@example.com',
                    phone: '03001234567',
                    company: 'Test Company',
                    serviceType: 'shopify',
                    budget: 'Branded Pro',
                    description: 'Test order added manually',
                    deadline: '',
                    paymentAmount: 21000,
                    paymentProof: 'manual-entry',
                    addons: [],
                    totalPrice: 70000,
                    status: 'confirmed',
                    createdAt: new Date().toISOString()
                };

                // Check if already exists
                const existingIndex = orders.findIndex((o: any) => o.orderId === orderId);
                if (existingIndex >= 0) {
                    orders[existingIndex] = newOrder;
                } else {
                    orders.push(newOrder);
                }

                localStorage.setItem('orders', JSON.stringify(orders));
                setResult(`⚠️ Database failed, but Order ${orderId} saved to Local Storage! You can track it now.`);
            } catch (localErr) {
                setResult(`❌ Error: Could not save to DB or Local Storage.`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-black mb-6">Add Order Manually</h1>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-2">Order ID</label>
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>

                    <button
                        onClick={addOrder}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Adding...' : 'Add Order to Database'}
                    </button>

                    {result && (
                        <div className={`p-4 rounded ${result.startsWith('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                            {result}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
