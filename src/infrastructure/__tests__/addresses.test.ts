const aFindUnique = jest.fn();
const aUpdateMany = jest.fn();
const aCreate = jest.fn();
const aUpdate = jest.fn()
const cFindUnique = jest.fn();
const cFindMany = jest.fn();
const uFindUnique = jest.fn();

 
 
 
 
 const {
  getAddressesByUserId,
  } = require("../addresses-repository");
  import prisma from "../../../client";
  const { PrismaClient } = require("@prisma/client");
  
  jest.mock("@prisma/client", () => {
    return {
      PrismaClient: function () {
        return {
          address: {
            findUnique: aFindUnique,
            create: aCreate,
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
/*         const id = "2";
        uFindUnique.mockResolvedValueOnce(`returned product with id: ${id}`);
        const res = await getAddressesByUserId(id);
  
        expect(res).toStrictEqual("returned product with id: 2");
        expect(prisma.product.findUnique).toHaveBeenCalledTimes(1); */
      });
  
     
    });
  
  });
   