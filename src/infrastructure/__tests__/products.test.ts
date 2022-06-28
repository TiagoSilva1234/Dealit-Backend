const { getProductById } = require("../products-repository");
import prisma  from "../../../client"
const {PrismaClient} = require("@prisma/client")
jest.mock("@prisma/client", () => {
  return {
    PrismaClient: function () {
      return {
        product: {
          findUnique: jest.fn( ()=>Promise.resolve("Product found")),
          findMany: jest.fn( ()=>Promise.resolve("Found products")),
          create: jest.fn( ()=>Promise.resolve("created with success")),
        },
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
      const res = await getProductById(id);

      expect(res).toStrictEqual("Product found");
      expect(prisma.product.findUnique).toHaveBeenCalledTimes(1);
    
    });

    it("should return three random products", async () => {
      const id = "random";
      const res = await getProductById(id,1,3);

      expect(res).toStrictEqual(["Product found","Product found","Product found"]);
      expect(prisma.product.findUnique).toHaveBeenCalledTimes(3);
      expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
      
    });
    it("should return a single random", async () => {
      const id = "random";
      const res = await getProductById(id,1,1);
      expect(res).toStrictEqual("Product found");
      expect(prisma.product.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
      
    });
    it("should return a single random", async () => {
      const id = "random";

      
    });
  
  });
});
