import { UserData, ProductData } from "./types";

export const userDataIsNotValid = (
  data: UserData
): { check: boolean; cause: string[] } => {
  const tester = { check: false, cause: [] };

  return tester;
}


export const produtDataIsNotValid = (
  data: ProductData
): { check: boolean; cause: string[] } => {
  const tester = { check: false, cause: Array<string>() };
  if (!data.name) {
    tester.cause.push("Name not defined");
  }
 // if(data.name.length()>120){}
      

  if (!data.description) {
    tester.cause.push("Description not defined");
  }
  if (!data.price) {
    tester.cause.push("Price not defined");
  }
  if (!data.userId) {
    tester.cause.push("Seller not defined");
  }
  if(!data.category.catName){
      tester.cause.push("Category not defined")
  }

  tester.cause.length === 0? tester.check = true : tester.check = false

  return tester;
};
