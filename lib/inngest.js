import { Inngest } from "inngest";
import connectDB from "../config/db";
import User from "@/models/User";
import Order from "@/models/Order";

// Initialize Inngest client
export const inngest = new Inngest({
    id: "quickcart-next",
    middleware: [{
        init: () => ({
            onFunctionRun: async () => {
                // Global middleware: connects to MongoDB automatically for every function call
                await connectDB();
                return {};
            }
        })
    }]
});

/**
 * Syncs user data from Clerk Webhooks to MongoDB
 * Handles creation, updates, and deletions of user profiles
 */
export const syncUser = inngest.createFunction(
    { id: 'clerk-user-sync' },
    [
        { event: 'clerk/user.created' },
        { event: 'clerk/user.updated' },
        { event: 'clerk/user.deleted' },
    ],
    async ({event}) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;

        // Logic for user deletion
        if(event.name === 'clerk/user.deleted') return await User.findByIdAndDelete(id);

        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}`.trim(),
            imageUrl: image_url
        };

        // Use Upsert (update or insert)
        return await User.findByIdAndUpdate(id, userData, { upsert: true });
    } 
);

/**
 * Processes order creation events in batches
 */
export const createUserOrder = inngest.createFunction(
    { 
        id: 'create-user-order',
        batchEvents: {
            maxSize: 5,
            timeout: '5s'
        }
    },
    { event: 'order/created' },
    async ({events}) => {
        // Map the batch of events into an array of order objects
        const orders = events.map((event) => {
            return {
                userId: event.data.userId,
                items: event.data.items,
                amount: event.data.amount,
                address: event.data.address,
                date: event.data.date
            }
        });

        // Perform bulk insertion for better scalability
        await Order.insertMany(orders);

        return { success: true, proccessed: orders.length };
    }
);