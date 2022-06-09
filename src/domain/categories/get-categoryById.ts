import { getCategoryByMainCat } from "../../infrastructure/categories-repository";

export default async (mainCat: string) => await getCategoryByMainCat(mainCat);
