import prisma from "../../client";
import { Order, Product } from "@prisma/client";
import { ProductInOrderData } from "../utils/types";

export const getOrdersByUserId = async (userId: number): Promise<any[]> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { orders: true },
  });
  if (user) {
    const orders = Promise.all(
      user.orders.map(
        async (order: any) =>
          await prisma.order.findUnique({
            where: { id: order.id },
            include: { productInOrder: true },
          })
      )
    );
    console.log(orders);
    return orders;
  }
  throw new Error("User does not exist");
};

export const postOrder = async (
  data: Order,
  arr: ProductInOrderData[],
  total: number
): Promise<Order> => {
  const order = await prisma.order.create({
    data: {
      buyDate: data.buyDate,
      user: { connect: { id: data.userId } },
      creditCard: { connect: { id: data.creditCardId } },
      total,
    },
  });
  arr.map(async (e) => {
    await prisma.productInOrder.create({
      data: {
        product: { connect: { id: e.productId } },
        order: { connect: { id: order.id } },
        quantity: e.quantity,
        price: e.price,
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
