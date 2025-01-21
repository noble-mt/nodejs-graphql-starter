import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id:  {
        type: String,
        required: true,
    },
    name:  {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,  
    },
    password: {
        type: String,
        required: true,  
    },
    provider: {
        type: String,
        required: false,  
    },
    providerId: {
        type: String,
        required: false
    }
},  { collection : 'users' });

export const User = mongoose.model("User", userSchema);