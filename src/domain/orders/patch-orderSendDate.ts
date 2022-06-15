
import { patchOrderSendDate } from "../../infrastructure/orders-repository";
export default async (id:number,data:{sendDate: Date}) => await patchOrderSendDate(id,data);
