import express from "express";
import { sequelize } from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/error.middleware.js";
import { syncModels } from "./models/index.js";
import stationRoutes from "./routes/stationRoutes.js";
import chargeHistoryRoutes from "./routes/chargeHistoryRoutes.js";
import {initAdmin} from "./config/initAdmin.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/users", userRoutes);
app.use("/stations", stationRoutes);
app.use("/charging", chargeHistoryRoutes);

app.use(errorHandler);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Connected to PostgreSQL");

        await syncModels();
        console.log("✅ Models synced successfully");
        console.log("✅ Models synced with DB");
        await initAdmin();

        app.listen(port, () => {
            console.log(`🚀 Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("❌ DB connection error:", err.message);
    }
})();
