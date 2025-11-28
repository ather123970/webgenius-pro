import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Order from '@/app/models/Order';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = params;

        // Search by either _id (MongoDB ID) or orderId (Custom ID like ORD-...)
        const query = id.startsWith('ORD-') ? { orderId: id } : { _id: id };

        const order = await Order.findOne(query);

        if (!order) {
            return NextResponse.json(
                { success: false, error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: order });
    } catch (error: any) {
        console.error('Database Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch order' },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = params;
        const body = await request.json();

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

        return NextResponse.json({ success: true, data: order });
    } catch (error: any) {
        console.error('Database Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update order' },
            { status: 500 }
        );
    }
}

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
        console.error('Database Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete order' },
            { status: 500 }
        );
    }
}
