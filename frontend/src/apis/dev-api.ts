import { api } from "./axios";

export const getDevelopers = () => api.get("/dev");

export const addDeveloper = (data) => api.post("/dev/new", data);

export const updateDeveloper = (id: string, data) =>
  api.patch(`/dev/edit/${id}`, data);

export const removeDeveloper = (id: string) => api.patch(`/dev/delete/${id}`);

export const fetchDevById = (id: string) => api.get(`/dev/${id}`);
