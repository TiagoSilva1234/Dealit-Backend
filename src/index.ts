import express, { Express, Request, Response } from "express";
import {
  endpointGetUserById,
  endpointPatchUser,
  endpointGetOrdersByUserId,
  endpointPostUser,
  endpointPostLogin,
  endpointGetProductById,
  endpointPostProduct,
  endpointgetProductsByCategoryPaginated,
  endpointgetAllProductsPaginated,
  endpointgetProductsByUserId,
  endpointGetLatestProducts,
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
  endpointPostCreditCard,
  endpointPostAddress,
  endpointPatchAddressFavorite
} from "./application";
const app: Express = express();

app.use(express.json());

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const port = Number(process.env.API_PORT) || 3000;

//Endpoints user
endpointGetUserById(app);
endpointPatchUser(app);
endpointPostUser(app);
endpointPostLogin(app);

//Endpoints products
endpointGetProductById(app);
endpointPostProduct(app);
endpointgetProductsByCategoryPaginated(app);
endpointgetAllProductsPaginated(app);
endpointgetProductsByUserId(app);
endpointGetLatestProducts(app);
endpointPatchProducts(app)

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
endpointPatchAddressFavorite(app)
//Endpoints credit cards
endpointPostCreditCard(app);


app.get("/", (req: Request, res: Response) => {
  res.send("hello!");
});

app.listen(port, "0.0.0.0", () => console.log(`listening on port ${port} :)`));

export default app;
