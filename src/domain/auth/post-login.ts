import { login } from "../../infrastructure/users-repository";

export default async (email: string, password: string) => {
  return login(email, password);
};
