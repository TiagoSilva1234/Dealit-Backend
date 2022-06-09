import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCategoryByMainCat = async (mainCat?: string) => {
  const categories = await prisma.category.findMany({
    where: {
      upperLevel: mainCat,
    },
  });
  if (categories !== null) {
    return categories;
  }
  throw new Error("Category not found");
};

