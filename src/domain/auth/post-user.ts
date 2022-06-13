import { saveUser } from "../../infrastructure/users-repository";
import {UserWithCard} from "../../types"


export default async (data: UserWithCard) => {
  return saveUser(data);
};
