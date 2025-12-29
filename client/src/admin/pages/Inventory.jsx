const medicines = [
  { id: 1, name: "Paracetamol", stock: 120, price: 50 },
  { id: 2, name: "Vitamin C", stock: 80, price: 120 },
];

export default function Inventory() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Inventory</h1>

      <table className="w-full bg-white rounded-xl shadow overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Stock</th>
            <th className="p-4 text-left">Price</th>
          </tr>
        </thead>

        <tbody>
          {medicines.map((med) => (
            <tr key={med.id} className="border-t">
              <td className="p-4">{med.name}</td>
              <td className="p-4">{med.stock}</td>
              <td className="p-4">₹{med.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
