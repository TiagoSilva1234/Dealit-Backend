import { Address } from "@prisma/client";
import { setAddressFavorite } from "../../infrastructure/addresses-repository";

export default async (addressId: number): Promise<Address> =>
  await setAddressFavorite(addressId);
