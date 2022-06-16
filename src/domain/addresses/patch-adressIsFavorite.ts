import { Address } from "@prisma/client";
import { setAdressFavorite } from "../../infrastructure/addresses-repository";

export default async (addressId: number): Promise<Address> =>
  await setAdressFavorite(addressId);
