import connectDB from "@/config/db";
import Address from "@/models/Address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * Create a new shipping address
 */
export async function POST(request) {
    try {
        const { userId } = getAuth(request);
        const { address } = await request.json();
        // Destructure only the required fields from the address object
        const { fullName, phoneNumber, pincode, area, city, state } = address;

        await connectDB();

        const newAddress = await Address.create({
            userId,
            fullName,
            phoneNumber,
            pincode: Number(pincode) || 0,
            area,
            city,
            state
        });

        return NextResponse.json({ success: true, message: 'Address added', newAddress});
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message});
    }
}