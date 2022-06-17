import { CreditCard } from "@prisma/client";
import { setCreditCardFavorite } from "../../infrastructure/creditCards-repository";

export default async (id: number): Promise<CreditCard> =>
  await setCreditCardFavorite(id);
