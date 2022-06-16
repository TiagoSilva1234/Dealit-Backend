import { Order } from "@prisma/client";
import { patchOrderDeliveryDate } from "../../infrastructure/orders-repository";

export default async (
  id: number,
  data: { deliveryDate: Date }
): Promise<Order> => await patchOrderDeliveryDate(id, data);
