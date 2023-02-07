import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dateRegistered: {
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        default: "user",
        required: true
    }
})

const User = mongoose.model("user", userSchema);

export default User;