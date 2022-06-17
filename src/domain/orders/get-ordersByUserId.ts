import { Order } from "@prisma/client";
import { getUserOrdersById } from "../../infrastructure/orders-repository";

export default async (userId: number): Promise<Order[]> =>
  await getUserOrdersById(userId);
