import express, { Express, Request, Response } from "express";
import { endpointGetUserById, 
  endpointPostUser,
   endpointGetProductById, 
   endpointPostProduct,
   endpointGetCategoryByMainCat,
   endpointGetAllMainCategories,
   endpointgetProductsByCategoryPaginated
  } from "./application";
const app: Express = express();


app.use(express.json());

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

endpointGetUserById(app);
endpointPostUser(app);

endpointGetProductById(app);
endpointPostProduct(app);
endpointgetProductsByCategoryPaginated(app)

endpointGetCategoryByMainCat(app);
endpointGetAllMainCategories(app)

app.get("/", (req: Request, res: Response) => {
  res.send("hello!");
});

app.listen(3220, "127.0.0.1", () => {
  console.log("listening :)");
});


export default app;
