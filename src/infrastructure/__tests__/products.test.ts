const { getProductById } = require("../products-repository");
import prisma  from "../../../client"

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
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should return crud query as supposed", async () => {
      const id = "2";
      const recieved = { where: { id: Number(id) } };
      
      const res = await getProductById(id);
      expect(res).toStrictEqual("Product found");
    
      expect(prisma.product.findUnique).toHaveBeenCalledTimes(1)
    });
  });
});
