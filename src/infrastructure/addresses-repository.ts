import { Address, PrismaClient } from "@prisma/client";
import axios from "axios";
const prisma = new PrismaClient();

export const getAddressesByUserId = async (
  userId: number
): Promise<Address[]> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { addresses: true },
  });
  if (user) {
    return user.addresses;
  }
  throw new Error("User does not exist");
};

export const postAddress = async (data: Address): Promise<Address> => {
  if (data.isFavorite) {
    await prisma.address.updateMany({
      where: { userId: data.userId },
      data: {
        isFavorite: false,
      },
    });
  }

  const order = await prisma.address.create({
    data: {
      country: data.country,
      city: data.city,
      zipCode: data.zipCode,
      street: data.street,
      houseNumber: data.houseNumber,
      isFavorite: data.isFavorite || false,
      user: { connect: { id: data.userId } },
    },
  });
  return order;
};

export const setAddressFavorite = async (
  addressId: number
): Promise<Address> => {
  const address = await prisma.address.findUnique({
    where: {
      id: addressId,
    },
  });
  if (address) {
    await prisma.address.updateMany({
      where: {
        isFavorite: true,
        userId: address.userId,
      },
      data: { isFavorite: false },
    });
  }
  const updated = await prisma.address.update({
    where: {
      id: addressId,
    },
    data: { isFavorite: true },
  });

  return updated;
};

export const getAddressAutocomplete = async (text: string): Promise<any> => {
  const env = process.env.ADRRESS_API_KEY;
  let response = await axios
    .get(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=${env}`
    )
    .then((res) => res.data);
  return response;
};
