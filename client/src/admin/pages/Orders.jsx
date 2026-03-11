import AdminSidebar from "../components/AdminSidebar";
import { useEffect, useState, useRef } from "react";
import { getAllOrders, updateOrderStatus } from "../../services/order.service";
import socket from "../../config/socket";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const geoWatchId = useRef(null);
  const intervalRef = useRef(null);
  const lastLocation = useRef(null);

  // SOCKET CONNECTION DEBUG
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Admin socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Admin socket disconnected");
    });
  }, []);

  // FETCH ORDERS
  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getAllOrders();
      console.log("📦 Orders fetched:", data);
      setOrders(data);
    };

    fetchOrders();
  }, []);

  // STORE ORDER STATS
  useEffect(() => {
    const deliveredCount = orders.filter(
      (order) => order.status === "Delivered"
    ).length;

    localStorage.setItem("DeliveredNo", deliveredCount);

    const pendingCount = orders.length - deliveredCount;
    localStorage.setItem("PendingNo", pendingCount);

    console.log("📊 Delivered:", deliveredCount);
    console.log("📊 Pending:", pendingCount);
  }, [orders]);

  // START LIVE TRACKING
  const startLiveTracking = (orderId) => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    console.log("🚚 Starting live tracking for order:", orderId);

    // Watch GPS changes
    geoWatchId.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        lastLocation.current = {
          lat: latitude,
          lng: longitude,
        };

        console.log("📍 GPS updated:", latitude, longitude);
      },
      (error) => {
        console.error("❌ GPS error:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 2000,
      }
    );

    // Send location every second
    intervalRef.current = setInterval(() => {
      if (!lastLocation.current) return;

      socket.emit("sendLocation", {
        orderId,
        ...lastLocation.current,
      });

      console.log("📡 Sending location:", lastLocation.current);
    }, 1000);
  };

  // STOP LIVE TRACKING
  const stopLiveTracking = () => {
    if (geoWatchId.current !== null) {
      navigator.geolocation.clearWatch(geoWatchId.current);
      geoWatchId.current = null;
    }

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    lastLocation.current = null;

    console.log("🛑 Live tracking stopped");
  };

  // UPDATE ORDER STATUS
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      console.log("🔄 Updating order:", orderId, "to", newStatus);

      await updateOrderStatus(orderId, { status: newStatus });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: newStatus } : o
        )
      );

      if (newStatus === "Out for Delivery") {
        startLiveTracking(orderId);
      }

      if (newStatus === "Delivered") {
        stopLiveTracking();
      }
    } catch (error) {
      console.error("❌ Failed to update order:", error);
      alert("Failed to update order status");
    }
  };

  return (
    <div className="flex justify-between gap-2">
      <AdminSidebar />

      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6 text-center mt-6">
          Orders
        </h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  Order #{order._id} | Total : ₹{order.totalAmount}
                </p>

                <p className="text-gray-500">{order.user?.name}</p>

                <p className="text-gray-500">{order.user?.address}</p>

                {order.items.map((i) => (
                  <p
                    key={i._id}
                    className="text-sm text-gray-500"
                  >
                    {i.qty}x {i.name}
                  </p>
                ))}

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-yellow-400"
                  }`}
                >
                  {order.paymentStatus} | {order.paymentMethod}
                </span>
              </div>

              <select
                className="border p-2 rounded"
                onChange={(e) =>
                  handleStatusChange(order._id, e.target.value)
                }
                value={order.status}
              >
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