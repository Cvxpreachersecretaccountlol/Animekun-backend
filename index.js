import express from "express";
import cors from "cors";

import allowedDomains from "./utils/allowedDomains.js";
import { date, updateData } from "./utils/updateHomepageData.js";
import { logNetworks } from "./utils/logNetworks.js";
import routes from './routes/index.js';



const app = express();

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedDomains.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Access forbidden: domain not allowed"));
            }
        },
        methods: "GET",
        allowedHeaders: "Content-Type, Authorization"
    })
);

//fetches every 8 hours
updateData();
setInterval(updateData, 8 * 60 * 60 * 1000);

// API Routes
app.get("/", (req, res) => {
    res.json({
        message: "API is running successfully!",
        lastSectionUpdate: date
    });
});

// use routes
app.use('/api', routes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    logNetworks(PORT);
});
