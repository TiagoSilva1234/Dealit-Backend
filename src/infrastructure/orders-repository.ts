import  prisma  from "../../client";
import { Order, Product } from "@prisma/client";

export const getOrdersByUserId = async (userId: number): Promise<Order[]> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { orders: true },
  });
  if (user) {
    return user.orders;
  }
  throw new Error("User does not exist");
};

export const postOrder = async (data: Order, arr: number[]): Promise<Order> => {
  const order = await prisma.order.create({
    data: {
      buyDate: data.buyDate,
      sendDate: data.sendDate,
      deliveryDate: data.deliveryDate,
      user: { connect: { id: data.userId } },
      sellerName: data.sellerName,
      creditCard: { connect: { id: data.creditCardId } },
    },
  });
  arr.map(async (e) => {
    await prisma.productsOrders.create({
      data: {
        productId: e,
        orderId: order.id,
      },
    });
  });

  return order;
};

export const patchOrderSendDate = async (
  id: number,
  data: { sendDate: Date }
): Promise<Order> => {
  const order = await prisma.order.update({
    where: {
      id: id,
    },
    data: {
      sendDate: data.sendDate,
    },
  });
  return order;
};

export const patchOrderDeliveryDate = async (
  id: number,
  data: { deliveryDate: Date }
): Promise<Order> => {
  const order = await prisma.order.update({
    where: {
      id: id,
    },
    data: {
      deliveryDate: data.deliveryDate,
    },
  });
  return order;
};
