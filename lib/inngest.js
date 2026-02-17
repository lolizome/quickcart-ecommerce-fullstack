import { Inngest } from "inngest";
import connectDB from "../config/db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({
    id: "quickcart-next",
    middleware: [{
        init: () => ({
            onFunctionRun: async () => {
                await connectDB();
                return {};
            }
        })
    }]
});

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

// // Inngest Function to save user data to a database
// export const syncUserCreate = inngest.createFunction(
//     { id: 'sync-user-from-clerk' },
//     { event: 'clerk/user.created' },
//     async ({event}) => {
//         const { id, first_name, last_name, email_addresses, image_url } = event.data;
//         const userData = {
//             _id: id,
//             email: email_addresses[0].email_address,
//             name: first_name + ' ' + last_name,
//             imageUrl: image_url
//         };
//         await connectDB();
//         await User.create(userData);
//     }
// );

// // Inngest Function to update user data in database
// export const syncUserUpdate = inngest.createFunction(
//     { id: 'update-user-from-clerk' },
//     { event: 'clerk/user.updated' },
//     async ({event}) => {
//         const { id, first_name, last_name, email_addresses, image_url } = event.data;
//         const userData = {
//             _id: id,
//             email: email_addresses[0].email_address,
//             name: first_name + ' ' + last_name,
//             imageUrl: image_url
//         };
//         await connectDB();
//         await User.findByIdAndUpdate(id, userData);
//     }
// );

// // Inngest Function to remove user from database
// export const syncUserDelete = inngest.createFunction(
//     { id: 'delete-user-from-clerk' },
//     { event: 'clerk/user.deleted' },
//     async ({event}) => {
//         const { id } = event.data;

//         await connectDB();
//         await User.findByIdAndDelete(id);
//     }
// );