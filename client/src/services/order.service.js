import {
  placeOrderAPI,
  getMyOrdersAPI,
  getAllOrdersAPI,
  updateOrderStatusAPI,
  createPaymentAPI,
  verifyPaymentAPI,
} from "../api/order.api";

// Customer places order
export const placeOrder = async (data) => {
  return (await placeOrderAPI(data)).data;
};
export const createPayment = async (data) => {
  return (await createPaymentAPI(data)).data;
};
export const verifyPayment = async (data) => {
  return (await verifyPaymentAPI(data)).data;
};

// Customer sees own orders
export const getMyOrders = async (userId) => {
  return (await getMyOrdersAPI(userId)).data;
};
export const updateOrderStatus = async (orderId,newStatus) => {
  return (await updateOrderStatusAPI(orderId,newStatus)).data;
};

// Admin sees all orders
export const getAllOrders = async () => {
  return (await getAllOrdersAPI()).data;
};
