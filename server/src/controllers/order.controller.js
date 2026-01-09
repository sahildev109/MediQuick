
import MedicineModel from "../models/Medicine.model.js";
import Order from "../models/Order.model.js";
import { io } from "../socket.js";
import razorpay from "../config/razorpay.js";
import crypto from "crypto";

//--------------------Razorpay apis-------------------------------------------------------

export const verifyRazorpayPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // ✅ Payment verified → update your order
    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: "Paid",
      paymentMethod: "ONLINE",
    });

    res.json({ message: "Payment verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Payment verification failed" });
  }
};


export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // rupees → paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Razorpay order creation failed" });
  }
};

//--------------------------------------------------------------------------------


export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🔒 Prevent duplicate stock reduction
    if (status === "Packed" && !order.isStockReduced) {
      for (const item of order.items) {
        await MedicineModel.findByIdAndUpdate(
          item.medicine,
          { $inc: { stock: -item.qty } },
          { new: true }
        );
      }

      order.isStockReduced = true;
    }
    if(status==="Delivered" && order.paymentMethod==='COD'){
      order.paymentStatus="Paid"
    }

    order.status = status;
    await order.save();

    // 🔥 Notify customer in real-time
    io.to(orderId).emit("orderStatusUpdated", {
      orderId,
      status,
    });

    res.status(200).json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


/**
 * 1️⃣ Place Order (Customer)
 */
export const placeOrder = async (req, res) => {
  try {
   
    const { userId, items, totalAmount, address, paymentMethod } = req.body;

    if (!userId || !items || items.length === 0 || !totalAmount || !address) {
      return res.status(400).json({ message: "Invalid order data", body: req.body });
    }
 console.log('jello')
    const order = await Order.create({
      user: userId,
      items,
      totalAmount,
      address,
      paymentMethod,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * 2️⃣ Get orders of logged-in customer
 */
export const getMyOrders = async (req, res) => {
  try {
    const { userId } = req.query;

    const orders = await Order.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * 3️⃣ Admin: Get all orders
 */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email address")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
