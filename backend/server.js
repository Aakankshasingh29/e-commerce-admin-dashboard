import express from "express";
import dotenv from "dotenv"
import authRoutes from "./Routes/auth.routes.js";
import bodyParser from 'body-parser';

import connectDB from './lib/db.js';

dotenv.config();

const app = express();
app.use(bodyParser.json())
// const PORT = 5000;
const PORT =(process.env.PORT) || 5000;

app.use("/api/auth",authRoutes);

app.listen(PORT, ()=>{
    console.log("server is running on http://localhost:" + PORT );

    connectDB();
});

