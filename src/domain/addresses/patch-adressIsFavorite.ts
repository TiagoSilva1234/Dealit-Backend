
import { setAdressFavorite } from "../../infrastructure/addresses-repository";
export default async (addressId: number) => await setAdressFavorite(addressId);
