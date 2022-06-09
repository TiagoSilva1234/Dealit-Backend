import { getUserById } from "../../infrastructure/users-repository";

export default async (id: string) => await getUserById(id);
