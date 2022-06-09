import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCategoryByMainCat = async (mainCat?: string) => {
  const main = await prisma.category.findUnique({
    where: {
      name: mainCat,
    },
  });
  const subcategories = await prisma.category.findMany({
    where: {
      upperLevel: mainCat,
    },
  });
  return { main: main, subcategories };
};
