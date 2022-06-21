
import { getAdressAutocomplete } from "../../infrastructure/addresses-repository";

export default async (text:string): Promise<any> =>
  await getAdressAutocomplete(text);
