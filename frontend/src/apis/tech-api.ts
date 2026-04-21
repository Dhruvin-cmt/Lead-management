import type { TechData } from "@/types/types";
import { api } from "./axios";

export const fetchTech = (page: number) => api.get(`/api/v1/tech?page=${page}`);

export const newTech = (data: TechData) =>
  api.post("/api/v1/tech/addnew", data);

export const removeTech = (id: string) =>
  api.patch(`/api/v1/tech/deletetech/${id}`);

export const categoryDetails = () => api.get("api/v1/tech/getcategory");
