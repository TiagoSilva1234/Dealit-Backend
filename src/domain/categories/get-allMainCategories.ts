import { Category } from "@prisma/client";
import { getAllMainCategories } from "../../infrastructure/categories-repository";

export default async (): Promise<
  {
    subcategories: Category[];
    id: number;
    name: string;
    level: number;
    upperLevel: string | null;
    image: string | null;
  }[]
> => await getAllMainCategories();
