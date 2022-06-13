import { PrismaClient, Product } from "@prisma/client";
import { ProductData } from "../types";

const prisma = new PrismaClient();

export const getProductById = async (id: string, num: number) => {
  if (id === "random") {
    return getRandomProduct(num);
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

export const saveProduct = async (data: ProductData) => {
  const product = await prisma.product.create({
    data: {
      user: { connect: { id: data.userId } },
      name: data.name,
      description: data.description,
      category: { connect: { name: data.category.catName } },
      photos: data.photos,
      price: data.price,
    },
  });
  return product;
};

export const getProductsByCategoryPaginated = async (
  category: string,
  skip: number,
  take: number = 6
) => {
  console.log(skip, take, category);
  const cat = await prisma.category.findUnique({
    where: {
      name: category,
    },
  });
  console.log(cat);
  if (cat !== null) {
    if (cat.level === 2) {
      const products = await prisma.product.findMany({
        skip,
        take,
        where: {
          categoryName: cat.name,
        },
      });
      return products;
    }
    const cats = await prisma.category.findMany({
      where: {
        upperLevel: cat.name,
      },
      include: {
        products: true,
      },
    });
    const prods: Product[] = [];
    cats.forEach((e) => e.products.forEach((prod) => prods.push(prod)));
    return prods;
  }
  throw new Error("category not found");
};

export const getAllProductsPaginated = async (
  skip: number,
  take: number = 6
) => {
  return prisma.product.findMany({ skip, take });
};

export const getProductsByUserId = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { products: true },
  });
  if (user) {
    return user.products;
  }
  throw new Error("User does not exist");
};

//////////////////////////////////////////////////////////
//called in get product by id
const getRandomProduct = async (num: number) => {
  const product = await prisma.product.findMany({
    orderBy: { id: "desc" },
    take: 1,
  });

  if (num === 1) {
    const randomId = Math.floor(Math.random() * product[0].id) + 1;
    const randomProduct = await prisma.product.findUnique({
      where: { id: randomId },
    });
    return randomProduct;
  }
  const ar: Product[] = [];
  while (ar.length !== num) {
    let rep = false;
    const randomId = Math.floor(Math.random() * product[0].id) + 1;
    for (let i = 0; i < ar.length; i++) {
      if (randomId === ar[i].id) {
        rep = true;
      }
    }
    if (rep === true) {
      continue;
    }
    const randomProduct = await prisma.product.findUnique({
      where: { id: randomId },
    });
    if (randomProduct) {
      ar.push(randomProduct);
    }
  }

  return ar;
};
//////////////////////////////////////////////////////////

export const getLatestProducts = async (skip: number, take: number) => {
  const prodList = await prisma.product.findMany({
    orderBy: { uploadDate: "desc" },
    skip,
    take,
  });
  if (prodList) {
    return prodList;
  }
  return null;
};
