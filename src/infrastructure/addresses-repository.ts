import { Address, PrismaClient } from "@prisma/client";

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

export const setAdressFavorite = async (
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
