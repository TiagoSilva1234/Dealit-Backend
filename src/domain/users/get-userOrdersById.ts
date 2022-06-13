import { getUserOrdersById } from "../../infrastructure/users-repository";

export default async (userId: number) => await getUserOrdersById(userId);
