import { Order } from "@prisma/client";
import { getOrdersByUserId } from "../../infrastructure/orders-repository";

export default async (userId: number): Promise<Order[]> =>
  await getOrdersByUserId(userId);
