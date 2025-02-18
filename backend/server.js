import express from "express";
import dotenv from "dotenv"
import authRoutes from "./Routes/auth.routes.js";
import bodyParser from 'body-parser';
import productsRoutes from "./Routes/products.route.js";
import cartRoutes from "./Routes/cart.routes.js";
// import couponRoutes from "./Routes/coupon.routes.js";
import analyticsRoutes from "./Routes/analtyics.routes.js";

import connectDB from './lib/db.js';
import cors from "cors";
dotenv.config();

const app = express();
app.use(bodyParser.json())
// const PORT = 5000;
const PORT =(process.env.PORT) || 5000;
// app.use(cors()); 
app.use(cors({
    origin: "http://localhost:",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/products",productsRoutes);
app.use("/api/cart",cartRoutes);
// app.use("/api.coupons",couponRoutes);
app.use("/api/analytics",analyticsRoutes);


app.listen(PORT, ()=>{
    console.log("server is running on http://localhost:" + PORT );

    connectDB();
});

