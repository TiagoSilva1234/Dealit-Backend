const {
  endpointGetUserById,
  endpointGetUserByToken,
  endpointPatchUser,
  endpointGetOrdersByUserId,
  endpointPostUser,
  endpointPostLogin,
  endpointGetProductById,
  endpointPostProduct,
  endpointgetProductsByCategoryPaginated,
  endpointgetAllProductsPaginated,
  endpointgetProductsByUserId,
  endpointGetCategoryByMainCat,
  endpointGetAllMainCategories,
  endpointGetReviewsByUserId,
  endpointGetReviewsByProductId,
  endpointGetReviewsByReviewer,
  endpointPostReviews,
  endpointPostOrders,
  endpointPatchProducts,
  endpointPatchOrdersSendDate,
  endpointPatchOrdersDeliveryDate,
  endpointPostAddress,
  endpointPatchAddressFavorite,
  endpointGetAddressesByUserId,
  endpointPostCreditCard,
  endpointSetFavoriteCreditCard,
  endpointGetCreditCardsByUserId,
  endpointGetAllUsers,
  endpointCompletion,
  endpointGetAddressAutocomplete,
} = require("../");
import { getUserById, patchUser, getEveryUser, getUserByToken } from "../users";
import {
  getOrdersByUserId,
  postOrder,
  patchOrderSend,
  patchOrderDelivery,
} from "../orders";

import { registerUser, userLogin } from "../auth";
import {
  getProductById,
  postNewProduct,
  getProductsByCategory,
  getAllProductsPaginated,
  getProductsByUserId,
  patchProduct,
} from "../products";
import { getCategoryByMainCat, getAllMainCategories } from "../categories";
import {
  getReviewsByUserId,
  getReviewsByProductId,
  getReviewsByReviewer,
  postReview,
} from "../reviews";
import {
  postAddress,
  setFavoriteAddress,
  getAddressesByUserId,
  getAddressAutocomplete
} from "../addresses";
import {
  postCreditCard,
  setFavoriteCreditCard,
  getCreditCardsByUserId,
} from "../creditCards";
import { GetTextCompletion } from "../completion";
import verifyToken  from "../../utils/verifyToken";

const mockApp = {
  get: jest.fn().mockReturnThis(),
  patch: jest.fn().mockReturnThis(),
    post: jest.fn().mockReturnThis(),
};
describe("Index endpoints", () => {
  describe("All endpoints must be called at least once with their respective functions and URI", () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });
    describe("User endpoints", () => {
   
        it("get User by token should be called once",()=>{
          endpointGetUserByToken(mockApp);
          expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/users/", verifyToken, getUserByToken)
        })
        it("patch user should be called once",()=>{
          endpointPatchUser(mockApp);
          expect(mockApp.patch).toHaveBeenCalledWith("/dealit/api/users/:id", verifyToken, patchUser)
        })
        it("get all users should be called once",()=>{
          endpointGetAllUsers(mockApp);
          expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/all-users/", getEveryUser)
        })
        it("get user by id should be called once",()=>{
          endpointGetUserById(mockApp);
          expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/users/:id",getUserById);
        })
      });
      describe("auth endpoints", () => {
        it("post user should be called once",()=>{
          endpointPostUser(mockApp);
          expect(mockApp.post).toHaveBeenCalledWith("/dealit/api/register", registerUser)
        })
        it("post Login should be called once",()=>{
          endpointPostLogin(mockApp);
          expect(mockApp.post).toHaveBeenCalledWith("/dealit/api/login", userLogin)
        })
      
      });
      describe("Products endpoints", () => {
    
        it("Get Product by id should be called once",()=>{
          endpointGetProductById(mockApp);
          expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/products/:id", getProductById)
        })
  
  
        it("get products by category should be called once",()=>{
          endpointgetProductsByCategoryPaginated(mockApp);
        expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/products/category/:category", getProductsByCategory)
        })
        it("get all products by category should be called once",()=>{
          endpointgetAllProductsPaginated(mockApp);
          expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/products", getAllProductsPaginated)
        })
        it("get product by user id should be called once",()=>{
          endpointgetProductsByUserId(mockApp);
          expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/products/user/:userId", getProductsByUserId)
        })
     
      });

        describe("Category endpoints", () => {
          it("get category by main categories should be called once",()=>{
            endpointGetCategoryByMainCat(mockApp);
            expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/categories/:cat", getCategoryByMainCat)
          })
          it("Get all main categories",()=>{
            endpointGetAllMainCategories(mockApp);
            expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/categories", getAllMainCategories)
          })
      });
      describe("Order's endpoints", () => {
        it("get orders by user id should be called once",()=>{
          endpointGetOrdersByUserId(mockApp);
          expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/orders/user/:userId",verifyToken, getOrdersByUserId)
        })
        it("post orders should be called once",()=>{
          endpointPostOrders(mockApp);
          expect(mockApp.post).toHaveBeenCalledWith("/dealit/api/orders", verifyToken, postOrder)
        })
        it("post orders send date should be called once",()=>{
          endpointPatchOrdersSendDate(mockApp);
          expect(mockApp.patch).toHaveBeenCalledWith("/dealit/api/orders/sendDate/:id", verifyToken, patchOrderSend)
        })
        it("post orders delivery date should be called once",()=>{
          endpointPatchOrdersDeliveryDate(mockApp);
          expect(mockApp.patch).toHaveBeenCalledWith("/dealit/api/orders/deliveryDate/:id",verifyToken,patchOrderDelivery)
        })

    });
    describe("Review's endpoints", () => {
      it("get reviews by user id should be called once",()=>{
        endpointGetReviewsByUserId(mockApp);
        expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/reviews/user/:userId", getReviewsByUserId)
      })
      it("get reviews by product id should be called once",()=>{
        endpointGetReviewsByProductId(mockApp);
        expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/reviews/product/:productId", getReviewsByProductId)

      })
      it("get reviews by reviewer should be called once",()=>{
        endpointGetReviewsByReviewer(mockApp);
        expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/reviews/rev/:reviewer", getReviewsByReviewer)
   
      })
      it("post reviews should be called once",()=>{
        endpointPostReviews(mockApp);
        expect(mockApp.post).toHaveBeenCalledWith("/dealit/api/reviews", verifyToken, postReview)
      })

  });
  describe("Credit card endpoints", () => {
    it("set favorite credit card should be called once",()=>{
      endpointSetFavoriteCreditCard(mockApp);
      expect(mockApp.patch).toHaveBeenCalledWith("/dealit/api/credit-cards/:id", verifyToken, setFavoriteCreditCard)
    })
    it("get credit card by user id should be called once",()=>{
      endpointGetCreditCardsByUserId(mockApp);
      expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/credit-cards/user/:userId",verifyToken, getCreditCardsByUserId)

    })
    it("post credit card should be called once",()=>{
      endpointPostCreditCard(mockApp);
      expect(mockApp.post).toHaveBeenCalledWith("/dealit/api/credit-cards", verifyToken, postCreditCard)
 
    })

});
describe("Address endpoints", () => {
  it("post address should be called once",()=>{
    endpointPostAddress(mockApp);
    expect(mockApp.post).toHaveBeenCalledWith("/dealit/api/addresses", verifyToken, postAddress)
  })
  it("patch favorite address should be called once",()=>{
    endpointPatchAddressFavorite(mockApp);
    expect(mockApp.patch).toHaveBeenCalledWith("/dealit/api/addresses/:id", verifyToken, setFavoriteAddress)

  })
  it("get address by user id should be called once",()=>{
    endpointGetAddressesByUserId(mockApp);
    expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/addresses/user/:userId",verifyToken, getAddressesByUserId)

  })
  it("get address autocomplete should be called once",()=>{
    endpointGetAddressAutocomplete(mockApp);
    expect(mockApp.get).toHaveBeenCalledWith("/dealit/api/addresses/autocomplete", getAddressAutocomplete)

  })

});
describe("Completion endpoints", () => {
  it("get completition should be called once",()=>{
    endpointCompletion(mockApp);
    expect(mockApp.post).toHaveBeenCalledWith("/dealit/api/completion", GetTextCompletion)
  })
  

});

    
 
  });
});
