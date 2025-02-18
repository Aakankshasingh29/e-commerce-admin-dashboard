import express, { Router } from "express";
import {createProduct, getAllProducts, getFeaturedProducts, getProductByCategory, toggleFeaturedProduct, getRecommendProducts, deleteProduct} from '../controllers/product.controller.js';
import { adminRoute, protectRoute } from "../middleware/middleware.js";

const router = express.Router();

router.get("/", adminRoute, getAllProducts);
router.get("/featured",getFeaturedProducts);
router.post("/",protectRoute, adminRoute, createProduct);
router.delete("/:id",protectRoute, adminRoute, deleteProduct);
router.get("/category/:category",getProductByCategory);
router.get("recommendations", getRecommendProducts)
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);

export default router;