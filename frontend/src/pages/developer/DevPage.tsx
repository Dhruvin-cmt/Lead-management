import {
  fetchDevById,
  getDevelopers,
  removeDeveloper,
} from "@/apis/dev-api";
import RegisterDeveloperCard from "@/components/developer/RegisterDev";
import TableDev from "@/components/table/DevTable";
import { Users, UserCheck, UserMinus, Plus } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import EditDeveloper from "@/components/developer/EditDev";

const DevPage = () => {
  const [tableData, setTableData] = useState({ data: [] });
  const [regForm, setRegForm] = useState<boolean>(false);
  const [devDetails, setDevDetails] = useState();
  const [editDevOpen, setEditDevOpen] = useState<boolean>(false);

  const toggleRegForm = (value: boolean) => {
    setRegForm(value);
  };

  const toggleEditForm = (value: boolean) => {
    setEditDevOpen(value);
  };

  const fetchDev = async () => {
    try {
      const result = (await getDevelopers()).data;
      setTableData(result);
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };

  const onRemove = async (id: string) => {
    try {
      await removeDeveloper(id);
      fetchDev();
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };

  const onView = async (id: string) => {
    try {
      const result = (await fetchDevById(id)).data;
      setDevDetails(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // const onUpadate = async (id: string, data) => {
  //   try {
  //     await updateDeveloper(id, data);
  //     fetchDev();
  //   } catch (error) {
  //     console.log("error", error);
  //     throw error;
  //   }
  // };

  useEffect(() => {
    const fetchDeveloper = () => {
      fetchDev();
    }
    fetchDeveloper()
  }, []);

  const stats = useMemo(() => {
    const data = tableData?.data || [];
    return {
      total: data.length,
      active: data.filter((d) => d.status === "ACTIVE").length,
      inactive: data.filter((d) => d.status === "INACTIVE").length,
    };
  }, [tableData]);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-8 space-y-8 animate-in fade-in duration-500">
      {/* --- Page Header --- */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm tracking-wide uppercase">
            <Users size={16} />
            <span>Workforce Management</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Developer Ecosystem
          </h1>
          <p className="text-slate-500 font-medium max-w-2xl">
            Monitor and manage your engineering talent. Oversee availability,
            specializations, and core competencies in real-time.
          </p>
        </div>

        <Button
          onClick={() => toggleRegForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 border-none h-11 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
        >
          <Plus size={18} className="mr-2" />
          Register New Developer
        </Button>
      </header>

      {/* --- Stats Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          {
            label: "Total Engineers",
            value: stats.total,
            icon: Users,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
          },
          {
            label: "Active Nodes",
            value: stats.active,
            icon: UserCheck,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Service Mode",
            value: stats.inactive,
            icon: UserMinus,
            color: "text-rose-600",
            bg: "bg-rose-50",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group overflow-hidden relative"
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-black text-slate-900">
                  {stat.value}
                </h3>
              </div>
              <div
                className={`${stat.bg} ${stat.color} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon size={24} />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
              <stat.icon size={120} />
            </div>
          </div>
        ))}
      </div>

      {/* --- Main Content Area --- */}
      <main className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-150">
        <TableDev
          table={tableData}
          handleRemove={onRemove}
          regForm={toggleRegForm}
          editForm={toggleEditForm}
          handleView={onView}
        />
      </main>

      {/* --- Modals / Overlays --- */}
      {regForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => toggleRegForm(false)}
          />
          <div className="relative z-10 w-full max-w-2xl transform transition-all duration-300 scale-100 opacity-100">
            <RegisterDeveloperCard
              regForm={toggleRegForm}
              fetchAgain={fetchDev}
            />
            {/* <EditDeveloper regForm={toggleRegForm} fetchAgain={fetchDev} devData={devDetails} editForm={toggleEditForm}/> */}
          </div>
        </div>
      )}

      {editDevOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => toggleRegForm(false)}
          />
          <div className="relative z-10 w-full max-w-2xl transform transition-all duration-300 scale-100 opacity-100">
            {/* <RegisterDeveloperCard regForm={toggleRegForm} fetchAgain={fetchDev} /> */}
            <EditDeveloper
              fetchAgain={fetchDev}
              devData={devDetails}
              editForm={toggleEditForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DevPage;
