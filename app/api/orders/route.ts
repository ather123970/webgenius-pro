import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/mongodb';
import Order from '@/app/models/Order';

console.log('🚀 Orders API route loaded!', new Date().toISOString());

// POST - Create new order
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
        console.log('✅ Order created:', (order as any).orderId);
        return NextResponse.json({ success: true, data: order }, { status: 201 });
    } catch (error: any) {
        console.error('❌ Database Error (POST):', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to create order' },
            { status: 500 }
        );
    }
}

// GET - Fetch orders with optional pagination
export async function GET(request: Request) {
    try {
        console.log('📊 GET /api/orders called');

        // Parse query parameters
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '100');
        const status = searchParams.get('status');
        const orderId = searchParams.get('orderId');

        console.log(`📋 Query params: page=${page}, limit=${limit}, status=${status}, orderId=${orderId}`);
        console.log('🔗 Connecting to database...');

        await dbConnect();
        console.log('✅ Database connected!');

        // Build query
        const query: any = {};
        if (status) query.status = status;
        if (orderId) query.orderId = { $regex: orderId, $options: 'i' };

        console.log('🔍 Executing query:', JSON.stringify(query));

        // Execute query with pagination
        const skip = (page - 1) * limit;
        const orders = await Order.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select('-paymentProof') // Exclude large base64 images
            .lean(); // Convert to plain JavaScript objects for better performance

        const total = await Order.countDocuments(query);

        console.log(`✅ Query successful! Found ${orders.length} orders (total: ${total})`);

        if (orders.length > 0) {
            console.log('📦 First order ID:', (orders[0] as any).orderId);
        } else {
            console.log('⚠️ No orders found in database');
        }

        return NextResponse.json({
            success: true,
            data: orders,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error: any) {
        console.error('❌ Database Error (GET):', error.message);
        console.error('❌ Error stack:', error.stack);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch orders' },
            { status: 500 }
        );
    }
}
