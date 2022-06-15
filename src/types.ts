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
  photo?: string;
  email: string;
  password: string;
  phone: string;
  creditCard?: CreditCard
  token?: string;
};

export type CreditCard = {
    cardNumber: string;
    cvc: string;
    expiryDate: string;
    isFavorite: boolean;
}

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

export type OrderData = {
  buyDate: Date;
  sendDate: Date;
  deliveryDate: Date;
  userId: number;
  sellerName: string;
  creditCardId: number;
};
