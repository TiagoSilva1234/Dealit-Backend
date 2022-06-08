export default async function getUserById () {

    const user = await userRepository.getById()
    
    user.addresses = user.addresses.map(async (addressId: number) => await addressRepository.getById(addressId))

    return user;
}