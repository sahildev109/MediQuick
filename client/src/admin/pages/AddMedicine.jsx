export default function AddMedicine() {
  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Add Medicine</h1>

      <form className="space-y-4 bg-white p-6 rounded-xl shadow">
        <input placeholder="Medicine Name" className="w-full p-3 border rounded" />
        <input placeholder="Price" type="number" className="w-full p-3 border rounded" />
        <input placeholder="Stock" type="number" className="w-full p-3 border rounded" />

        <button className="bg-[#1c3c71] text-white w-full py-3 rounded-lg">
          Add Medicine
        </button>
      </form>
    </div>
  );
}
