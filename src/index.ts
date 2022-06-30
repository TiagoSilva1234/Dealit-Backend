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
  endpointGetAddressAutocomplete
} from "./application";

var bodyParser = require('body-parser');

const app: Express = express();
// Put these statements before you define any routes.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use('/static',express.static('public'));
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
endpointGetAddressAutocomplete(app)
//Endpoints credit cards
endpointPostCreditCard(app);
endpointSetFavoriteCreditCard(app);
endpointGetCreditCardsByUserId(app);

//Endpoint Completion
endpointCompletion(app);

app.get("/", (req: Request, res: Response) => {
  res.send("hello!");
});


app.listen(process.env.PORT|| 8080, () =>

  console.log(`listening on port ${port} :)`)
);

export default app;
