import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
if(!MONGODB_URI) {
    throw new Error("Please, define the MONGODB_URI environment variable inside your .env file");
}

let cached = global.mongoose;

if(!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Establishes a connection to MongoDB or returns the existing one.
 * 
 * @async
 * @returns {Promise<typeof mongoose>} The Mongoose connection instance.
 */
async function connectDB() {
    // If a connection is already established, return it inmediately
    if(cached.conn) return cached.conn;

    // If no connection promise exists, create a new one
    if(!cached.promise) {
        const opts = {
            bufferCommands: false
        };

        const dbPath = `${MONGODB_URI}/quickcart`;

        cached.promise = mongoose.connect(dbPath, opts).then( mongoose => {
            return mongoose;
        }).catch((e) => {
            cached.promise = null;
            throw e;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch(e) {
        throw e;
    }

    return cached.conn;
}

export default connectDB;