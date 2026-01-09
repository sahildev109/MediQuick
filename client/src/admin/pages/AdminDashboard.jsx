import AdminSidebar from "../components/AdminSidebar";

export default function AdminDashboard() {
  return (
    <div className=" ">
      {/* <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1> */}
      <div className="flex justify-between">
      <AdminSidebar/>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        <StatCard title="Total Products" value={localStorage.getItem('medicinesNO')} />
        <StatCard title="Pending Orders" value={localStorage.getItem('PendingNo')} />
        <StatCard title="Delivered Orders" value={localStorage.getItem('DeliveredNo')} />
      </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-gray-500">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
