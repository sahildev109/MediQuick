import { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { addMed } from "../../services/medicine.service";

export default function AddMedicine() {
const [name, setName]=useState("");
const [description ,setDesc]=useState('');
const [price, setPrice]=useState(null);
const [stock, setStock]=useState(null);
const [image, setImage] = useState(null);
const [loading, setLoading]=useState(false);
const [preview, setPreview] = useState(null);


const handleAddMedicine = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", image);

    const res = await addMed(formData);

    alert(res.message);

    setName("");
    setDesc("");
    setPrice(0);
    setStock(0);
    setImage(null);
    setPreview(null);

  } catch (error) {
    console.log(error);
  }finally{
    setLoading(false)
  }
};


  return (
    <div className="min-h-screen bg-[#03045E] flex justify-between align-middle">
      <AdminSidebar/>
      <div className="flex-1 p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#CAF0F8] tracking-tight">Add Medicine</h1>

      <div className="bg-[#CAF0F8] border border-[#90E0EF] p-6 md:p-8 rounded-2xl shadow-2xl">
        <div className="rounded-2xl border border-[#90E0EF] bg-white/80 p-5 md:p-6 mb-6">
          <p className="text-sm font-medium text-[#0077B6]">Create Product</p>
          <p className="text-2xl md:text-3xl font-bold text-[#03045E]">Medicine Details</p>
        </div>

      <form className="space-y-4 bg-white/70 border border-[#90E0EF] p-6 rounded-2xl shadow-lg">
        <input placeholder="Medicine Name" className="w-full p-3 border border-[#90E0EF] rounded-xl text-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#00B4D8]" onChange={(e)=>setName(e.target.value)}
        value={name}/>
        <textarea placeholder="Description" className="w-full p-3 border border-[#90E0EF] rounded-xl text-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#00B4D8]" onChange={(e)=>setDesc(e.target.value)}
          value={description}/>
        <input placeholder="Price" type="number" className="w-full p-3 border border-[#90E0EF] rounded-xl text-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#00B4D8]" onChange={(e)=>setPrice(e.target.value)}
        value={price}/>
        <input placeholder="Stock" type="number" className="w-full p-3 border border-[#90E0EF] rounded-xl text-[#03045E] focus:outline-none focus:ring-2 focus:ring-[#00B4D8]" onChange={(e)=>setStock(e.target.value)}
        value={stock}/>
        {preview && (
  <div className="mt-3">
    <p className="text-sm text-[#0077B6] mb-1">Image Preview</p>
    <img
      src={preview}
      alt="Medicine preview"
      className="h-40 w-full object-contain rounded-xl border border-[#90E0EF] bg-white"
    />
  </div>
)}
  <div className="w-full">
  {/* Hidden native input */}
  <input
    type="file"
    accept="image/*"
    id="medicine-image"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files[0];
      setImage(file);

      if (file) {
        setPreview(URL.createObjectURL(file));
      }
    }}
  />

  {/* Custom UI */}
  <label
    htmlFor="medicine-image"
    className="
      flex items-center justify-center gap-3
      w-full px-4 py-3
      border-2 border-dashed border-[#90E0EF]
      rounded-xl cursor-pointer
      text-[#0077B6]
      hover:border-[#03045E]
      hover:text-[#03045E]
      transition
    "
  >
    📷 <span>{image ? image.name : "Click to upload medicine image"}</span>
  </label>
</div>


        <button className="bg-[#0077B6] text-white w-full py-3 rounded-xl hover:bg-[#00B4D8] transition-colors font-semibold"
        onClick={handleAddMedicine}>
         {loading? 'Adding Medicine , Please Wait ....': 'Add Medicine' }
        </button>
      </form>
      </div>
      </div>
    </div>
  );
}
