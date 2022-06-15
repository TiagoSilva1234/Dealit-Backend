import { setCreditCardFavorite } from "../../infrastructure/creditCards-repository";

export default async (id: number) => await setCreditCardFavorite(id);
