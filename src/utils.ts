import { UserData, ProductData } from "./types";

import countries from "./countries";

export const productDataIsNotValid = (
  data: ProductData
): { check: boolean; cause: string[] } => {
  const tester = { check: false, cause: Array<string>() };

  if (!data.name) {
    tester.cause.push("Name not defined");
  }
  if (!data.description) {
    tester.cause.push("Description not defined");
  }
  if (!data.price) {
    tester.cause.push("Price not defined");
  }
  if (!data.userId) {
    tester.cause.push("Seller not defined");
  }
  if (!data.category?.catName) {
    tester.cause.push("Category not defined");
  }

  tester.cause.length > 0 ? (tester.check = true) : (tester.check = false);
  return tester;
};

export const userDataIsNotValid = (
  data: UserData
): { check: boolean; cause: string[] } => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const expiryDateRegex = /^\d{2}\/\d{2}/;
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  const tester = { check: false, cause: Array<string>() };

  if (data.username.length < 2) {
    tester.cause.push("Username is too short");
  }
  if (data.username.length > 40) {
    tester.cause.push("Username is too long");
  }
  if (!countries.includes(data.address.country)) {
    tester.cause.push("Country does not exist");
  }
  if (!emailRegex.test(data.email)) {
    tester.cause.push("Email is not valid");
  }
  if (data.password.length < 8) {
    tester.cause.push("Password too short");
  }
  if (!passwordRegex.test(data.password)) {
    tester.cause.push("Password not safe enough");
  }
  if (
    data.phone.length !== 9 &&
    Number(data.phone) < 910000000 &&
    Number(data.phone) > 969999999
  ) {
    tester.cause.push("Phone number not valid");
  }
  if (data.creditCard) {
    if (data.creditCard.cardNumber.toString().length !== 16) {
      tester.cause.push("Credit card number not valid");
    }
    if (data.creditCard.cvc.toString().length !== 3) {
      tester.cause.push("Credit card cvc not valid");
    }
    if (!expiryDateRegex.test(data.creditCard.expiryDate)) {
      tester.cause.push("invalid expiry date format");
    }
  }
  tester.cause.length > 0 ? (tester.check = true) : (tester.check = false);

  return tester;
};

export const generatePrompt = (input: string) => {
  return `Dealio is a new generation AI chat assistant, created to help customers find help and navigate the DealIt website.
  
    He is able to tell you a lot about the website:
  
    You: What should I buy?
    Dealio: Have you tried checking out our random selection on the Home Page?
    You: I need some pants.
    Dealio: Check out our Clothing section: http://www.dealit.com/products?category=Clothing
    You: I want a TV.
    Dealio: Here you go: http://www.dealit.com/products?category=TV&Video
    You: How can I pay?
    Dealio: Right now we only take Credit Cards, but soon Paypal should be available as well!
    You: Does DealIt sell its own products?
    Dealio: Yes! We ship from either Portugal or the U.S.A.!
    You: Do you have a phone contact?
    Dealio: You can try reaching us at +351965430945 if you're in Portugal!
    You: Who are you?
    Dealio: I'm Dealio, you AI virtual assistant! I'll try my best to help you out!
    You: I need to contact my seller directly!
    Dealio: I'm sorry, i can't do that. Send us an email at support@dealit.com with a description of you problem!
    You: ${input}
    Dealio:`;
};

export const dealioErrorMessages = [
  "It appears i'm having some troubles connecting to my brain... Try again later!",
  "Oops, I can´t seem to connect to the internet... Hang on...",
  "Damn... Is it me or the internet seems kinda busy today?",
  "No way... I'm offline, so I can't help you right now :(",
  "Something is wrong with my service... Have you tried reloading the page?"
]
