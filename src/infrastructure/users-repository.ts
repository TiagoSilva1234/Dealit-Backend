import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export const getUserById = async(id: string)=>{
   

if(isNaN(Number(id))){
    return "sowy wrong id format"
}
try{
 const v =  await prisma.user.findUnique({
     where:{
         id: Number(id)
     }
 })
 return v === null ? "Id not found" : v
}catch(e){
    console.log(e)
}
}