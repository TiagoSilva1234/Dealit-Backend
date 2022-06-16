import { Order } from "@prisma/client";
import { postOrder } from "../../infrastructure/orders-repository";

export default async (data: Order, prods: number[]): Promise<Order> =>
  await postOrder(data, prods);
