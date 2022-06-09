import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProductById = async (id: string) => {
  if (isNaN(Number(id))) {
    return "Wrong id format";
  }
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });
    return product === null ? "Product not found" : product;
  } catch (e) {
    console.log(e);
  }
};

export const saveProduct = async (data: any) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        category: { create: data.category },
        photos: data.photos,
        price: data.price,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
