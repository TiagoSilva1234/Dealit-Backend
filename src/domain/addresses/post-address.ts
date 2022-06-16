import { Address } from "@prisma/client";
import { postAddress } from "../../infrastructure/addresses-repository";

export default async (data: Address): Promise<Address> =>
  await postAddress(data);
