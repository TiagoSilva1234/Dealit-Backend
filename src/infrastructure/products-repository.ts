import { PrismaClient, Product } from "@prisma/client";

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
      category: { connect: { name: data.category.catName } },
      photos: data.photos,
      price: data.price,
      uploadDate: data.uploadDate,
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

//called in get product by id
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

const getProductsByUserId = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: Number(userId) }, include: {products: true} });
};
