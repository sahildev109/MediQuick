import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import {getUser} from '../utils/auth'
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../services/order.service";
import { createPayment, verifyPayment } from "../services/order.service";

export default function Cart() {
  const navigate=useNavigate()
  // 1️⃣ Load cart into state
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [paymentMethod, setPaymentMethod]=useState('COD')



const handleRazorpayPayment = async (orderId) => {
  const paymentOrder = await createPayment(total);

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: paymentOrder.amount,
    currency: "INR",
    name: "MediQuick",
    description: "Medicine Order",
    order_id: paymentOrder.id,

    handler: async function (response) {
      await verifyPayment({
        ...response,
        orderId,
      });

      localStorage.removeItem("cart");
      navigate("/orders");
    },

    theme: {
      color: "#467f95",
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};




  // 2️⃣ Delete item
const handleDelete = (_id) => {
  const updatedCart = cartItems
    .map((item) => {
      if (item._id === _id) {
        // if qty is more than 1, reduce it
        if (item.qty > 1) {
          return { ...item, qty: item.qty - 1 };
        }
        // if qty is 1, return null (we'll remove it)
        return null;
      }
      return item;
    })
    .filter(Boolean); // remove null items

  setCartItems(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};


  // 3️⃣ Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );


  const handleCheckout = async () => {
  const user = getUser();
  const cart = cartItems;

  if (!user || cart.length === 0) return;

  const orderData = {
    userId: user.id,
    items: cart.map((item) => ({
      medicine: item._id,
      name: item.name,
      price: item.price,
      qty: item.qty,
    })),
    totalAmount: total,
    address: user.address || "Not provided",
    paymentMethod: paymentMethod,
  };
  // console.log(orderData)

  try {
    console.log('jello')
   const res= await placeOrder(orderData);
  const backendOrderId = res.order._id;

  // 2️⃣ COD → done
  if (paymentMethod === "COD") {
    localStorage.removeItem("cart");
    navigate("/orders");
    return;
  }

  // 3️⃣ ONLINE → Razorpay
  handleRazorpayPayment(backendOrderId);
  } catch (error) {
    console.log(error)
    alert("Order failed");
  }
};

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-white p-4 rounded-xl shadow"
              >
                <div>
                  <h2 className="font-medium">{item.name}</h2>
                  <p className="text-gray-500">
                    ₹{item.price} × {item.qty}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <p className="text-lg font-semibold">Payment Method</p>
            <select
            value={paymentMethod}
            onChange={(e)=>setPaymentMethod(e.target.value)}>
              <option value="COD">COD</option>
              <option value="ONLINE">ONLINE</option>
            </select>
            
          </div>
          <div className="mt-6 bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <p className="text-lg font-semibold">Total: ₹{total}</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
