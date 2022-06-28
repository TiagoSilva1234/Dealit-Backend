const pFindUnique =  jest.fn()
const pFindMany = jest.fn()
const pCreate = jest.fn()
const cFindUnique =  jest.fn()
const cFindMany = jest.fn()

const { getProductById,saveProduct,getProductsByCategoryPaginated } = require("../products-repository");
import prisma  from "../../../client"
const {PrismaClient} = require("@prisma/client")


jest.mock("@prisma/client", () => {

  return {
    PrismaClient: function  () {
      return {
        product: {
          findUnique:  pFindUnique,
          findMany: pFindMany,
          create: pCreate,
        },
        category:{
          findUnique: cFindUnique ,
          findMany: cFindMany,
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
      pFindUnique.mockResolvedValueOnce(`returned product with id: ${id}`)
      const res = await getProductById(id);

 
      expect(res).toStrictEqual("returned product with id: 2");
      expect(prisma.product.findUnique).toHaveBeenCalledTimes(1);
    
    });

     it("should return three random products", async () => {
      const id = "random";
      pFindUnique.mockResolvedValue({id:1})
      pFindMany.mockResolvedValueOnce([{id:5}])
      const res = await getProductById(id,0,3);

      expect(res).toStrictEqual([{id:1},{id:1},{id:1}]);
      expect(prisma.product.findUnique).toHaveBeenCalledTimes(3);
      expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
      
    });
     it("should return a single random", async () => {
      pFindUnique.mockResolvedValueOnce("Product found")
      pFindMany.mockResolvedValueOnce([{id:5}])     
      const id = "random";
      const res = await getProductById(id,1,1);
   
      expect(res).toStrictEqual("Product found");
      expect(prisma.product.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
      
    });
    it("should return latest products", async () => {
      const id = "latest";
      pFindUnique.mockResolvedValueOnce("Product found")
      pFindMany.mockResolvedValueOnce([{id:5}])  
      const res = await getProductById(id,1,1);
      expect(res).toStrictEqual("Found products");
      expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
      
    });

  }); 
  describe("post Product ", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return created with success", async () => {
      pCreate.mockResolvedValueOnce("created with success")
      const res = await saveProduct({});

      expect(res).toStrictEqual("created with success");
      expect(prisma.product.create).toHaveBeenCalledTimes(1);
    
    });
  });
    describe("get Products by Category Paginated ", () => {
      afterEach(() => {
        jest.clearAllMocks();
      });
      it("should return created with success", async () => {
          cFindUnique.mockResolvedValueOnce({name:"pao",level:2})
          pFindMany.mockResolvedValueOnce("cool")
        const res = await getProductsByCategoryPaginated("pao",2);
  
        expect(res).toStrictEqual("cool");
        expect(prisma.product.findMany).toHaveBeenCalledTimes(1);
      
      });
 
  
  });
});
