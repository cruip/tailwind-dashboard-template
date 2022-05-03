import express from "express";
import db from "./config/database.js";
import tipeperawatanRoutes from "./routes/index.js";
import cors from "cors";

const app = express();

try {
    await db.authenticate();
    console.log('Database connected..');
} catch (error) {
    console.error('Connection error:', error);
}

app.use(cors());
app.use(express.json());
app.use('/tipeperawatan', tipeperawatanRoutes);

app.listen(5000, () => console.log("Server running at http://localhost:5000"));