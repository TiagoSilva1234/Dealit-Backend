
import { getAddressAutocomplete } from "../../infrastructure/addresses-repository";

export default async (text:string): Promise<any> =>
  await getAddressAutocomplete(text);
