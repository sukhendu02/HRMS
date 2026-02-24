import { useEffect, useState } from "react";
import { fetchEmployeeAttendance } from "../../Services/fetchAttendance.js";
import toast from "react-hot-toast";

export default function EmployeeAttendance({ employee }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const res = await fetchEmployeeAttendance(employee._id);
        setRecords(res.data.data);
        console.log("Fetched attendance:", res.data.data);
      } catch {
        toast.error("Failed to load attendance");
      }
    };

    loadAttendance();
  }, [employee]);

  const presentDays = records.filter(r => r.status === "Present").length;
  const absentDays = records.filter(r => r.status === "Absent").length;
  const rate =
    records.length === 0
      ? 0
      : Math.round((presentDays / records.length) * 100);

  return (
    <div>
      {/* Employee Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
          {employee.fullName
            .split(" ")
            .map(n => n[0])
            .join("")}
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            {employee.fullName}
          </h3>
          <p className="text-gray-500 text-xs">
            {employee.department} • {employee.employeeId}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard title="Present Days" value={presentDays} color="green" />
        <StatCard title="Absent Days" value={absentDays} color="red" />
        <StatCard title="Attendance Rate" value={`${rate}%`} color="indigo" />
      </div>

      {/* Records Table */}
      <table className="w-full text-sm">
        <thead className=" text-gray-500">
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {records.map((rec, i) => (
            <tr key={rec._id} className="text-xs shadow-sm mt-2 rounded-lg mb-2">
              <td className="p-3">{i + 1}</td>

              <td className="p-3">
                {new Date(rec.date).toDateString()}
              </td>

              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      rec.status === "Present"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                >
                  ● {rec.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colors = {
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-500",
    indigo: "bg-indigo-50 text-indigo-600",
  };

  return (
    <div className={`p-6 rounded-xl text-center ${colors[color]}`}>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm">{title}</p>
    </div>
  );
}