import AdminSidebar from "../components/AdminSidebar";
import { useEffect, useState } from "react";
import { getAllOrders } from "../../services/order.service";
import socket from "../../config/socket";
import { updateOrderStatus } from "../../services/order.service";
// const orders = [
//   { id: "ORD101", customer: "Sahil", status: "Pending" },
//   { id: "ORD102", customer: "Amit", status: "Accepted" },
// ];

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getAllOrders();
      setOrders(data);
      // console.log(data)
    };

    fetchOrders();
  }, []);


  
  let geoWatchId = null;
  const startLiveTracking = (orderId) => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

  // Join socket room
  socket.emit("joinOrder", orderId);

  geoWatchId = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      console.log(orderId)

      socket.emit("sendLocation", {
        orderId,  
        lat: latitude,
        lng: longitude,
      });
    },
    (error) => {
      console.error("GPS error:", error);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    }
  );
};

const stopLiveTracking = () => {
  if (geoWatchId !== null) {
    navigator.geolocation.clearWatch(geoWatchId);
    geoWatchId = null;
  }
};



const handleStatusChange = async (orderId, newStatus) => {
  try {
    await updateOrderStatus(orderId, {"status":newStatus});

    // Update UI optimistically
    setOrders((prev) =>
      prev.map((o) =>
        o._id === orderId ? { ...o, status: newStatus } : o
      )
    );


  if (newStatus === "Out for Delivery") {
    console.log(orderId)
      startLiveTracking(orderId);
    }

    if (newStatus === "Delivered") {
      stopLiveTracking();
    }

  } catch (error) {
    alert("Failed to update order status");
  }
};
  return (
    <div className=" flex justify-between gap-2 ">
      <AdminSidebar/>
      <div className="flex-1">
      <h1 className="text-2xl font-bold mb-6 text-center mt-6">Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">Order #{order._id} | Total : {order.totalAmount}</p>
              <p className="text-gray-500">{order.user?.name}</p>
              <p className="text-gray-500">{order.user?.address}</p>
               {
              order.items.map((i)=>(
                 <p className="text-sm text-gray-500">{i.qty}x {i.name}</p>
              ))
             }
            </div>

            <select className="border p-2 rounded"
            onChange={(e) => handleStatusChange(order._id, e.target.value)}
            value={order.status}>
              <option>Pending</option>
              <option>Accepted</option>
              <option>Packed</option>
              <option>Out for Delivery</option>
              <option>Delivered</option>
            </select>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
