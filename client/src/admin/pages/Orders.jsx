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
    <div className="min-h-screen bg-[#03045E] flex justify-between gap-2">
      <AdminSidebar />

      <div className="flex-1 p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#CAF0F8] tracking-tight">
          Orders
        </h1>

        <div className="bg-[#CAF0F8] border border-[#90E0EF] p-6 md:p-8 rounded-2xl shadow-2xl">
          <div className="rounded-2xl border border-[#90E0EF] bg-white/80 p-5 md:p-6 mb-6">
            <p className="text-sm font-medium text-[#0077B6]">Order Summary</p>
            <p className="text-2xl md:text-3xl font-bold text-[#03045E]">{orders.length} orders tracked</p>
          </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white/70 border border-[#90E0EF] p-5 rounded-2xl shadow-lg flex flex-col md:flex-row md:justify-between md:items-center gap-4"
            >
              <div>
                <p className="text-xs uppercase tracking-wide text-[#0077B6] font-semibold">Order</p>
                <p className="font-semibold text-[#03045E] text-lg">
                  Order #{order._id} | Total : ₹{order.totalAmount}
                </p>

                <p className="text-[#0077B6] font-medium">{order.user?.name}</p>

                <p className="text-[#0077B6]">{order.user?.address}</p>

                {order.items.map((i) => (
                  <p
                    key={i._id}
                    className="text-sm text-[#0077B6]"
                  >
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
              </div>

              <select
                className="bg-white border border-[#90E0EF] text-[#03045E] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
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
    </div>
  );
}