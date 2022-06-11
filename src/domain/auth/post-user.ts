import { saveUser } from "../../infrastructure/users-repository";

export default async (data: any) => {
  return saveUser(data);
};
