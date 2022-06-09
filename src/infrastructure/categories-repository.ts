import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCategoryById = async (id?: string) => {
  if (isNaN(Number(id))) {
    try {
        const category = await prisma.category.findUnique({
          where: {
            name: id,
          },
        });
        return category === null ? "Category not found" : category;
      } catch (e) {
        console.log(e);
      }
  }
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });
    return category === null ? "Category not found" : category;
  } catch (e) {
    console.log(e);
  }
};

