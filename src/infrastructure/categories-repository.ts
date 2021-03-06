import { Category } from "@prisma/client";
import  prisma  from "../../client";


export const getCategoryByMainCat = async (
  cat: string
): Promise<
  | {
      main: Category;
      subcategory: Category;
    }
  | {
      main: Category;
      subcategories: Category[];
    }
> => {
  const main = await prisma.category.findUnique({
    where: {
      name: cat,
    },
  });
  if (main && main.level === 2 && main.upperLevel !== null) {
    const actualMain = await prisma.category.findUnique({
      where: {
        name: main.upperLevel,
      },
    });
    if (actualMain) return { main: actualMain, subcategory: main };
    throw new Error("Something went wrong with database connection");
  }
  if (main) {
    const subcategories = await prisma.category.findMany({
      where: {
        upperLevel: main.name,
      },
    });
    return { main: main, subcategories };
  }
  throw new Error("Something went wrong with database connection");
};

export const getAllMainCategories = async (): Promise<
  {
    subcategories: Category[];
    id: number;
    name: string;
    level: number;
    upperLevel: string | null;
    image: string | null;
  }[]
> => {
  const main = await prisma.category.findMany({
    where: {
      level: 1,
    },
  });

  const result = Promise.all(
    main.map(async (e) => {
      const sub = await prisma.category.findMany({
        where: {
          upperLevel: e.name,
        },
      });
      return { ...e, subcategories: sub };
    })
  );
  return result;
};
