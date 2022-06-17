import { User } from "@prisma/client";
import { getAllUsers } from "../../infrastructure/users-repository";

export default async (): Promise<User[]> => await getAllUsers();
