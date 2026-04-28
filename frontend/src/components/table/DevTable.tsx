import {
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Search,
  Pencil,
  Terminal,
  Cpu,
  Mail,
  Activity,
  UserPlus,
} from "lucide-react";
import { useState, useMemo } from "react";

// ── shadcn/ui components ──────────────────────────────────────────────────────
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
// import styles from "./DevTable.module.css";
import { cn } from "@/lib/utils";

// ── Component ─────────────────────────────────────────────────────────────────
const TableDev = ({
  table,
  handleRemove,
  regForm,
  handleView,
  editForm,
}) => {
  const [search, setSearch] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const safeData = useMemo(() => {
    const data = Array.isArray(table?.data) ? table.data : [];
    if (!search) return data;
    return data.filter(
      (dev) =>
        dev.developer_name.toLowerCase().includes(search.toLowerCase()) ||
        dev.position.toLowerCase().includes(search.toLowerCase()) ||
        dev.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [table, search]);

  const onDeleteConfirm = () => {
    if (confirmDeleteId) {
      handleRemove(confirmDeleteId);
      setConfirmDeleteId(null);
    }
  };

  const handleRegForm = (value: boolean) => {
    regForm(value);
  };

  const openEditForm = async (value: boolean, id: string) => {
    try {
      editForm(value);
      handleView(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  if (!table || (Array.isArray(table?.data) && table.data.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-slate-400 space-y-4">
        <div className="bg-slate-50 p-4 rounded-full">
          <Cpu size={48} className="opacity-20" />
        </div>
        <p className="font-medium">Initializing engineering database...</p>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <section
        className="flex flex-col h-full bg-white transition-all duration-500 relative"
        aria-label="Developer Directory"
      >
        <h2 className="sr-only">Developer Management System</h2>

        {/* ── Enhanced Toolbar ── */}
        <div className="px-6 py-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/30">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <Terminal size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                Engineering Directory
                <span className="text-[10px] font-black uppercase bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-100">
                  {safeData.length} Nodes
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-medium italic">
                Real-time workforce distribution map
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4 group-focus-within:text-indigo-500 transition-colors" />
              <Input
                placeholder="Search by name, role or email..."
                className="pl-10 w-full md:w-80 bg-white border-slate-200 focus:ring-indigo-500 focus:border-indigo-500 h-10 rounded-xl transition-all shadow-sm group-hover:shadow-md"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button
              variant="default"
              size="sm"
              className="bg-slate-900 hover:bg-slate-800 text-white h-10 px-4 rounded-xl shadow-md transition-all active:scale-95 flex gap-2 cursor-pointer"
              onClick={() => handleRegForm(true)}
            >
              <UserPlus size={16} />
              <span className="hidden sm:inline">Add Member</span>
            </Button>
          </div>
        </div>

        {/* ── Premium Table Instance ── */}
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader className="bg-slate-50/50 sticky top-0 z-10 backdrop-blur-sm">
              <TableRow className="hover:bg-transparent border-b border-slate-100">
                <TableHead className="w-75 py-4 text-[11px] font-black uppercase tracking-widest text-slate-400 pl-8">
                  Engineer Name
                </TableHead>
                <TableHead className="py-4 text-[11px] font-black uppercase tracking-widest text-slate-400">
                  Specification
                </TableHead>
                <TableHead className="py-4 text-[11px] font-black uppercase tracking-widest text-slate-400">
                  Communication
                </TableHead>
                <TableHead className="py-4 text-[11px] font-black uppercase tracking-widest text-slate-400">
                  Status
                </TableHead>
                <TableHead className="py-4 text-[11px] font-black uppercase tracking-widest text-slate-400 text-right pr-8">
                  Management
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {safeData.map((dev) => (
                <TableRow
                  key={dev.id}
                  className="group border-b border-slate-50 hover:bg-indigo-50/20 transition-all duration-300"
                >
                  {/* Engineer Identity */}
                  <TableCell className="pl-8 py-5">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "relative h-11 w-11 rounded-2xl flex items-center justify-center text-sm font-black text-white shadow-md overflow-hidden",
                          dev.status === "ACTIVE"
                            ? "bg-linear-to-br from-indigo-500 to-blue-600"
                            : "bg-linear-to-br from-slate-400 to-slate-500"
                        )}
                      >
                        <span className="relative z-10">
                          {getInitials(dev.developer_name)}
                        </span>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {dev.developer_name}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Specialization */}
                  <TableCell>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                        {dev.position}
                      </span>
                    </div>
                  </TableCell>

                  {/* Connectivity */}
                  <TableCell>
                    <div className="flex items-center gap-2 group/email">
                      <div className="p-1.5 rounded-md bg-slate-50 text-slate-400 group-hover/email:bg-indigo-50 group-hover/email:text-indigo-500 transition-colors">
                        <Mail size={12} />
                      </div>
                      <span className="text-xs font-medium text-slate-600 font-mono">
                        {dev.email}
                      </span>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <span
                          className={cn(
                            "absolute inset-0 rounded-full blur-sm opacity-50",
                            dev.status === "ACTIVE"
                              ? "bg-emerald-400 animate-pulse"
                              : "bg-rose-400"
                          )}
                        />
                        <span
                          className={cn(
                            "relative block w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm",
                            dev.status === "ACTIVE"
                              ? "bg-emerald-500"
                              : "bg-rose-500"
                          )}
                        />
                      </div>
                      <span
                        className={cn(
                          "text-[10px] font-black uppercase tracking-wider",
                          dev.status === "ACTIVE"
                            ? "text-emerald-600"
                            : "text-rose-600"
                        )}
                      >
                        {dev.status}
                      </span>
                    </div>
                  </TableCell>

                  {/* Management Actions */}
                  <TableCell className="text-right pr-8">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                          >
                            <Eye size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View Profile</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                            onClick={() => openEditForm(true, dev.id)}
                          >
                            <Pencil size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit Profile</TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            onClick={() => setConfirmDeleteId(dev.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="bg-rose-600 text-white">
                          Decommission Member
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* ── Footer ── */}
        <div className="px-8 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
            <div className="flex items-center gap-1.5">
              <Activity size={12} className="text-emerald-500" />
              <span>System Synchronized</span>
            </div>
            <span className="hidden md:inline h-3 w-px bg-slate-200" />
            <span className="hidden md:inline italic uppercase tracking-tighter">
              v4.2.2.Stable - Late Update: {new Date().toLocaleTimeString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 rounded-xl border-slate-200 text-slate-600 hover:bg-white hover:text-indigo-600 shadow-sm transition-all grayscale hover:grayscale-0"
              disabled
            >
              <ChevronLeft size={16} className="mr-1" />
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3 rounded-xl border-slate-200 text-slate-600 hover:bg-white hover:text-indigo-600 shadow-sm transition-all grayscale hover:grayscale-0"
              disabled
            >
              Next
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>

        {/* ── Confirmation Modal ── */}
        {confirmDeleteId && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
              onClick={() => setConfirmDeleteId(null)}
            />
            <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-100 animate-in zoom-in-95 duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center animate-bounce">
                  <Trash2 size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    Decommission Node?
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">
                    This action will permanently remove the engineer from the
                    primary directory. Core data will be archived.
                  </p>
                </div>
                <div className="flex gap-3 w-full pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 h-12 rounded-xl font-bold border-slate-200 hover:bg-slate-50 text-slate-600 cursor-pointer"
                    onClick={() => setConfirmDeleteId(null)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 h-12 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-lg shadow-rose-100 transition-all active:scale-95 cursor-pointer"
                    onClick={onDeleteConfirm}
                  >
                    Yes, Decommission
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </TooltipProvider>
  );
};

export default TableDev;
