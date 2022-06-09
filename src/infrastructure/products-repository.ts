import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProductById = async (id: string) => {
  if (id === "random") {
    return getRandomProduct();
  }

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (product === null) {
    throw new Error("Product does not exist");
  }
  return product;
};

export const saveProduct = async (data: any) => {
  const product = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      category: { connect: {name: data.category.catName} },
      photos: data.photos,
      price: data.price,
    },
  });
  return product;
};

const getRandomProduct = async () => {
  const product = await prisma.product.findMany({
    orderBy: { id: "desc" },
    take: 1,
  });

  const randomId = Math.floor(Math.random() * product[0].id) + 1;
  const randomProduct = await prisma.product.findUnique({
    where: { id: randomId },
  });
  return randomProduct;
};
