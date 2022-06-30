import  prisma  from "../../client";
import {Product} from '@prisma/client'
import { ProductData, ProdUpdateData } from "../utils/types";
const multer = require("multer");
const fs = require("fs")
const path = require("path")
;
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

export const saveProduct = async (req:any,res:any,data: ProductData,files:any): Promise<Product> => {

  const result = await prisma.product.create({
    data: {
      user: { connect: { id: data.userId } },
      name: data.name,
      description: data.description,
      category: { connect: { name: data.category } },
      photos: [],
      price: data.price,
    },
  });
  let counter = 0;
  var storage = await multer.diskStorage({
        destination: function (req:any, file:any, cb:any) {
      console.log("testing")
     fs.mkdirSync(path.join(__dirname, 'public')+`/${data.userId}`,{recursive:true})
     fs.mkdirSync(path.join(__dirname, 'public')+`/${data.userId}/${result.id}`,{recursive:true})
          cb(null, path.join(__dirname, 'public')+`/${req.body.userId}/${result.id}`)
        },
        filename: function (req:any, file:any, cb:any) {
          console.log("why am i here")
          counter = counter+1;
          cb(null, counter + ".png")
        }
      })

  var upload = multer({ storage:storage }).array("photos")
 await upload(req,res,function(err:any) {
  console.log("heyo")
    if(err) {
      console.log(err)
        return "teste"
    }
    console.log("done upload---")
    res.json({"status":"completed"});
}); 

  counter = 0;

/*   let length = 0;
  fs.readdir(path.join(__dirname, 'public'),(err:Error,files:any)=>{
length = files.length;
  })
  const idk = []
  for(let i = 1;i<length;i++){
    idk.push(`https://dealit-backend.herokuapp.com/dealit/api/static/${result.userId}/${i}.png`)
  }
  const update = await prisma.product.update({
    where:{ id:result.id},
    data:{
      photos:idk
    }
  }) */
  return result
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

//////////////////////////////////////////////////////////
//called in get product by id
const getRandomProduct = async (num: number): Promise<Product | Product[]> => {
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
