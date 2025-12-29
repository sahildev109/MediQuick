const orders = [
  {
    id: "ORD101",
    date: "10 Jan 2025",
    amount: "₹290",
    status: "Delivered",
  },
  {
    id: "ORD102",
    date: "15 Jan 2025",
    amount: "₹120",
    status: "Pending",
  },
];

export default function Orders() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <p className="font-medium">Order #{order.id}</p>
              <p className="text-sm text-gray-500">{order.date}</p>
            </div>

            <div className="text-right">
              <p className="font-semibold">{order.amount}</p>
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
