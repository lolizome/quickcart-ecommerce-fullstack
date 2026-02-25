import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Get user cart items from MongoDB
export async function GET(request) {
    try {
        const { userId } = getAuth(request);

        await connectDB();
        // Fetch plain JS object for better performance since no save() is needed
        const user = await User.findById(userId).lean();
        if(!user) return NextResponse.json({ success: false, message: "User not found" });

        const { cartItems } = user;

        return NextResponse.json({ success: true, cartItems });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}