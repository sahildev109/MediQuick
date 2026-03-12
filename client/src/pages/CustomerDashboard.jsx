import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import MedicineCard from "../components/MedicineCard";
import { getMed } from "../services/medicine.service";

export default function CustomerDashboard() {
  const [medicinesData, setMedicinesData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMedicineData = async () => {
      try {
        const res = await getMed();
        setMedicinesData(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMedicineData();
  }, []);

  const filteredMedicines = medicinesData.filter((med) =>
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="p-6 md:p-8 lg:px-18 min-h-screen
        bg-[url(/image.png)]
        bg-repeat
        bg-top"
      style={{ backgroundColor: "#03045E" }}
    >
      <div className="max-w-8xl mx-auto">
        <div className="mb-8 bg-[#CAF0F8]/95 border border-[#90E0EF] rounded-2xl p-5 md:p-6 shadow-xl">
          <h1 className="text-2xl md:text-3xl font-bold text-[#03045E]">Find your medicines</h1>
          <p className="text-[#0077B6] mt-1">Search from the available collection and add items to your cart.</p>

          <div className="mt-4 flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-[#90E0EF] focus-within:ring-2 focus-within:ring-[#00B4D8]">
            <FaSearch color="#0077B6" />
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-[#03045E] placeholder:text-[#0077B6]/70"
            />
          </div>
        </div>

        {filteredMedicines.length === 0 ? (
          <div className="bg-[#CAF0F8]/90 border border-[#90E0EF] rounded-2xl p-8 text-center shadow-lg">
            <p className="text-[#0077B6] text-lg font-medium">No medicines found</p>
            <p className="text-[#03045E]/80 mt-1">Try searching with a different name.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMedicines.map((med) => (
              <MedicineCard key={med.id} medicine={med} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
