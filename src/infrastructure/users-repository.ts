import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";

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
  const oldUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (oldUser) {
    throw new Error("User Already Exists. Please Login");
  }

  data.password = bcrypt.hashSync(data.password, 10);
  let secret: Secret;

  if (process.env.TOKEN_KEY) {
    secret = process.env.TOKEN_KEY;

    data.token = jwt.sign(
      { user_id: data.username, email: data.email },
      secret,
      {
        expiresIn: "2h",
      }
    );
  }
  if (data.creditCard) {
    const user = await prisma.user.create({
      data: {
        username: data.username,
        addresses: { create: data.address },
        email: data.email,
        password: data.password,
        phone: data.phone,
        token: data.token,
        creditCards: { create: data.creditCard },
      },
    });
    data.password = "********";
    return data;
  }
  const user = await prisma.user.create({
    data: {
      username: data.username,
      addresses: { create: data.address },
      email: data.email,
      password: data.password,
      phone: data.phone,
      token: data.token,
    },
  });
  data.password = "********";
  return data;
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email: email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    let secret: Secret;
    let token: string;

    if (process.env.TOKEN_KEY) {
      secret = process.env.TOKEN_KEY;

      token = jwt.sign({ user_id: user.username, email }, secret, {
        expiresIn: "2h",
      });
      user.token = token;
    }
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      token: user.token,
    };
  }
  throw new Error("Invalid credentials");
};

export const getUserOrdersById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { orders: true },
  });
  if (user) {
    return user.orders;
  }
  throw new Error("User does not exist");
};
