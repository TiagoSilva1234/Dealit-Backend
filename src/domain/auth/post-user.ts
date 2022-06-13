import { saveUser } from "../../infrastructure/users-repository";
import {UserData} from "../../types"


export default async (data: UserData) => {
  return saveUser(data);
};
