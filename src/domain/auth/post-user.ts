import { UserData } from "../../utils/types";
import { saveUser } from "../../infrastructure/users-repository";

export default async (data: UserData): Promise<UserData> => {
  return saveUser(data);
};
