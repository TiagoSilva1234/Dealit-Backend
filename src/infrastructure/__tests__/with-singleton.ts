import { createUser, updateUsername } from './products'
import { prismaMock } from '../../../singleton'

test('should create new user ', async () => {
  const user = {
      id: 3,
    username: "claudio",
  address: {
    country: "portugal",
    city: "cao",
    zipCode: "string",
    street: "string",
    houseNumber: "string",
    isFavorite: false,
  },
  photo: "asdas",
  email: "string",
  password: "string",
  phone: "string",
  //creditCard?: CreditCard
  token: "string",
  }

  prismaMock.user.create.mockResolvedValue(user)

  await expect(createUser(user)).resolves.toEqual({
    id: 1,
    name: 'Rich',
    email: 'hello@prisma.io',
  })
})

test('should update a users name ', async () => {
  const user = {
    id: 1,
    name: 'Rich Haines',
    email: 'hello@prisma.io',
  }

  prismaMock.user.update.mockResolvedValue(user)

  await expect(updateUsername(user)).resolves.toEqual({
    id: 1,
    name: 'Rich Haines',
    email: 'hello@prisma.io',
  })
})

test('should fail if user does not accept terms', async () => {
  const user = {
    id: 1,
    name: 'Rich Haines',
    email: 'hello@prisma.io',
    acceptTermsAndConditions: false,
  }

  prismaMock.user.create.mockRejectedValue(new Error('User must accept terms!'))

  await expect(createUser(user)).resolves.toEqual(
    new Error('User must accept terms!')
  )
})