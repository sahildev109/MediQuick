import AdminSidebar from "../components/AdminSidebar";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#03045E]">
      <div className="flex justify-between">
      <AdminSidebar/>

      <div className="flex-1 p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#CAF0F8] tracking-tight">Dashboard</h1>

        <div className="bg-[#CAF0F8] border border-[#90E0EF] p-6 md:p-8 rounded-2xl shadow-2xl">
          <div className="rounded-2xl border border-[#90E0EF] bg-white/80 p-5 md:p-6 mb-6">
            <p className="text-sm font-medium text-[#0077B6]">Admin Summary</p>
            <p className="text-2xl md:text-3xl font-bold text-[#03045E]">Store Performance</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Products" value={localStorage.getItem('medicinesNO')} />
            <StatCard title="Pending Orders" value={localStorage.getItem('PendingNo')} />
            <StatCard title="Delivered Orders" value={localStorage.getItem('DeliveredNo')} />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white/70 border border-[#90E0EF] p-6 rounded-2xl shadow-lg">
      <p className="text-[#0077B6] text-sm uppercase tracking-wide font-semibold">{title}</p>
      <p className="text-3xl font-bold text-[#03045E] mt-1">{value || 0}</p>
    </div>
  );
}
