import { useEffect, useState } from "react";
import MedicineCard from "../components/MedicineCard";
import { getMed } from "../services/medicine.service";

// const medicinesData = [
//   { id: 1, name: "Paracetamol", price: 50 },
//   { id: 2, name: "Vitamin C", price: 120 },
//   { id: 3, name: "Cough Syrup", price: 90 },
//   { id: 4, name: "Aspirin", price: 60 },
// ];

export default function Home() {
const [medicinesData,setMedicinesData]=useState([])

  const [searchQuery, setSearchQuery] = useState("");

  
  
  useEffect(()=>{
    const fetchMedicineData=async()=>{
      try {
        const res=await getMed();
      setMedicinesData(res);
      } catch (error) {
        console.log(error)
      }
    }

    fetchMedicineData();    
    
  },[])

  const filteredMedicines = medicinesData.filter((med) =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 px-18 min-h-screen
        bg-[url(/image.png)]
        bg-repeat
      bg-top" style={{backgroundColor:'#03045E'}}>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search medicines..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 mb-6 border border-[#90E0EF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
      style={{backgroundColor:'#CAF0F8'}}
      />
      

      {/* Results */}
      {filteredMedicines.length === 0 ? (
        <p className="text-[#90E0EF] text-center">
          No medicines found
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredMedicines.map((med) => (
            <MedicineCard key={med.id} medicine={med} />
          ))}
        </div>
      )}
    </div>
  );
}
