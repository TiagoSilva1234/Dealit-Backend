import { CreditCard } from "@prisma/client";
import { postCreditCard } from "../../infrastructure/creditCards-repository";

export default async (data: CreditCard): Promise<CreditCard> =>
  await postCreditCard(data);
