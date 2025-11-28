import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Order from '@/app/models/Order';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        await dbConnect();

        // Validate required fields
        if (!body.name || !body.email || !body.serviceType || !body.budget) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const order = await Order.create(body);
        return NextResponse.json({ success: true, data: order }, { status: 201 });
    } catch (error: any) {
        console.error('Database Error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create order' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await dbConnect();
        const orders = await Order.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: orders });
    } catch (error: any) {
        console.error('Database Error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}
