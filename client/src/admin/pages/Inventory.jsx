import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { getMed } from "../../services/medicine.service";

// const medicines = [
//   { id: 1, name: "Paracetamol", stock: 120, price: 50 },
//   { id: 2, name: "Vitamin C", stock: 80, price: 120 },
// ];

export default function Inventory() {
const [medicines , setMedicines]=useState([])
useEffect(()=>{
const fetchMedicines=async()=>{
  try {
    const meds = await getMed();
setMedicines(meds);
  localStorage.setItem("medicinesNO", meds.length);

  } catch (error) {
    console.log(error)
  }
}
fetchMedicines()
},[])


  return (
    <div className="min-h-screen bg-[#03045E] flex justify-between gap-2">
      <AdminSidebar/>
      <div className="flex-1 overflow-auto p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#CAF0F8] tracking-tight">Inventory</h1>

      <div className="bg-[#CAF0F8] border border-[#90E0EF] p-6 md:p-8 rounded-2xl shadow-2xl">
        <div className="rounded-2xl border border-[#90E0EF] bg-white/80 p-5 md:p-6 mb-6">
          <p className="text-sm font-medium text-[#0077B6]">Inventory Summary</p>
          <p className="text-2xl md:text-3xl font-bold text-[#03045E]">{medicines.length} medicines listed</p>
        </div>

      <table className="w-full bg-white/70 border border-[#90E0EF] rounded-2xl shadow-lg overflow-hidden">
        <thead className="bg-[#90E0EF]/70">
          <tr>
            <th className="p-4 text-left text-[#03045E] text-sm uppercase tracking-wide">Name</th>
            <th className="p-4 text-left text-[#03045E] text-sm uppercase tracking-wide">Stock</th>
            <th className="p-4 text-left text-[#03045E] text-sm uppercase tracking-wide">Price</th>
          </tr>
        </thead>

        <tbody>
          {medicines.map((med) => (
            <tr key={med.id} className="border-t border-[#90E0EF]">
              <td className="p-4 text-[#03045E] font-semibold">{med.name}</td>
              <td className="p-4 text-[#0077B6] font-medium">{med.stock}</td>
              <td className="p-4 text-[#03045E] font-semibold">₹{med.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      </div>
    </div>
  );
}
