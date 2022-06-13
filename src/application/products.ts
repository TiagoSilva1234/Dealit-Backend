import { Request, Response } from "express";
import getProduct from "../domain/products/get-productById";
import getProducts from "../domain/products/get-allProductsPaginated";
import postProduct from "../domain/products/post-product";
import getProductsByCategory from "../domain/products/get-productsByCategoryPaginated";
import getProdsByUserId from "../domain/products/get-productsByUserId";
import getLatestProducts from "../domain/products/get-latestProducts";
import { StatusCodes } from "http-status-codes";

//Product endpoints logic
export const getProductById = async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    if (isNaN(Number(id)) && id !== "random") {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "Invalid id format",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    }
    const product = await getProduct(id);
    res.send(product);
  } catch (e: any) {
    if (e.message === "Product does not exist") {
      return res.status(StatusCodes.NOT_FOUND).send({
        error: {
          message: e.message,
          cause: "Not found",
          date: new Date().toLocaleString(),
        },
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: {
        message: e.message,
        cause: "Unexpected error",
        date: new Date().toLocaleString(),
      },
    });
  }
};

export const postNewProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, photos, price, userId } = req.body;
    const { catName } = req.body.category;

    const data = {
      name,
      description,
      photos,
      price,
      userId,
      category: {
        catName,
      },
    };
    return res.send({
      message: "Product successfully saved to datebase!",
      product: await postProduct(data),
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
};

export const getProductsByCategoryPaginated = async (
  req: Request,
  res: Response
) => {
  try {
    let category = req.params.category;

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 6;
    const ret = await getProductsByCategory(category, page, limit);
    return res.send(ret);
  } catch (e: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: {
        message: e.message,
        cause: "Unexpected error",
        date: new Date().toLocaleString(),
      },
    });
  }
};

export const getAllProductsPaginated = async (req: Request, res: Response) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 6;
    const ret = await getProducts(page, limit);
    return res.send(ret);
  } catch (e: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: {
        message: e.message,
        cause: "Unexpected error",
        date: new Date().toLocaleString(),
      },
    });
  }
};

export const getProductsByUserId = async (req: Request, res: Response) => {
  try {
    let userId = req.params.userId;
    console.log(userId);

    if (isNaN(Number(userId))) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "Invalid id format",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    }
    res.send(await getProdsByUserId(Number(userId)));
  } catch (e: any) {
    if (e.message === "User does not exist") {
      return res.status(StatusCodes.NOT_FOUND).send({
        error: {
          message: e.message,
          cause: "Not found",
          date: new Date().toLocaleString(),
        },
      });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: {
        message: e.message,
        cause: "Unexpected error",
        date: new Date().toLocaleString(),
      },
    });
  }
};

export const getLateProducts = async (req: Request, res: Response) => {
  try {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 6;
    const ret = await getLatestProducts(page, limit);
    return res.send(ret);
  } catch (e: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: {
        message: e.message,
        cause: "Unexpected error",
        date: new Date().toLocaleString(),
      },
    });
  }
};
