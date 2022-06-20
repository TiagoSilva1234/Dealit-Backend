import { Address, CreditCard, Order } from "@prisma/client";
import { getUserByToken } from "../../infrastructure/users-repository";

export default async (
  username: string
): Promise<{
  id: number;
  username: string;
  email: string;
  phone: string;
  addresses: Address[];
  creditCards: CreditCard[];
  orders: Order[];  
}> => await getUserByToken(username);
