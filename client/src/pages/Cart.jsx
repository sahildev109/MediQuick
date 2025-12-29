import { FaTrash } from "react-icons/fa";

const cartItems = [
  { id: 1, name: "Paracetamol", price: 50, qty: 2 },
  { id: 2, name: "Vitamin C", price: 120, qty: 1 },
];

export default function Cart() {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

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
                key={item.id}
                className="flex justify-between items-center bg-white p-4 rounded-xl shadow"
              >
                <div>
                  <h2 className="font-medium">{item.name}</h2>
                  <p className="text-gray-500">
                    ₹{item.price} × {item.qty}
                  </p>
                </div>

                <button className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <p className="text-lg font-semibold">Total: ₹{total}</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
