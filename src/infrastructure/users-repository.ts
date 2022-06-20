import { Address, CreditCard, Order, PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import { UserData, UserUpdateData } from "../utils/types";
const prisma = new PrismaClient();

export const getUserById = async (
  id: string
): Promise<{
  id: number;
  username: string;
  email: string;
  phone: string;
  address: { country: string; city: string };
}> => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      addresses: true,
    },
  });
  if (user === null) {
    throw new Error("User does not exist");
  }
  const favAdd = user.addresses.filter((e) => e.isFavorite)[0];
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    phone: user.phone,
    address: { country: favAdd.country, city: favAdd.city },
  };
};

export const getUserByToken = async (
  username: string
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
      username: username,
    },
    include: {
      addresses: true,
      creditCards: true,
      orders: true,
    },
  });

  if (!user) {
    throw new Error("User does not exist");
  }
  return user;
};

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    orderBy: { id: "asc" },
    include: {},
  });

  return users.map((user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
    phone: user.phone,
  }));
};

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
      { username: data.username, email: data.email },
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
  photo: string;
}> => {
  const user = await prisma.user.findUnique({ where: { email: email } });

  if (user && bcrypt.compareSync(password, user.password)) {
    let secret: Secret;
    let token: string;

    if (process.env.TOKEN_KEY) {
      secret = process.env.TOKEN_KEY;

      token = jwt.sign({ username: user.username, email }, secret, {
        expiresIn: "2h",
      });
      const newUser = await prisma.user.update({
        where: { id: user.id },
        data: { token: token },
      });
      return {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        token: newUser.token,
        photo: newUser.photo,
      };
    }
    throw new Error("token secret not found");
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
      obj.pws = bcrypt.hashSync(obj.newPassword, 10);
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
      password: !obj.pws ? before.password : obj.pws,
      photo: !obj.photo ? before.photo : obj.photo,
    },
  });
};
