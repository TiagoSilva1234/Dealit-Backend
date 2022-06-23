const {getProductById} = require("../products-repository")
const {PrismaClient} = require("@prisma/client")
import { MockContext, Context, createMockContext } from '../../../context'
import { prismaMock } from '../../../singleton'
let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
  mockCtx = createMockContext()
  ctx = mockCtx as unknown as Context
})


describe("Products infrastructure",()=>{
    
  describe("get products by id",()=>{
    it("test",async ()=>{

 await  getProductById("0",1,2)
 //prismaMock.product.findUnique.mockResolvedValue()
    expect(prismaMock.product.findUnique).toHaveBeenNthCalledWith(1,{
      where: {
        id: Number(0),
      },
    })


    })
  })


}) 

