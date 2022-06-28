const {getProductById} = require("../products-repository")
const {PrismaClient} = require( "@prisma/client")
import { mockDeep } from 'jest-mock-extended';

jest.mock('@prisma/client', () => ({
  PrismaClient: function (){
    return ({
     product: ({ findUnique:jest.fn().mockImplementation()
    })
  }
)}
})
);
describe("Products infrastructure",()=>{

  describe("get products by id ",()=>{
/*
    it("should return crud query as supposed",async ()=>{
    
      const id = "1"
      const recieved={where: {id: Number(id)}}
      const res =await getProductById(id)
   
 expect(PrismaClient().product.findUnique()).resolves.toHaveBeenCalledTimes(1)
   

    })
     */
  })
}) 

