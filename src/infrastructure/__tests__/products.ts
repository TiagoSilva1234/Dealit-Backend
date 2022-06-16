import { Context } from './context'
import {User} from '@prisma/client'


export async function createUser(user: User, ctx: Context) {
 
    return await ctx.prisma.user.create({
      data: user,
    })
 
    return new Error('User must accept terms!')
  
}

interface UpdateUser {
  id: number
  name: string
  email: string
}

export async function updateUsername(user: UpdateUser, ctx: Context) {
  return await ctx.prisma.user.update({
    where: { id: user.id },
    data: user,
  })
}