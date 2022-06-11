import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCategoryByMainCat = async (mainCat?: string) => {
  let main = await prisma.category.findUnique({
    where: {
      name: mainCat,
    },
  });
  if (main !== null && main.level === 2 && main.upperLevel !== null) {
    main = await prisma.category.findUnique({
      where: {
        name: mainCat,
      },
    });
    if (main !== null && main.upperLevel !== null) {
      const actualMain = await prisma.category.findUnique({
        where: {
          name: main.upperLevel,
        },
      });
      return { main: actualMain, subcategory: main };
    }
  }
  const subcategories = await prisma.category.findMany({
    where: {
      upperLevel: mainCat,
    },
  });
  return { main: main, subcategories };
};

export const getAllMainCategories = async () => {
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
