import AdminSidebar from "../components/AdminSidebar";

const orders = [
  { id: "ORD101", customer: "Sahil", status: "Pending" },
  { id: "ORD102", customer: "Amit", status: "Accepted" },
];

export default function AdminOrders() {
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
              <p className="font-semibold">Order #{order.id}</p>
              <p className="text-gray-500">{order.customer}</p>
            </div>

            <select className="border p-2 rounded">
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
