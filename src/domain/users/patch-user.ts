import { patchUser } from "../../infrastructure/users-repository";

export default async (id:number, data: any) => await patchUser(id, data);
