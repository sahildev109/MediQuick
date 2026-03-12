import { useEffect, useState } from "react";
import { getMyOrders } from "../services/order.service";
import { getUser } from "../utils/auth";
import socket from "../config/socket";
import LiveMap from "../components/LiveMap";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [liveLocations, setLiveLocations] = useState({});
  const user = getUser();

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getMyOrders(user.id);
      console.log("📦 Orders fetched:", data);
      setOrders(data);
    };

    fetchOrders();
  }, []);

  // Join order room
  useEffect(() => {
    if (!orders.length) return;

    orders.forEach((order) => {
      if (order.status === "Out for Delivery") {
        console.log("🚪 Joining room:", order._id);
        socket.emit("joinOrder", order._id);
      }
    });
  }, [orders]);

  // Listen for location updates
  useEffect(() => {
    socket.on("receiveLocation", ({ orderId, lat, lng }) => {
      console.log("📡 Location received:", orderId, lat, lng);

      setLiveLocations((prev) => ({
        ...prev,
        [orderId]: { lat, lng },
      }));
    });

    return () => {
      socket.off("receiveLocation");
    };
  }, []);

  const statusStyles = {
    Pending: "bg-[#CAF0F8] text-[#0077B6]",
    Accepted: "bg-[#90E0EF] text-[#0077B6]",
    Packed: "bg-[#CAF0F8] text-[#03045E]",
    "Out for Delivery": "bg-[#90E0EF] text-[#03045E]",
    Delivered: "bg-[#00B4D8] text-[#03045E]",
  };

  return (
    <div className="min-h-screen bg-[#03045E] p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#CAF0F8] tracking-tight">My Orders</h1>

      <div className="bg-[#CAF0F8] border border-[#90E0EF] p-6 md:p-8 rounded-2xl shadow-2xl">
        <div className="rounded-2xl border border-[#90E0EF] bg-white/80 p-5 md:p-6 mb-6">
          <p className="text-sm font-medium text-[#0077B6]">Order Summary</p>
          <p className="text-2xl md:text-3xl font-bold text-[#03045E]">{orders.length} order{orders.length !== 1 ? 's' : ''}</p>
        </div>

      <div className="space-y-4">
        {orders.length === 0 && (
          <div className="bg-white/70 border border-[#90E0EF] rounded-2xl p-8 shadow-lg">
            <p className="text-[#0077B6] text-lg font-medium">Make your first order</p>
            <p className="text-[#03045E]/80 mt-1">Your placed orders will appear here with live updates.</p>
          </div>
        )}

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white/70 border border-[#90E0EF] p-5 rounded-2xl shadow-lg flex flex-col md:flex-row md:justify-between gap-4"
          >
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-[#0077B6] font-semibold">Order</p>
              <p className="font-semibold text-[#03045E] text-lg">
                Order #{order._id.slice(-6)}
              </p>

              {order.items.map((i) => (
                <p key={i._id} className="text-sm text-[#0077B6] font-medium">
                  {i.qty}x {i.name}
                </p>
              ))}

              <span
                className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                  order.paymentStatus === "Paid"
                    ? "bg-[#90E0EF] text-[#03045E]"
                    : "bg-[#CAF0F8] text-[#0077B6]"
                }`}
              >
                {order.paymentStatus} | {order.paymentMethod}
              </span>

              {order.status === "Out for Delivery" && (
                <div className="w-2xl">
                  <p className="text-xs text-[#0077B6] mt-2">
                    🚚 Delivery in progress
                  </p>

                  <LiveMap location={liveLocations[order._id]} />
                </div>
              )}
            </div>

            <div className="md:text-right flex md:block justify-between items-start md:items-end gap-3">
              <p className="text-xs uppercase tracking-wide text-[#0077B6] font-semibold md:mb-1">Amount</p>
              <p className="font-bold text-xl text-[#03045E]">₹{order.totalAmount}</p>

              <span
                className={`inline-flex text-sm px-3 py-1 rounded-full font-medium ${
                  statusStyles[order.status] ||
                  "bg-[#CAF0F8] text-[#0077B6]"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
      </div>
      </div>
    </div>
  );
}