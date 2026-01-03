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
        {preview && (
  <div className="mt-3">
    <p className="text-sm text-gray-500 mb-1">Image Preview</p>
    <img
      src={preview}
      alt="Medicine preview"
      className="h-40 w-full object-contain rounded border"
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
      border-2 border-dashed border-gray-300
      rounded-lg cursor-pointer
      text-gray-600
      hover:border-[#1c3c71]
      hover:text-[#1c3c71]
      transition
    "
  >
    📷 <span>{image ? image.name : "Click to upload medicine image"}</span>
  </label>
</div>


        <button className="bg-[#1c3c71] text-white w-full py-3 rounded-lg"
        onClick={handleAddMedicine}>
         {loading? 'Adding Medicine , Please Wait ....': 'Add Medicine' }
        </button>
      </form>
      </div>
    </div>
  );
}
