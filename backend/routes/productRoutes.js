import express from "express";

import {getProducts, getProductById, deleteProduct, updateProduct, createProduct, createProductReview, getTopProducts} from "../controllers/productControllers.js"
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();



router.route("/").get(getProducts).post(protect, admin, createProduct)

// router.route("/top").get(getTopProducts)
//OR

router.get("/top", getTopProducts)
router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

router.route("/:id/reviews").post(protect, createProductReview)





 export default router;


