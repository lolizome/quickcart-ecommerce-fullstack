import connectDB from "@/config/db";
import Address from "@/models/Address";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Retrieve all orders for the authenticated user
export async function GET(request) {
    try {
        const { userId } = getAuth(request);
        if(!userId) return NextResponse.json({ success: false, message: 'Unauthorized' });

        await connectDB();
        const orders = await Order.find({ userId: userId }).populate('address').populate('items.product').lean();

        return NextResponse.json({ success: true, orders });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}