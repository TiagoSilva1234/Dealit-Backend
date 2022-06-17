import { Address } from "@prisma/client";
import { getAddressesByUserId } from "../../infrastructure/addresses-repository";

export default async (userId: number): Promise<Address[]> =>
  await getAddressesByUserId(userId);
