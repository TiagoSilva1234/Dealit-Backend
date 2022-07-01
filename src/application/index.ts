import verifyToken from "../utils/verifyToken";
import { Express } from "express";
const path = require("path");
const multer = require("multer");
import prisma from "../../client";
const fs = require("fs");
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { getUserById, patchUser, getEveryUser, getUserByToken } from "./users";

import {
  getOrdersByUserId,
  postOrder,
  patchOrderSend,
  patchOrderDelivery,
} from "./orders";

import { registerUser, userLogin } from "./auth";
import {
  getProductById,
  getProductsByCategory,
  getAllProductsPaginated,
  getProductsByUserId,
  patchProduct,
  getProductsStatsByUserId,
} from "./products";
import { getCategoryByMainCat, getAllMainCategories } from "./categories";
import {
  getReviewsByUserId,
  getReviewsByProductId,
  getReviewsByReviewer,
  postReview,
} from "./reviews";
import {
  postAddress,
  setFavoriteAddress,
  getAddressesByUserId,
  getAddressAutocomplete,
} from "./addresses";
import {
  postCreditCard,
  setFavoriteCreditCard,
  getCreditCardsByUserId,
} from "./creditCards";
import { GetTextCompletion } from "./completion";
import { saveProduct } from "../infrastructure/products-repository";
import postProd from "../domain/products/post-product"
//EndpointsUser
export const endpointGetUserById = (app: Express): void => {
  app.get("/dealit/api/users/:id", getUserById);
};
export const endpointGetUserByToken = (app: Express): void => {
  app.get("/dealit/api/users/", verifyToken, getUserByToken);
};
export const endpointPatchUser = (app: Express): void => {
  app.patch("/dealit/api/users/:id", verifyToken, patchUser);
};
export const endpointGetAllUsers = (app: Express): void => {
  app.get("/dealit/api/all-users/", getEveryUser);
};

//EndpointsAuth
export const endpointPostUser = (app: Express): void => {
  app.post("/dealit/api/register", registerUser);
};
export const endpointPostLogin = (app: Express): void => {
  app.post("/dealit/api/login", userLogin);
};

//EndpointsProduct
export const endpointGetProductById = (app: Express): void => {
  app.get("/dealit/api/products/:id", getProductById);
};
let counter = 0;
var storage = multer.diskStorage({
  destination: async function (req:any, file:any, cb:any) {
    const product = await prisma.product.findMany({
      orderBy: { id: "desc" },
      take: 1,
    });
fs.mkdirSync(`./public/${req.body.userId}`,{recursive:true})
fs.mkdirSync(`./public/${req.body.userId}/${product[0].id +1}`,{recursive:true})
    cb(null, `./public/${req.body.userId}/${product[0].id +1}`)
  },
  filename: function (req:any, file:any, cb:any) {

    counter = counter+1;
    cb(null, counter + ".png")
  }
})

 var upload = multer({ storage:storage }).array('photos')

export const endpointPostProduct = (app: Express): void => {
app.post("/dealit/api/products",upload,async(req:any, res:any) => {

counter = 0
    try {
      console.log(req.body)
      const name = req.body.name;
      const description = req.body.description;
     
      const price = Number(req.body.price);
      const userId = Number(req.body.userId);
      const category = req.body.category;
      let length = 0
      fs.readdir('./public', (err:Error, files:any) => {
        length= files.length;
      });
    
      if (
        !(name && description && price && category) ||
        userId === undefined
      ) {
        return res.status(StatusCodes.BAD_REQUEST).send({
          error: {
            message: "Required data missing",
            cause: "Bad Request",
            date: new Date().toLocaleString(),
          },
        });
      }
  
      const data = {
        name,
        description,
        photos:[],
        price,
        userId,
        category,
      };
  
      const result = await postProd(data,upload,req,res);
      const urls= []
  for(let i = 1;i<length+1;i++){
urls.push(`https://dealit-backend.herokuapp.com/static/${data.userId}/${result.id}/${i}.png`)
  }
const updated= await prisma.product.update({
    where:{
      id:result.id
    },
    data:{
      photos: urls
    }
  })
      return res.status(StatusCodes.CREATED).send({
        message: "Product successfully saved to database!",
        product: updated,
      });
    } catch (e: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        error: {
          message: e.message,
          cause: "Unexpected error",
          date: new Date().toLocaleString(),
        },
      });
    }    
  });

};

export const endpointgetProductsByCategoryPaginated = (app: Express): void => {
  app.get("/dealit/api/products/category/:category", getProductsByCategory);
};
export const endpointgetAllProductsPaginated = (app: Express): void => {
  app.get("/dealit/api/products", getAllProductsPaginated);
};
export const endpointgetProductsByUserId = (app: Express): void => {
  app.get("/dealit/api/products/user/:userId", getProductsByUserId);
};

export const EndpointGetProductsStatsByUserId = (app: Express): void => {
  app.get(
    "/dealit/api/product-stats/user/:userId",
    verifyToken,
    getProductsStatsByUserId
  );
};
export const endpointPatchProducts = (app: Express): void => {
  app.patch("/dealit/api/products/:id", verifyToken, patchProduct);
};
//EndpointsCategory
export const endpointGetCategoryByMainCat = (app: Express): void => {
  app.get("/dealit/api/categories/:cat", getCategoryByMainCat);
};

export const endpointGetAllMainCategories = (app: Express): void => {
  app.get("/dealit/api/categories", getAllMainCategories);
};

//EndpointsOrders
export const endpointGetOrdersByUserId = (app: Express): void => {
  app.get("/dealit/api/orders/user/:userId", verifyToken, getOrdersByUserId);
};

export const endpointPostOrders = (app: Express): void => {
  app.post("/dealit/api/orders", verifyToken, postOrder);
};

export const endpointPatchOrdersSendDate = (app: Express): void => {
  app.patch("/dealit/api/orders/sendDate/:id", verifyToken, patchOrderSend);
};

export const endpointPatchOrdersDeliveryDate = (app: Express): void => {
  app.patch(
    "/dealit/api/orders/deliveryDate/:id",
    verifyToken,
    patchOrderDelivery
  );
};

//EndpointsReviews
export const endpointGetReviewsByUserId = (app: Express): void => {
  app.get("/dealit/api/reviews/user/:userId", getReviewsByUserId);
};

export const endpointGetReviewsByProductId = (app: Express): void => {
  app.get("/dealit/api/reviews/product/:productId", getReviewsByProductId);
};

export const endpointGetReviewsByReviewer = (app: Express): void => {
  app.get("/dealit/api/reviews/rev/:reviewer", getReviewsByReviewer);
};

export const endpointPostReviews = (app: Express): void => {
  app.post("/dealit/api/reviews", verifyToken, postReview);
};

//Endpoints CreditCard
export const endpointSetFavoriteCreditCard = (app: Express): void => {
  app.patch("/dealit/api/credit-cards/:id", verifyToken, setFavoriteCreditCard);
};
export const endpointGetCreditCardsByUserId = (app: Express): void => {
  app.get(
    "/dealit/api/credit-cards/user/:userId",
    verifyToken,
    getCreditCardsByUserId
  );
};
export const endpointPostCreditCard = (app: Express): void => {
  app.post("/dealit/api/credit-cards", verifyToken, postCreditCard);
};

//Endpoints Adress
export const endpointPostAddress = (app: Express): void => {
  app.post("/dealit/api/addresses", verifyToken, postAddress);
};

export const endpointGetAddressesByUserId = (app: Express): void => {
  app.get(
    "/dealit/api/addresses/user/:userId",
    verifyToken,
    getAddressesByUserId
  );
};

export const endpointPatchAddressFavorite = (app: Express): void => {
  app.patch("/dealit/api/addresses/:id", verifyToken, setFavoriteAddress);
};
export const endpointGetAddressAutocomplete = (app: Express): void => {
  app.get("/dealit/api/addresses/autocomplete", getAddressAutocomplete);
};

//Endpoint Completion
export const endpointCompletion = (app: Express): void => {
  app.post("/dealit/api/completion", GetTextCompletion);
};


