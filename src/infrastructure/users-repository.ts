import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserById = async (id: string) => {
  if (isNaN(Number(id))) {
    throw new Error("Wrong id format");
  }
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (user === null) {
    throw new Error("User not found");
  }
  return user;
};

export const saveUser = async (data: any) => {
  const user = await prisma.user.create({
    data: {
      username: data.username,
      addresses: { create: data.address },
      email: data.email,
      password: data.password,
      phone: data.phone,
      creditCards: { create: data.creditCard },
    },
  });
  return user;
};
