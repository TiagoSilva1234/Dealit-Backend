import { Address, CreditCard } from "@prisma/client";
import { getUserById } from "../../infrastructure/users-repository";

export default async (
  id: string
): Promise<{
  id: number;
  username: string;
  email: string;
  phone: string;
  address: Address;
  creditCard: CreditCard;
}> => await getUserById(id);
