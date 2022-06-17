import { Address, CreditCard, User } from "@prisma/client";
import { getAllUsers } from "../../infrastructure/users-repository";

export default async (): Promise<{
    id: number;
    username: string;
    email: string;
    phone: string;
    address: Address;
    creditCard: CreditCard;
}[]> => await getAllUsers();
