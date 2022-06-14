import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Order,Product } from "@prisma/client";

export const getUserOrdersById = async (userId: number) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { orders: true },
    });
    if (user) {
      return user.orders;
    }
    throw new Error("User does not exist");
  };
  


  export const postOrder = async (data:Order,arr:number[]) => {
  

const user = await prisma.order.create({
  data:{
    buyDate: data.buyDate,
    sendDate: data.sendDate,
    deliveryDate: data.deliveryDate, 
    userId: data.userId,
    sellerName: data.sellerName, 
    creditCardId: data.creditCardId,
  }
})
arr.map(async e=>{
  await prisma.productsOrders.create({
    data:{
      productId: e,
      orderId:user.id
    }
  })
})

return user

  }