import express from "express";
import {
  placeOrder,
  getMyOrders,
  getAllOrders,
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../controllers/Order.controller.js";
import { updateOrderStatus } from "../controllers/Order.controller.js";

const router = express.Router();

router.post("/create-payment", createRazorpayOrder);
router.post("/verify-payment", verifyRazorpayPayment);


router.put("/:orderId/status", updateOrderStatus);


// Customer
router.post("/", placeOrder);
router.get("/my", getMyOrders);

// Admin
router.get("/", getAllOrders);

export default router;
