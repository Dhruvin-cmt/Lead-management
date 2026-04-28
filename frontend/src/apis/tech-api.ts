import type { TechData } from "@/types/types";
import { api } from "./axios";

export const fetchTech = (all?: boolean, page?: number, limit?: number ) =>
  api.get(`/tech?page=${page}&limit=${limit}&all=${all}`);

export const newTech = (data: TechData) => api.post("/tech/addnew", data);

export const removeTech = (id: string) => api.patch(`/tech/deletetech/${id}`);

export const categoryDetails = () => api.get("/tech/getcategory");
