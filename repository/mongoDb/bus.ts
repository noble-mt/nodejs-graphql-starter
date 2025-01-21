import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
    busId:  {
        type: String,
        required: true,
    },
    busName:  {
        type: String,
        required: true,
    },
    busNumber: {
        type: String,
        required: true,  
    }
},  { collection : 'bus' });

export const Bus = mongoose.model("Bus", busSchema);