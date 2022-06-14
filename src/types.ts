export type UserData = {
  username: string;
  address: {
    country: string;
    city: string;
    zipCode: string;
    street: string;
    houseNumber: string;
    isFavorite: boolean;
  };
  email: string;
  password: string;
  phone: string;
  creditCard?: {
    cardNumber: string;
    cvc: string;
    expiryDate: string;
    isFavorite: boolean;
  };
  token?: string;
};

export type ProductData = {
    name: string;
    description: string;
    photos: string[];
    price: number;
    userId: number;
    category: {
      catName: string;
    };
  };
  
export type OrderData ={
  buyDate: Date,
  sendDate: Date,
  deliveryDate: Date, 
  userId: number,
  sellerName: string, 
  creditCardId: number, 
}