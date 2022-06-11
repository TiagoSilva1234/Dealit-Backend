import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      orders: true,
      addresses: true,
      creditCards: true,
    },
  });
  if (user === null) {
    throw new Error("User does not exist");
  }
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    orders: user.orders,
    addresses: user.addresses,
    creditCards: user.creditCards,
  };
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
