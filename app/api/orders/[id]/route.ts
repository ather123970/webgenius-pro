import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Order from '@/app/models/Order';

// GET - Fetch single order by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        console.log('🔍 GET /api/orders/[id] called with ID:', params.id);
        await dbConnect();
        const { id } = params;

        // Search by either _id (MongoDB ID) or orderId (Custom ID like ORD-...)
        const query = id.startsWith('ORD-') ? { orderId: id } : { _id: id };
        console.log('🔍 Query:', query);

        const order = await Order.findOne(query);
        console.log('📦 Order found:', order ? 'YES' : 'NO');

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: order });
    } catch (error: any) {
        console.error('❌ Database Error (GET [id]):', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch order' },
            { status: 500 }
        );
    }
}

// PUT - Update order
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        console.log('🔄 PUT /api/orders/[id] called with ID:', params.id);
        await dbConnect();
        const { id } = params;
        const body = await request.json();

        // Add lastUpdated timestamp
        body.lastUpdated = new Date();

        // Search by either _id or orderId
        const query = id.startsWith('ORD-') ? { orderId: id } : { _id: id };

        const order = await Order.findOneAndUpdate(
            query,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            );
        }

        console.log('✅ Order updated:', order.orderId);
        return NextResponse.json({ success: true, data: order });
    } catch (error: any) {
        console.error('❌ Database Error (PUT):', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update order' },
            { status: 500 }
        );
    }
}

// DELETE - Delete order
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = params;

        const query = id.startsWith('ORD-') ? { orderId: id } : { _id: id };
        const order = await Order.findOneAndDelete(query);

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: {} });
    } catch (error: any) {
        console.error('❌ Database Error (DELETE):', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete order' },
            { status: 500 }
        );
    }
}
