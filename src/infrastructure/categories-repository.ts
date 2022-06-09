import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCategoryById = async (id?: string) => {
  if (isNaN(Number(id))) {
    const category = await prisma.category.findUnique({
      where: {
        name: id,
      },
    });
    if (category === null) {
      return category;
    }
    throw new Error("Category not found");
  }
  const category = await prisma.category.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (category === null) {
    return category;
  }
  throw new Error("Category not found");
};
