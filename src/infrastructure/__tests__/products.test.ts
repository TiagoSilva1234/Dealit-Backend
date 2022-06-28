const pFindUnique = jest.fn();
const pFindMany = jest.fn();
const pCreate = jest.fn();
const pUpdate = jest.fn()
const cFindUnique = jest.fn();
const cFindMany = jest.fn();
const uFindUnique = jest.fn();

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
        product: {
          findUnique: pFindUnique,
          findMany: pFindMany,
          create: pCreate,
          update: pUpdate,
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
  describe("post Product ", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return created with success", async () => {
      pCreate.mockResolvedValueOnce("created with success");
      const res = await saveProduct({});

      expect(res).toStrictEqual("created with success");
      expect(prisma.product.create).toHaveBeenCalledTimes(1);
    });
  });
  describe("get Products by Category Paginated ", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return products paginaged if level 2", async () => {
      cFindUnique.mockResolvedValueOnce({ name: "pao", level: 2 });
      pFindMany.mockResolvedValueOnce("cool");
      const res = await getProductsByCategoryPaginated("pao", 2);

      expect(res).toStrictEqual("cool");
      expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
    });
    it("should return products paginaged if level 1", async () => {
      cFindUnique.mockResolvedValueOnce({ name: "pao", level: 1 });
      cFindMany.mockResolvedValueOnce([
        { products: ["teste", "teste1", "teste2"] },
      ]);
      const res = await getProductsByCategoryPaginated("pao", 1);

      expect(res).toStrictEqual(["teste1", "teste2"]);
      expect(prisma.category.findMany).toHaveBeenCalledTimes(1);
    });
    it("should return category not found", async () => {
      cFindUnique.mockResolvedValueOnce(null);

      expect(async () => { await getProductsByCategoryPaginated("pao", 1) }).rejects.toThrow(new Error("category not found"));

      expect(prisma.category.findUnique).toHaveBeenCalledTimes(1);
    });
  });
  describe("get all products paginated ", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return prods paginated", async () => {

      pFindMany.mockResolvedValueOnce(["1","2"]);
      const res = await getAllProductsPaginated(1,2);

      expect(res).toStrictEqual(["1","2"]);
      expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
    });

  });
  
  describe("get products by user Id", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return prods paginated", async () => {

      uFindUnique.mockResolvedValueOnce({products:"cool"});
      const res = await getProductsByUserId(1)

      expect(res).toStrictEqual("cool");
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    });
    it("should return error", async () => {

      uFindUnique.mockResolvedValueOnce(null);

      expect(async () => { await getProductsByUserId(1) }).rejects.toThrow(new Error("User does not exist"))
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    });

  });
    
  describe("patch products", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return prods paginated", async () => {

      pFindUnique.mockResolvedValueOnce("prod");
      pUpdate.mockResolvedValueOnce("updated")
      const res = await patchProduct(1,{name:"pao"})

      expect(res).toStrictEqual("updated");
      expect(prisma.product.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.product.update).toHaveBeenCalledTimes(1);
    });
    it("should return error", async () => {
      pFindUnique.mockResolvedValueOnce(null);

      expect(async () => { await patchProduct(1) }).rejects.toThrow(new Error("Product not found"))
      expect(prisma.product.findUnique).toHaveBeenCalledTimes(1);
    });

  });
});
