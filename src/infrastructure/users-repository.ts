import { Address, CreditCard, Order, PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import { UserData, UserUpdateData } from "../types";
const prisma = new PrismaClient();

export const getUserById = async (
  id: string
): Promise<{
  id: number;
  username: string;
  email: string;
  phone: string;
  orders: Order[];
  addresses: Address[];
  creditCards: CreditCard[];
}> => {
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
export const getAllUsers = async ()=>{
  const users = await prisma.user.findMany({
    orderBy:{id: "asc"}
  });

  return users
}

export const saveUser = async (data: UserData): Promise<UserData> => {
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
  if (!data.token) throw new Error("Something went wrong with JWT creation");
  if (data.creditCard && data.creditCard?.isFavorite) {
    const user = await prisma.user.create({
      data: {
        username: data.username,
        addresses: { create: data.address },
        email: data.email,
        password: data.password,
        phone: data.phone,
        token: data.token,
        //@ts-ignore
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

export const login = async (
  email: string,
  password: string
): Promise<{
  id: number;
  username: string;
  email: string;
  phone: string;
  token: string;
}> => {
  const user = await prisma.user.findUnique({ where: { email: email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    let secret: Secret;
    let token: string;

    if (process.env.TOKEN_KEY) {
      secret = process.env.TOKEN_KEY;

      token = jwt.sign(
        { userID: user.id, username: user.username, email },
        secret,
        {
          expiresIn: "2h",
        }
      );
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

export const patchUser = async (
  id: number,
  obj: UserUpdateData
): Promise<User> => {
  const before = await prisma.user.findUnique({
    where: { id: id },
  });
  if (!before) throw new Error("User not found");

  if (obj.oldPassword && obj.newPassword) {
    if (bcrypt.compareSync(obj.oldPassword, before.password)) {
      obj.password = bcrypt.hashSync(obj.newPassword, 10);
    } else {
      throw new Error("Old passwords do not match");
    }
  }
  return await prisma.user.update({
    where: { id: id },
    data: {
      username: !obj.username ? before.username : obj.username,
      email: !obj.email ? before.email : obj.email,
      phone: !obj.phone ? before.phone : obj.phone,
      password: !obj.password ? before.password : obj.password,
    },
  });
};
