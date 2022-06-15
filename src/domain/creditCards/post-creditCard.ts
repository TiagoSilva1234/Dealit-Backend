import { CreditCard } from "@prisma/client";
import { postCreditCard } from "../../infrastructure/creditCards-repository";
export default async (data:CreditCard) => await postCreditCard(data);
