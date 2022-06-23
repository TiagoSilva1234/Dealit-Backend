import pAdd from "../addresses/post-address";
import setAddFav from "../addresses/patch-adressIsFavorite";
import getAddsByUId from "../addresses/get-addressByUserId";
import getAddAuto from "../addresses/get-addressAuto";
import postUser from "../auth/post-user";
import postLogin from "../auth/post-login";
import getCatMainCat from "../categories/get-categoryById";
import allMainCats from "../categories/get-allMainCategories";
import getCompl from "../completion/get-textCompletion";
import postCreCard from "../creditCards/post-creditCard";
import setFavCard from "../creditCards/patch-setFavorite";
import getCardsByUId from "../creditCards/get-creditCardsByUserId";
import getUsrOrders from "../orders/get-ordersByUserId";
import postOrdr from "../orders/post-order";
import patchOrderSDate from "../orders/patch-orderSendDate";
import patchOrderDDate from "../orders/patch-orderDeliveryDate";
import getProd from "../products/get-productById";
import getProds from "../products/get-allProductsPaginated";
import postProd from "../products/post-product";
import getProdsByCat from "../products/get-productsByCategoryPaginated";
import getProdsByUId from "../products/get-productsByUserId";
import patchProdu from "../products/patch-product";
import getRevsByUId from "../reviews/get-reviewsByUserId";
import getRevsByProdId from "../reviews/get-reviewsByProductId";
import getRevsByRev from "../reviews/get-reviewsByReviewer";
import postRevie from "../reviews/post-review";
import patchUsr from "../users/patch-user";
import getAllUsrs from "../users/get-allUsers";
import getUsr from "../users/get-UserById";
import getUserT from "../users/get-userByToken";

jest.mock("../../infrastructure/addresses-repository", () => ({
  getAddressAutocomplete: () => "test",
  getAddressesByUserId: () => "test",
  setAddressFavorite: () => "test",
  postAddress: () => "test",
}));

jest.mock("../../infrastructure/categories-repository", () => ({
  getCategoryByMainCat: () => "test",
  getAllMainCategories: () => "test",
}));

jest.mock("../../infrastructure/completion-repository", () => ({
  createCompletion: () => "test",
}));

jest.mock("../../infrastructure/creditCards-repository", () => ({
  getCreditCardsByUserId: () => "test",
  setCreditCardFavorite: () => "test",
  postCreditCard: () => "test",
}));

jest.mock("../../infrastructure/orders-repository", () => ({
  getOrdersByUserId: () => "test",
  patchOrderDeliveryDate: () => "test",
  patchOrderSendDate: () => "test",
  postOrder: () => "test",
}));

jest.mock("../../infrastructure/products-repository", () => ({
  getAllProductsPaginated: () => "test",
  getProductById: () => "test",
  getProductsByCategoryPaginated: () => "test",
  getProductsByUserId: () => "test",
  patchProduct: () => "test",
  saveProduct: () => "test",
}));

jest.mock("../../infrastructure/reviews-repository", () => ({
  getReviewsByProductId: () => "test",
  getReviewsByReviewer: () => "test",
  getReviewsByUserId: () => "test",
  saveReview: () => "test",
}));

jest.mock("../../infrastructure/users-repository", () => ({
    login: () => "test",
    saveUser: () => "test",
    getAllUsers: () => "test",
    getUserById: () => "test",
    getUserByToken: () => "test",
    patchUser: () => "test",
  }));

describe("Domain tests", () => {
  describe("addresses domain", () => {
    it("get address autocomplete - should return infrastructure response", async () => {
      const x = await getAddAuto("xxx");
      expect(x).toEqual("test");
    });

    it("get addresses by user id - should return infrastructure response", async () => {
      const x = await getAddsByUId(1);
      expect(x).toEqual("test");
    });

    it("set favorite address - should return infrastructure response", async () => {
      const x = await setAddFav(1);
      expect(x).toEqual("test");
    });

    it("post address - should return infrastructure response", async () => {
      const x = await pAdd({
        country: "United States",
        city: "Silicon Valley",
        zipCode: "90041",
        street: "Sili Street",
        houseNumber: "332",
        isFavorite: false,
        userId: 0,
        id: 1,
      });
      expect(x).toEqual("test");
    });
  });

  describe("auth domain", () => {
    it("register - should return infrastructure response", async () => {
      const x = await postUser({
        username: "Jacques Tronault",
        address: {
          country: "France",
          city: "Paris",
          zipCode: "2314123",
          street: "Rue de Mock",
          houseNumber: "532",
          isFavorite: true,
        },
        email: "jacq@email.com",
        password: "P#s5w0rd",
        phone: "923456789",
      });
      expect(x).toEqual("test");
    });

    it("login - should return infrastructure response", async () => {
      const x = await postLogin("email", "password");
      expect(x).toEqual("test");
    });
  });

  describe("categories domain", () => {
    it("get categories by category - should return infrastructure response", async () => {
      const x = await getCatMainCat("cat");
      expect(x).toEqual("test");
    });

    it("get all main categories - should return infrastructure response", async () => {
      const x = await allMainCats();
      expect(x).toEqual("test");
    });
  });

  describe("completion domain", () => {
    it("get completion - should return infrastructure response", async () => {
      const x = await getCompl("hey");
      expect(x).toEqual("test");
    });
  });

  describe("credit cards domain", () => {
    it("post credit card - should return infrastructure response", async () => {
      const x = await postCreCard({
        id: 1,
        userId: 1,
        isFavorite: true,
        cardNumber: 1,
        cvc: 123,
        expiryDate: "12/12",
      });
      expect(x).toEqual("test");
    });

    it("set favorite credit card - should return infrastructure response", async () => {
      const x = await setFavCard(1);
      expect(x).toEqual("test");
    });

    it("get credit cards by user id - should return infrastructure response", async () => {
      const x = await getCardsByUId(1);
      expect(x).toEqual("test");
    });
  });

  describe("orders domain", () => {
    it("get orders by user id - should return infrastructure response", async () => {
      const x = await getUsrOrders(1);
      expect(x).toEqual("test");
    });

    it("post order - should return infrastructure response", async () => {
      const x = await postOrdr(
        {
          id: 1,
          buyDate: new Date(),
          sendDate: new Date(),
          deliveryDate: new Date(),
          userId: 1,
          sellerName: "DealIt",
          creditCardId: 1,
        },
        [1]
      );
      expect(x).toEqual("test");
    });

    it("patch order send date - should return infrastructure response", async () => {
      const x = await patchOrderSDate(1, { sendDate: new Date() });
      expect(x).toEqual("test");
    });

    it("patch order delivery date - should return infrastructure response", async () => {
      const x = await patchOrderDDate(1, { deliveryDate: new Date() });
      expect(x).toEqual("test");
    });
  });

  describe("products domain", () => {
    it("get product by id - should return infrastructure response", async () => {
      const x = await getProd("2", 1, 1);
      expect(x).toEqual("test");
    });

    it("post product - should return infrastructure response", async () => {
      const x = await postProd({
        photos: [""],
        userId: 1,
        name: "prod",
        description: "cool",
        category: "elecs",
        price: 123.12,
      });
      expect(x).toEqual("test");
    });

    it("get product by id - should return infrastructure response", async () => {
      const x = await getProds(1, 2);
      expect(x).toEqual("test");
    });

    it("get product by user id - should return infrastructure response", async () => {
      const x = await getProdsByUId(1);
      expect(x).toEqual("test");
    });

    it("get product by category - should return infrastructure response", async () => {
      const x = await getProdsByCat("cat", 1, 2);
      expect(x).toEqual("test");
    });

    it("patch product - should return infrastructure response", async () => {
      const x = await patchProdu(1, {});
      expect(x).toEqual("test");
    });
  });

  describe("reviews domain", () => {
    it("get reviews by reviewer - should return infrastructure response", async () => {
      const x = await getRevsByRev("rev");
      expect(x).toEqual("test");
    });

    it("post review - should return infrastructure response", async () => {
      const x = await postRevie({
        productId: 10,
        comment: "Great product! Fast and secure shipping!",
        photo:
          "https://www.lg.com/pt/images/tv/MD05958458/gallery/medium01.jpg",
        rating: 5,
        reviewer: "Tobias Jánavês",
      });
      expect(x).toEqual("test");
    });

    it("get reviews by product id - should return infrastructure response", async () => {
      const x = await getRevsByProdId(1);
      expect(x).toEqual("test");
    });

    it("get reviews by user id - should return infrastructure response", async () => {
      const x = await getRevsByUId(1);
      expect(x).toEqual("test");
    });
  });

  describe("users domain", () => {
    it("patch user - should return infrastructure response", async () => {
      const x = await patchUsr(1, {});
      expect(x).toEqual("test");
    });

    it("get user by token - should return infrastructure response", async () => {
      const x = await getUserT("jwt");
      expect(x).toEqual("test");
    });

    it("get user by id - should return infrastructure response", async () => {
      const x = await getUsr("1");
      expect(x).toEqual("test");
    });

    it("get all users - should return infrastructure response", async () => {
      const x = await getAllUsrs();
      expect(x).toEqual("test");
    });
  });
});
