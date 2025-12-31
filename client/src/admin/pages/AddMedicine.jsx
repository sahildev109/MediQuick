import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { addMed } from "../../services/medicine.service";

export default function AddMedicine() {
const [name, setName]=useState("");
const [description ,setDesc]=useState('');
const [price, setPrice]=useState(0);
const [stock, setStock]=useState(0);

const handleAddMedicine=async(e)=>{
e.preventDefault();
try {
    const res = await addMed({name,description,price,stock})
    console.log(res)
    alert(res.message)
    setName("")
    setDesc("")
    setPrice(0)
    setStock(0)
   
} catch (error) {
  console.log(error)
}
}


  return (
    <div className=" flex justify-between align-middle">
      <AdminSidebar/>
      <div className="flex-1">
      <h1 className="text-2xl font-bold mb-6 text-center mt-6 ">Add Medicine</h1>

      <form className="space-y-4 bg-white p-6 rounded-xl shadow">
        <input placeholder="Medicine Name" className="w-full p-3 border rounded" onChange={(e)=>setName(e.target.value)}
        value={name}/>
        <textarea placeholder="Description" className="w-full p-3 border rounded" onChange={(e)=>setDesc(e.target.value)}
          value={description}/>
        <input placeholder="Price" type="number" className="w-full p-3 border rounded" onChange={(e)=>setPrice(e.target.value)}
        value={price}/>
        <input placeholder="Stock" type="number" className="w-full p-3 border rounded" onChange={(e)=>setStock(e.target.value)}
        value={stock}/>

        <button className="bg-[#1c3c71] text-white w-full py-3 rounded-lg"
        onClick={handleAddMedicine}>
          Add Medicine
        </button>
      </form>
      </div>
    </div>
  );
}
