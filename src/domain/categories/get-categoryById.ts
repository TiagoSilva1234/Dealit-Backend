import { Category } from "@prisma/client";
import { getCategoryByMainCat } from "../../infrastructure/categories-repository";

export default async (
  mainCat: string
): Promise<
  | {
      main: Category;
      subcategory: Category;
    }
  | {
      main: Category;
      subcategories: Category[];
    }
> => await getCategoryByMainCat(mainCat);
