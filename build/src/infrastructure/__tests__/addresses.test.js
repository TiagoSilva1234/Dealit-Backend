"use strict";
const aFindUnique = jest.fn();
const aUpdatemany = jest.fn();
const pCreate = jest.fn();
const pUpdate = jest.fn();
const cFindUnique = jest.fn();
const cFindMany = jest.fn();
const uFindUnique = jest.fn();
/*


const {
   getProductById,
   saveProduct,
   getProductsByCategoryPaginated,
   getAllProductsPaginated,
   getProductsByUserId,
   patchProduct
 } = require("../products-repository");
 import prisma from "../../../client";
 const { PrismaClient } = require("@prisma/client");
 
 jest.mock("@prisma/client", () => {
   return {
     PrismaClient: function () {
       return {
         address: {
           findUnique: pFindUnique,
           findMany: pFindMany,
           create: pCreate,
           updateMany: aUpdateMany,
         },
         category: {
           findUnique: cFindUnique,
           findMany: cFindMany,
         },
         user:{
           findUnique: uFindUnique,
         }
       };
     },
   };
 });
 describe("Products infrastructure", () => {
   describe("get products by id ", () => {
     afterEach(() => {
       jest.clearAllMocks();
     });
 
     it("should return crud query as supposed", async () => {
       const id = "2";
       pFindUnique.mockResolvedValueOnce(`returned product with id: ${id}`);
       const res = await getProductById(id);
 
       expect(res).toStrictEqual("returned product with id: 2");
       expect(prisma.product.findUnique).toHaveBeenCalledTimes(1);
     });
 
     it("should return three random products", async () => {
       const id = "random";
       pFindUnique.mockResolvedValue({ id: 2 });
       pFindMany.mockResolvedValueOnce([{ id: 2 }]);
 
       const res = await getProductById(id, 0, 5);
 
       expect(res).toStrictEqual([
         { id: 2 },
         { id: 2 },
         { id: 2 },
         { id: 2 },
         { id: 2 },
       ]);
       expect(prisma.product.findUnique).toHaveBeenCalledTimes(5);
       expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
     });
     it("should return a single random", async () => {
       pFindUnique.mockResolvedValueOnce("Product found");
       pFindMany.mockResolvedValueOnce([{ id: 5 }]);
       const id = "random";
       const res = await getProductById(id, 1, 1);
 
       expect(res).toStrictEqual("Product found");
       expect(prisma.product.findUnique).toHaveBeenCalledTimes(1);
       expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
     });
     it("should return latest products", async () => {
       const id = "latest";
       pFindMany.mockResolvedValueOnce("Latest Products");
       const res = await getProductById(id, 1, 1);
       expect(res).toStrictEqual("Latest Products");
       expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
     });
     it("should return error on latest", async () => {
       const id = "latest";
       pFindMany.mockResolvedValueOnce(undefined);
 
       expect(getProductById(id, 1, 1)).rejects.toThrow();
       expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
     });
 
     it("should return error", async () => {
       const id = "2";
       pFindUnique.mockResolvedValueOnce(null);
 
       expect(async () => {
         await getProductById(id);
       }).rejects.toThrow(new Error("Product does not exist"));
       expect(prisma.product.findUnique).toHaveBeenCalledTimes(1);
     });
   });
 
 });
  */ 
