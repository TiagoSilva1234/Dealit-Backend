import { Address, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postAddress = async (data: Address) => {

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
      isFavorite: data.isFavorite,
      userId: data.userId,
    },
  });
  return order;
};

export const setAdressFavorite = async(addressId:number)=>{
 
  const adres = await prisma.address.findUnique({
    where : {
      id : addressId
    }
  })
  if(adres){
   const cards = await prisma.address.updateMany({
where:{
   isFavorite:true,
   userId:adres.userId,
},
data:{isFavorite: false}

   });
  }
   const updated = await prisma.address.update({
     where:{ 
       id:addressId,
     },
     data:{isFavorite:true}
   })

  return updated
 
}
