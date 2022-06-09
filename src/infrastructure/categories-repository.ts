import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCategoryByMainCat = async (mainCat?: string) => {
  const main = await prisma.category.findUnique({
    where: {
      name: mainCat,
    },
  });
  if(main !== null && main.level === 2 && main.upperLevel !== null){
    const actualMain = await prisma.category.findUnique({
     where: {
        name: main.upperLevel 
      }
    })
    return {main: actualMain,subcategory:main}
  }
  const subcategories = await prisma.category.findMany({
    where: {
      upperLevel: mainCat,
    },
  });
  return { main: main, subcategories };
};


export const getAllMainCategories = async ()=>{

  const main = await prisma.category.findMany({
    where:{
      level: 1
    }
  })
  return main;
}