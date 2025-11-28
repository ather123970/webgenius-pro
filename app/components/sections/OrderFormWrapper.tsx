'use client';

import React, { Suspense } from 'react';
import OrderFormNew from './OrderFormNew';

export default function OrderFormWrapper() {
    return (
        <Suspense fallback={
            <div className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center">
                        <div className="animate-pulse">
                            <div className="h-12 bg-gray-200 rounded-full w-48 mx-auto mb-6"></div>
                            <div className="h-16 bg-gray-200 rounded w-96 mx-auto mb-4"></div>
                            <div className="h-6 bg-gray-200 rounded w-64 mx-auto"></div>
                        </div>
                    </div>
                </div>
            </div>
        }>
            <OrderFormNew />
        </Suspense>
    );
}
