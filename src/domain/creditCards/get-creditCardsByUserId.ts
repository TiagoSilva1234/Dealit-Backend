import { CreditCard } from "@prisma/client";
import { getCreditCardsByUserId } from "../../infrastructure/creditCards-repository";

export default async (userId: number): Promise<CreditCard[]> =>
  await getCreditCardsByUserId(userId);
