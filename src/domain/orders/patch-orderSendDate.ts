import { Order } from "@prisma/client";
import { patchOrderSendDate } from "../../infrastructure/orders-repository";

export default async (id:number,data:{sendDate: Date}): Promise<Order> => await patchOrderSendDate(id,data);
