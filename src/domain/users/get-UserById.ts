import { Address, CreditCard, Order } from "@prisma/client";
import { getUserById } from "../../infrastructure/users-repository";

export default async (id: string): Promise<{
    id: number;
    username: string;
    email: string;
    phone: string;
    orders: Order[];
    addresses: Address[];
    creditCards: CreditCard[];
  }> => await getUserById(id);
