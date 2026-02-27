import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { inngest } from "@/lib/inngest";
import User from "@/models/User";

/**
 * Precesses new orders:
 * Authenticates user, calculates the total price,
 * triggers background tasks via Inngest, and clears the user's cart
 */
export async function POST(request) {
    try {
        const { userId } = getAuth(request);
        if(!userId) return NextResponse.json({ success: false, message: 'Unauthorized: Please log in'});

        const { address, items } = await request.json();
        if(!address || items.length === 0) return NextResponse.json({ success: false, message: 'Invalid data'});

        await connectDB();
        let totalAmount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if(product) totalAmount += product.offerPrice * item.quantity;
        }

        await inngest.send({
            name: 'order/created',
            data: {
                userId,
                items,
                amount: totalAmount + Math.floor(totalAmount * 0.02), // 2% tax
                address,
                date: Date.now()
            }
        });

        await User.findByIdAndUpdate(userId, { cartItems: {} });

        return NextResponse.json({ success: true, message: 'Order Placed' });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message});
    }
}