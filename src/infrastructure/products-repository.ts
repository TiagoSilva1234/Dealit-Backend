import prisma from "../../client";
import { Product } from "@prisma/client";
import { ProductData, ProdUpdateData } from "../utils/types";

export const getProductById = async (
  id: string,
  skip: number,
  take: number
) => {
  if (id === "random") {
    return getRandomProduct(take);
  }
  if (id === "latest") {
    return getLatestProducts(skip, take);
  }

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (product === null || product === undefined) {
    throw new Error("Product does not exist");
  }

  return product;
};

export const saveProduct = async (
  data: ProductData,
  upload: any,
  req: any,
  res: any
): Promise<Product> => {
  const result = await prisma.product.create({
    data: {
      user: { connect: { id: data.userId } },
      name: data.name,
      description: data.description,
      category: { connect: { name: data.category } },
      photos: data.photos,
      price: data.price,
    },
  });
  upload(req, res, function (err: any) {
    if (err) {
      console.log(err);
      return "pao";
    }
    console.log("done upload---");
  });

  return result;
};

export const getProductsByCategoryPaginated = async (
  category: string,
  skip: number,
  take: number = 6
): Promise<Product[]> => {
  const cat = await prisma.category.findUnique({
    where: {
      name: category,
    },
  });
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
    let prods: Product[] = [];
    cats.forEach((e) => e.products.forEach((prod) => prods.push(prod)));
    prods = prods.slice(skip, skip + take);
    return prods;
  }
  throw new Error("category not found");
};

export const getAllProductsPaginated = async (
  skip: number,
  take: number = 6
): Promise<Product[]> => {
  return prisma.product.findMany({ skip, take });
};

export const getProductsByUserId = async (
  userId: number
): Promise<Product[]> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { products: true },
  });
  if (user) {
    return user.products;
  }
  throw new Error("User does not exist");
};

export const getSoldProductStatsByUserId = async (
  userId: number
): Promise<{ num: number; sum: number }> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { products: true },
  });
  const orders = await prisma.order.findMany({
    include: { productInOrder: true },
  });
  if (orders && user) {
    let num = 0;
    let sum = 0;
    orders.forEach((order: any) => {
      order.productInOrder.forEach((prod: any) => {
        user.products.forEach((p: any) => {
          console.log(p);
          console.log(prod);
          if (p.id === prod.productId) {
            num++;
            sum += Number(prod.price);
          }
        });
      });
    });
    return { num, sum };
  }
  throw new Error("User does not exist");
};

//////////////////////////////////////////////////////////
//called in get product by id
const getRandomProduct = async (num: number): Promise<Product | Product[]> => {
  try {
    const product = await prisma.product.findMany({
      orderBy: { id: "desc" },
      take: 1,
    });

    if (num === 1) {
      const randomId = Math.floor(Math.random() * product[0].id) + 1;
      const randomProduct = await prisma.product.findUnique({
        where: { id: randomId },
      });
      if (randomProduct) {
        return randomProduct;
      }
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
  } catch (e) {
    throw Error("unexpected error");
    console.log(e);
  }
};

const getLatestProducts = async (
  skip: number,
  take: number
): Promise<Product[]> => {
  const prodList = await prisma.product.findMany({
    skip,
    take,
    orderBy: { uploadDate: "desc" },
  });
  if (prodList) {
    return prodList;
  }
  throw new Error("Something went wrong with database products fetch");
};

//////////////////////////////////////////////////////////

export const patchProduct = async (
  id: number,
  obj: ProdUpdateData
): Promise<Product> => {
  const before = await prisma.product.findUnique({
    where: { id: id },
  });
  if (!before) {
    throw new Error("Product not found");
  }

  return await prisma.product.update({
    where: { id: id },
    data: {
      name: !obj.name ? before.name : obj.name,
      description: !obj.description ? before.description : obj.description,
      photos: !obj.photos ? before.photos : obj.photos,
      price: !obj.price ? before.price : obj.price,
      user: { connect: { id: !obj.userId ? before.userId : obj.userId } },
      category: {
        connect: {
          name: !obj.category ? before.categoryName : obj.category,
        },
      },
    },
  });
};
