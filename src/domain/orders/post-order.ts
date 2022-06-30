import { Order } from "@prisma/client";
import { postOrder } from "../../infrastructure/orders-repository";
import { ProductInOrderData } from "../../utils/types";

export default async (
  data: Order,
  prods: ProductInOrderData[]
): Promise<Order> => {
  let total: number = 0;
  prods.forEach((e: ProductInOrderData) => {
    total += Number(e.quantity) * Number(e.price);
  });
  return await postOrder(data, prods, total);
};
