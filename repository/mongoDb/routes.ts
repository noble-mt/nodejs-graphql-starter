import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
    busId: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    routes: [{
        locationId: {
            type: Number,
            required: true,
        },
        time: {
            type: Number,
            required: true,
        }
    }]
}, { collection : 'routes' });
export const Route = mongoose.model("Route", routeSchema);
