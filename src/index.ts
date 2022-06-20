import express, { Express, Request, Response } from "express";
import cors from "cors";
import {
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
} from "./application";
const app: Express = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const port = Number(process.env.API_PORT) || 8080;

//Endpoints user
endpointGetUserById(app);
endpointGetUserByToken(app);
endpointPatchUser(app);
endpointPostUser(app);
endpointPostLogin(app);
endpointGetAllUsers(app);

//Endpoints products
endpointGetProductById(app);
endpointPostProduct(app);
endpointgetProductsByCategoryPaginated(app);
endpointgetAllProductsPaginated(app);
endpointgetProductsByUserId(app);
endpointPatchProducts(app);

//Endpoints categories
endpointGetCategoryByMainCat(app);
endpointGetAllMainCategories(app);

//Endpoints reviews
endpointGetReviewsByUserId(app);
endpointGetReviewsByProductId(app);
endpointGetReviewsByReviewer(app);
endpointPostReviews(app);

//Endpoints orders
endpointGetOrdersByUserId(app);
endpointPostOrders(app);
endpointPatchOrdersSendDate(app);
endpointPatchOrdersDeliveryDate(app);

//Endpoints addresses
endpointPostAddress(app);
endpointPatchAddressFavorite(app);
endpointGetAddressesByUserId(app);

//Endpoints credit cards
endpointPostCreditCard(app);
endpointSetFavoriteCreditCard(app);
endpointGetCreditCardsByUserId(app);

//Endpoint Completion
endpointCompletion(app);

app.get("/", (req: Request, res: Response) => {
  res.send("hello!");
});

app.listen(process.env.PORT || port, () =>
  console.log(`listening on port ${port} :)`)
);

export default app;
