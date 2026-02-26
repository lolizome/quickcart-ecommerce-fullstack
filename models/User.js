import mongoose from "mongoose";

// User Schema definition for MongoDB
const userSchema = new mongoose.Schema({
    _id:{ type: String, required: true },
    name:{ type: String, required: true },
    email:{ type: String, required: true, unique: true },
    imageUrl:{ type: String, required: true },
    cartItems:{ type: Object, default: {} }
}, {
    // Prevents Mongoose from removing empty objects
    minimize: false
});

const User = mongoose.models.user || mongoose.model('user', userSchema);

export default User;