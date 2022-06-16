import { Request, Response } from "express";
import getProduct from "../domain/products/get-productById";
import getProducts from "../domain/products/get-allProductsPaginated";
import postProduct from "../domain/products/post-product";
import getProductsByCat from "../domain/products/get-productsByCategoryPaginated";
import getProdsByUserId from "../domain/products/get-productsByUserId";
import getLatestProducts from "../domain/products/get-latestProducts";
import patchProd from "../domain/products/patch-product";
import { StatusCodes } from "http-status-codes";

//Product endpoints logic
export const getProductById = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    let id = req.params.id;
    let num = Number(req.query.size) || 1;
    if (isNaN(Number(id)) && id !== "random" && num > 10) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "Invalid id format",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    }

    const product = await getProduct(id, num);
    return res.send(product);
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

export const postNewProduct = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const { name, description, photos, price, userId } = req.body;
    const { catName } = req.body.category;

    if (!(name && description && photos && price && userId && catName)) {
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
      category: {
        catName,
      },
    };

    return res.send({
      message: "Product successfully saved to datebase!",
      product: await postProduct(data),
    });
  } catch (e: any) {
    if (
      e.message ===
      "\nInvalid `prisma.product.create()` invocation in\n/Users/tiagosilva/Desktop/BackEndDealIt/src/infrastructure/products-repository.ts:23:40\n\n  20 };\n  21 \n  22 export const saveProduct = async (data: ProductData) => {\n→ 23   const product = await prisma.product.create(\n  An operation failed because it depends on one or more records that were required but not found. No 'Category' record(s) (needed to inline the relation on 'Product' record(s)) was found for a nested connect on one-to-many relation 'CategoryToProduct'."
    ) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({
        error: {
          message: "Category name does not match any category in database",
          cause: "Unprocessable entity",
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

export const getProductsByCategory = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    let category = req.params.category;

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

export const getLateProducts = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
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

export const patchProduct = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    if (isNaN(Number(req.params.id))) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "Invalid id format",
          cause: "Unexpected error",
          date: new Date().toLocaleString(),
        },
      });
    }
    return res.send({
      message: "Product successfully patched",
      user: await patchProd(Number(req.params.id), req.body),
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
