import api from "../config/axios";

// Place order
export const placeOrderAPI = (data) =>
  api.post("/orders", data);

// Customer orders
export const getMyOrdersAPI = (userId) =>
  api.get(`/orders/my?userId=${userId}`);


export const updateOrderStatusAPI = (orderId,newStatus) =>
  api.put(`orders/${orderId}/status`,newStatus);

// Admin orders
export const getAllOrdersAPI = () =>
  api.get("/orders");
