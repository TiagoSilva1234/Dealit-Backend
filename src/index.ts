import express, { Express, Request, Response } from "express";
import {
  endpointGetUserById,
  endpointGetUserOrdersById,
  endpointPostUser,
  endpointPostLogin,
  endpointGetProductById,
  endpointPostProduct,
  endpointgetProductsByCategoryPaginated,
  endpointgetAllProductsPaginated,
  endpointgetProductsByUserId,
  endpointGetCategoryByMainCat,
  endpointGetAllMainCategories,
} from "./application";
const app: Express = express();

app.use(express.json());

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const port = Number(process.env.API_PORT) || 3000;

endpointGetUserById(app);
endpointGetUserOrdersById(app);

endpointPostUser(app);
endpointPostLogin(app);

endpointGetProductById(app);
endpointPostProduct(app);
endpointgetProductsByCategoryPaginated(app);
endpointgetAllProductsPaginated(app);
endpointgetProductsByUserId(app);

endpointGetCategoryByMainCat(app);
endpointGetAllMainCategories(app);

app.get("/", (req: Request, res: Response) => {
  res.send("hello!");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`listening on port ${port} :)`);
});

export default app;
