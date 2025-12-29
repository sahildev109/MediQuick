export default function MedicineCard({ medicine }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:scale-2.5 transition" >
      <h2 className="font-semibold text-lg">{medicine.name}</h2>
      <p className="text-gray-500">₹{medicine.price}</p>

      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  );
}
