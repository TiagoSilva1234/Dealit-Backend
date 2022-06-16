import { login } from "../../infrastructure/users-repository";

export default async (
  email: string,
  password: string
): Promise<{
  id: number;
  username: string;
  email: string;
  phone: string;
  token: string;
}> => {
  return login(email, password);
};
