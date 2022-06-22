import { Request, Response } from "express";
import getProduct from "../domain/products/get-productById";
import getProducts from "../domain/products/get-allProductsPaginated";
import postProduct from "../domain/products/post-product";
import getProductsByCat from "../domain/products/get-productsByCategoryPaginated";
import getProdsByUserId from "../domain/products/get-productsByUserId";
import patchProd from "../domain/products/patch-product";
import { StatusCodes } from "http-status-codes";

//Product endpoints logic
export const getProductById = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {

    const id = req.params.id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    if (isNaN(Number(id)) && (id !== "random" && id !== "latest") || limit > 10) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "Invalid id format",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    }
    return res.send(await getProduct(id, page, limit));
  } catch (e: any) {
    console.log(e.message);
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

export const postNewProduct = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const name= req.body.name;
    const  description= req.body.description;
    const photos =req.body.photos
    const price = req.body.price;
    const userId = req.body.userId;
    const category = req.body.category;

    if (!(name && description && photos && price && userId && category)) {
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
      photos,
      price,
      userId,
      category,
    };

    return res.status(StatusCodes.CREATED).send({
      message: "Product successfully saved to database!",
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

export const getProductsByCategory = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const category = req.params.category;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const ret = await getProductsByCat(category, page, limit);
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

export const getAllProductsPaginated = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
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

export const getProductsByUserId = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const userId = req.params.userId;

    if (isNaN(Number(userId))) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "Invalid id format",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    }
    return res.send(await getProdsByUserId(Number(userId)));
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

export const patchProduct = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const id = req.params.id;
    const data = req.body;
    if (isNaN(Number(id))) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "Invalid id format",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    }
    if (!data) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "Required inputs missing",
          cause: "Bad Requ∆est",
          date: new Date().toLocaleString(),
        },
      });
    }
    return res.send({
      message: "Product successfully patched",
      user: await patchProd(Number(id), data),
    });
  } catch (e: any) {
    if (e.message === "Product not found") {
      return res.status(StatusCodes.NOT_FOUND).send({
        error: {
          message: e.message,
          cause: "Unexpected error",
          date: new Date().toLocaleString(),
        },
      });
    }
    if (e.message.slice(10, 33) === "prisma.product.update()")
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: `${e.message.slice(10, 33)} failed`,
          cause: "Invalid data format",
          date: new Date().toLocaleString(),
        },
      });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: {
        message: e.message,
        cause: "Unexpected error",
        date: new Date().toLocaleString(),
      },
    });
  }
};
