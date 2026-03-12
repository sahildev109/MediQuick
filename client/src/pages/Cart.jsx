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
      window.dispatchEvent(new Event("cart-updated"));
      navigate("/orders");
    },

    theme: {
      color: "#0077B6",
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
  window.dispatchEvent(new Event("cart-updated"));
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
    window.dispatchEvent(new Event("cart-updated"));
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
    <div className="min-h-screen bg-[#03045E] p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#CAF0F8] tracking-tight">Your Cart</h1>

      <div className="bg-[#CAF0F8] border border-[#90E0EF] p-6 md:p-8 rounded-2xl shadow-2xl">
        <div className="rounded-2xl border border-[#90E0EF] bg-white/80 p-5 md:p-6 mb-6">
          <p className="text-sm font-medium text-[#0077B6]">Cart Summary</p>
          <p className="text-2xl md:text-3xl font-bold text-[#03045E]">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
        </div>

      {cartItems.length === 0 ? (
        <div className="bg-white/70 border border-[#90E0EF] rounded-2xl p-8 shadow-lg">
          <p className="text-[#0077B6] text-lg font-medium">Your cart is empty</p>
          <p className="text-[#03045E]/80 mt-1">Add medicines from dashboard to continue checkout.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-white/70 border border-[#90E0EF] p-5 rounded-2xl shadow-lg"
              >
                <div>
                  <p className="text-xs uppercase tracking-wide text-[#0077B6] font-semibold">Medicine</p>
                  <h2 className="font-semibold text-lg text-[#03045E]">{item.name}</h2>
                  <p className="text-[#0077B6] font-medium mt-1">
                    ₹{item.price} × {item.qty}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-[#f22b2b] hover:text-[#5e0303] p-2 rounded-lg hover:bg-[#f22b2b]/30 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-white/70 border border-[#90E0EF] p-5 rounded-2xl shadow-lg flex justify-between items-center">
            <p className="text-lg font-semibold text-[#03045E]">Payment Method</p>
            <select
            className="bg-white border border-[#90E0EF] text-[#03045E] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
            value={paymentMethod}
            onChange={(e)=>setPaymentMethod(e.target.value)}>
              <option value="COD">COD</option>
              <option value="ONLINE">ONLINE</option>
            </select>
            
          </div>
          <div className="mt-6 bg-white/70 border border-[#90E0EF] p-5 rounded-2xl shadow-lg flex justify-between items-center">
            <p className="text-xl font-bold text-[#03045E]">Total: ₹{total}</p>
            <button className="bg-[#0077B6] text-white px-6 py-2 rounded-lg hover:bg-[#00B4D8] transition-colors font-semibold"
            onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
      </div>
      </div>
    </div>
  );
}
