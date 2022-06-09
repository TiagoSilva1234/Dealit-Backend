import { getCategoryById } from "../../infrastructure/categories-repository";

export default async (id: string) => await getCategoryById(id);
