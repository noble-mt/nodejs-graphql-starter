import dotenv from "dotenv";

dotenv.config();

export default {
    env: process.env.env,
    port: process.env.port,
    db: {
        mongo: {
            url: process.env.ROUTES_CONT_URL,
        }
    },
    auth: {
        google: {
            GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
            GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },
        microsoft: {
            clientID: process.env.MS_CLIENT_ID,
            clientSecret: process.env.MS_SECRET,
            callbackURL: process.env.MS_CALLBACK_URL,
        }
    }
    // Grab everything in you .env file here
}