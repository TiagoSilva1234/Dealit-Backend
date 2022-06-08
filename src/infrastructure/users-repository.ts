import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserById = async (id: string) => {
  if (isNaN(Number(id))) {
    return "sowy wrong id format";
  }
  try {
    const v = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    return v === null ? "Id not found" : v;
  } catch (e) {
    console.log(e);
  }
};

export const saveUser = (data: any) => {
  const addUser = async () => {
    const createUser = await prisma.user.create({
      data: {
        username: data.username,
        addresses: data.addresses,
        email: data.email,
        password: data.password,
        phone: data.phone,
        creditCards: data.creditCard,
      },
    });
  };
  addUser()
    .catch((err) => console.log(err.message))
    .finally(async () => {
      await prisma.$disconnect();
    });
};
