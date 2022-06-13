import { UserData } from "./types";
import countries from "./countries";

export const userDataIsNotValid = (
  data: UserData
): { check: boolean; cause: string[] } => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const expiryDateRegex = /^\d{2}\\\d{2}/
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
  if (data.phone.toString().length !== 9) {
    tester.cause.push("Phone number not valid");
  }
  if (data.creditCard) {
    if (data.creditCard.cardNumber.toString().length !== 16) {
      tester.cause.push("Credit card number not valid");
    }
    if (data.creditCard.cvc.toString().length !== 3) {
      tester.cause.push("Credit card cvc not valid");
    }
    if(!expiryDateRegex.test(data.creditCard.expiryDate)){
        tester.cause.push("invalid expiry date format");
    }
  }

  return tester;
};
