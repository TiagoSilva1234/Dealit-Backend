import { getUserOrdersById } from "../../infrastructure/orders-repository";

export default async (userId: number) => await getUserOrdersById(userId);
