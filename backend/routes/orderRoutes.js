import express from "express";


const router = express.Router();


import { protect,admin} from "../middleware/authMiddleware.js"
import {addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders, updateOrderToDelivered} from "../controllers/orderControllers.js"

router.route("/").post(protect, addOrderItems).get(protect,admin, getOrders)
router.route("/myorders").get(protect, getMyOrders)
router.route("/:id").get(protect, getOrderById)
router.route("/:id/pay").put(protect, updateOrderToPaid)
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered)




 export default router;


