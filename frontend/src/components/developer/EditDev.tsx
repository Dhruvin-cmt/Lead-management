import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import { fetchTech } from "@/apis/tech-api";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { editDeveloperSchema } from "@/types/devloper.types";
import {
  User,
  Mail,
  Briefcase,
  IndianRupee,
  Calendar,
  Sparkles,
  X,
  Plus,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { updateDeveloper } from "@/apis/dev-api";

type IEditFormDev = z.infer<typeof editDeveloperSchema>;

export default function EditDeveloper({ fetchAgain, devData, editForm }) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<IEditFormDev>({
    resolver: zodResolver(editDeveloperSchema),
    defaultValues: {
      techskills: devData?.techStacks,
    },
  });
  const [techDetails, setTechDetails] = useState<
    { name: string; id: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [rootError, setRootError] = useState<string | null>(null);
  // const [techies, setTechies] = useState<string[]>([]);
  const techies = useWatch({ control, name: "techskills" }) || [];
  console.log(techies);

  useEffect(() => {
    if (devData) {
      // const newT = devData.techStacks.map((t) => t.name);
      // setTechies(newT);

      reset({
        id: devData.id,
        developer_name: devData.developer_name,
        email: devData.email,
        techskills: devData.techStacks.map((t) => t.id),
        position: devData.position,
        salary: devData.salary,
        reliving_date: devData.reliving_date
          ? new Date(devData.reliving_date).toISOString().split("T")[0]
          : "",
      });
    }
  }, [devData, reset]);

  const selectedSkills = techDetails.filter((t) => techies.includes(t.id));

  const toggleSkill = (skill: string) => {
    const updated = techies.includes(skill)
      ? techies.filter((s) => s !== skill)
      : [...techies, skill];

    // setTechies(updated);
    setValue("techskills", updated, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const closeForm = async (value: boolean) => {
    reset();
    editForm(value);
  };

  const onSubmit = async (data: IEditFormDev) => {
    setRootError(null);
    const payload = {
      ...data,
      joining_date: new Date(devData.joining_date),
      techskills: techies,
    };

    try {
      const updatedData = editDeveloperSchema.safeParse(payload);
      if (!updatedData.success) {
        updatedData.error.issues.forEach((err) => {
          setError(err.path[0] as keyof IEditFormDev, {
            type: "manual",
            message: err.message,
          });
        });
        return;
      }
      console.log(updatedData)
      await updateDeveloper(updatedData.data.id, updatedData.data);
      editForm(false);
      fetchAgain();
    } catch (error) {
      console.log("Backend Error:", error);

      const errors = error.response?.data?.errors;

      if (Array.isArray(errors)) {
        errors.forEach((err) => {
          setError(err.field as keyof IEditFormDev, {
            type: "server",
            message: err.message,
          });
        });
      } else {
        setRootError(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    }
  };

  useEffect(() => {
    const getTech = async () => {
      setLoading(true);
      try {
        const rawData = (await fetchTech(true)).data.allData;
        const result = rawData.map((user) => ({
          id: user.id,
          name: user.name,
        }));
        setTechDetails(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    getTech();
  }, []);

  // const skillMap = new Map(techDetails.map((s) => [s.name, s.id]));

  // const result = techies.map((name) => skillMap.get(name)).filter(Boolean);

  if (!devData) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full shadow-2xl rounded-3xl border border-slate-200 overflow-hidden bg-white animate-in zoom-in-95 duration-300">
      <CardHeader className="relative pb-8 pt-10 px-8 bg-slate-50/50 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest">
              <Sparkles size={14} />
              <span>Acquisition Portal</span>
            </div>
            <CardTitle className="text-3xl font-black text-slate-900 tracking-tight">
              Onboard Engineer
            </CardTitle>
            <CardDescription className="text-slate-500 font-medium">
              Initialize a new node in the engineering ecosystem.
            </CardDescription>
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={() => editForm(false)}
            className="h-10 w-10 rounded-full hover:bg-rose-50 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <X size={20} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-8 max-h-[70vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* General Error (Backend) */}
          {rootError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-600 px-6 py-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <X size={18} className="shrink-0" />
              <p className="text-sm font-bold uppercase tracking-tight">
                {rootError}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column: Basic Info */}
            <div className="space-y-6">
              {/* Name */}
              <div className="space-y-2.5">
                <Label className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                  <User size={14} className="text-indigo-500" />
                  Full Name
                </Label>
                <Input
                  placeholder="e.g. Alan Turing"
                  className={cn(
                    "h-12 bg-slate-50/50 border-slate-200 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl transition-all font-medium",
                    errors.developer_name &&
                      "border-rose-400 focus:ring-rose-500 focus:border-rose-500"
                  )}
                  {...register("developer_name")}
                />
                {errors.developer_name && (
                  <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tighter animate-in fade-in slide-in-from-top-1">
                    {errors.developer_name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2.5">
                <Label className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                  <Mail size={14} className="text-indigo-500" />
                  Contact Endpoint
                </Label>
                <Input
                  type="email"
                  placeholder="name@company.com"
                  className={cn(
                    "h-12 bg-slate-50/50 border-slate-200 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl transition-all font-medium",
                    errors.email &&
                      "border-rose-400 focus:ring-rose-500 focus:border-rose-500"
                  )}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tighter animate-in fade-in slide-in-from-top-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Right Column: Numbers & Dates */}
            <div className="space-y-6">
              {/* Salary */}
              <div className="space-y-2.5">
                <Label className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                  <IndianRupee size={14} className="text-indigo-500" />
                  Annual Salary
                </Label>
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold transition-colors group-focus-within:text-indigo-600">
                    ₹
                  </span>
                  <Input
                    type="number"
                    placeholder="2,400,000"
                    className={cn(
                      "pl-9 h-12 bg-slate-50/50 border-slate-200 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl transition-all font-medium",
                      errors.salary &&
                        "border-rose-400 focus:ring-rose-500 focus:border-rose-500"
                    )}
                    {...register("salary", { valueAsNumber: true })}
                  />
                </div>
                {errors.salary && (
                  <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tighter animate-in fade-in slide-in-from-top-1">
                    {errors.salary.message}
                  </p>
                )}
              </div>

              {/* Position */}
              <div className="space-y-2.5">
                <Label className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                  <Briefcase size={14} className="text-indigo-500" />
                  Designation
                </Label>
                <Input
                  placeholder="e.g. Senior Kernel Engineer"
                  className={cn(
                    "h-12 bg-slate-50/50 border-slate-200 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl transition-all font-medium",
                    errors.position &&
                      "border-rose-400 focus:ring-rose-500 focus:border-rose-500"
                  )}
                  {...register("position")}
                />
                {errors.position && (
                  <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tighter animate-in fade-in slide-in-from-top-1">
                    {errors.position.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Joining Date */}
          <div className="space-y-2.5">
            <Label className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
              <Calendar size={14} className="text-indigo-500" />
              Activation Date
            </Label>
            <Input
              readOnly
              value={
                devData?.joining_date
                  ? new Date(devData.joining_date).toISOString().split("T")[0]
                  : ""
              }
              className={cn(
                "h-12 bg-slate-50/50 border-slate-200 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl transition-all font-medium",
                errors.reliving_date &&
                  "border-rose-400 focus:ring-rose-500 focus:border-rose-500"
              )}
            />
          </div>

          {/* Relieving Date*/}
          <div className="space-y-2.5">
            <Label className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
              <Calendar size={14} className="text-indigo-500" />
              Relieving Date
            </Label>
            <Input
              type="date"
              className={cn(
                "h-12 bg-slate-50/50 border-slate-200 focus:ring-indigo-500 focus:border-indigo-500 rounded-xl transition-all font-medium",
                errors.reliving_date &&
                  "border-rose-400 focus:ring-rose-500 focus:border-rose-500"
              )}
              {...register("reliving_date")}
            />
            {errors.reliving_date && (
              <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tighter animate-in fade-in slide-in-from-top-1">
                {errors.reliving_date.message}
              </p>
            )}
          </div>

          {/* Tech Skills Selection */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <Label className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
              <Sparkles size={14} className="text-indigo-500" />
              Core Competencies
            </Label>

            <div
              className={cn(
                "space-y-4 bg-slate-50/50 p-6 rounded-2xl border border-slate-100 transition-colors",
                errors.techskills && "border-rose-200 bg-rose-50/30"
              )}
            >
              {/* Selected Pills */}
              <div className="flex flex-wrap gap-2.5 min-h-10">
                {selectedSkills.length === 0 ? (
                  <p className="text-xs font-medium text-slate-400 italic">
                    No skills selected yet...
                  </p>
                ) : (
                  selectedSkills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-4 py-1.5 text-xs font-bold rounded-full bg-indigo-600 text-white flex items-center gap-2 shadow-md shadow-indigo-100 animate-in fade-in slide-in-from-left-2 duration-300"
                    >
                      {skill.name}
                      <button
                        type="button"
                        onClick={() => toggleSkill(skill.id)}
                        className="hover:text-indigo-200 transition-colors cursor-pointer"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))
                )}
              </div>

              {/* Selection Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {loading ? (
                  <div className="col-span-full py-4 text-center">
                    <span className="text-xs font-bold text-indigo-500 animate-pulse uppercase tracking-widest">
                      Scanning technical spectrum...
                    </span>
                  </div>
                ) : (
                  techDetails.map((skill) => {
                    const isSelected = techies.includes(skill.id);
                    return (
                      <button
                        type="button"
                        key={skill.id}
                        onClick={() => toggleSkill(skill.id)}
                        className={cn(
                          "px-3 py-2 text-[10px] font-black uppercase rounded-lg border transition-all text-left flex items-center justify-between group cursor-pointer",
                          isSelected
                            ? "bg-white border-indigo-600 text-indigo-600 shadow-sm"
                            : "bg-white border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-400 shadow-sm"
                        )}
                      >
                        {skill.name}
                        {isSelected ? (
                          <Sparkles size={10} />
                        ) : (
                          <Plus
                            size={10}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
            {errors.techskills && (
              <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tighter animate-in fade-in slide-in-from-top-1 pl-2">
                {errors.techskills.message}
              </p>
            )}
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => closeForm(false)}
              className="flex-1 h-12 rounded-xl font-bold text-slate-600 border-slate-200 hover:bg-slate-50 transition-all cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-2 h-12 rounded-xl bg-indigo-600 hover:bg-slate-900 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-100 transition-all active:scale-95 group cursor-pointer"
            >
              <Rocket size={18} className="mr-2 group-hover:animate-bounce" />
              Update Developer
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
