
import { patchOrderDeliveryDate } from "../../infrastructure/orders-repository";
export default async (id:number,data:{deliveryDate: Date}) => await patchOrderDeliveryDate(id,data);
