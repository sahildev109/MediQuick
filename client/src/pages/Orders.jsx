import { useEffect, useState } from "react";
import { getMyOrders } from "../services/order.service";
import { getUser } from "../utils/auth";
import socket from "../config/socket";
import LiveMap from "../components/LiveMap";



// const orders = [
//   {
//     id: "ORD101",
//     date: "10 Jan 2025",
//     amount: "₹290",
//     status: "Delivered",
//   },
//   {
//     id: "ORD102",
//     date: "15 Jan 2025",
//     amount: "₹120",
//     status: "Pending",
//   },
// ];
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [liveLocations, setLiveLocations] = useState({});
  const user = getUser();

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getMyOrders(user.id);
      setOrders(data);
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (!orders.length) return;

    orders.forEach((order) => {
      if (order.status === "Out for Delivery") {
        socket.emit("joinOrder", order._id);
      }
    });

    socket.on("receiveLocation", ({ orderId, lat, lng }) => {
      setLiveLocations((prev) => ({
        ...prev,
        [orderId]: { lat, lng },
      }));
      console.log("Live location:", orderId, lat, lng);
    });

    return () => {
      socket.off("receiveLocation");
    };
  }, [orders]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-4 rounded-xl shadow flex justify-between"
          >
            <div>
              <p className="font-medium">
                Order #{order._id.slice(-6)}
              </p>

              {order.items.map((i) => (
                <p key={i._id} className="text-sm text-gray-500">
                  {i.qty}x {i.name}
                </p>
              ))}

              {order.status === "Out for Delivery" && (
  <div className="w-2xl ">
    <p className="text-xs text-blue-600 mt-2">
      🚚 Delivery in progress
    </p>

    <LiveMap location={liveLocations[order._id]} />
  </div>
)}
            </div>

            <div className="text-right">
              <p className="font-semibold">
                ₹{order.totalAmount}
              </p>
              <span className="text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
