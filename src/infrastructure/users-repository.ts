import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserById = async (id: string) => {
  if (isNaN(Number(id))) {
    return "Wrong id format";
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    return user === null ? "User not found" : user;
  } catch (e) {
    console.log(e);
  }
};

export const saveUser = async (data: any) => {
    try{
  const user = await prisma.user.create({
    data: {
      username: data.username,
      addresses: {create: data.address},
      email: data.email,
      password: data.password,
      phone: data.phone,
      creditCards: {create: data.creditCard},
    },
  });
    } catch (e) {
        console.log(e);
    }
};
