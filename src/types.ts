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
  phone: number;
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
  