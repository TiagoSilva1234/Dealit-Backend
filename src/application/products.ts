import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import getProduct from "../domain/products/get-productById";
import getProducts from "../domain/products/get-allProductsPaginated";
import postProduct from "../domain/products/post-product";
import getProductsByCat from "../domain/products/get-productsByCategoryPaginated";
import getProdsByUserId from "../domain/products/get-productsByUserId";
import patchProd from "../domain/products/patch-product";
const multer = require("multer");
const fs = require("fs")
const path = require("path")
var multiparty = require('multiparty');

;
//Product endpoints logic
export const getProductById = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const id = req.params.id;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 3;
    if (
      (isNaN(Number(id)) && id !== "random" && id !== "latest") ||
      limit > 10
    ) {
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
const teste =async (req:any):Promise<any> => {
  var form = new multiparty.Form();
  var formfields = await new Promise(function (resolve, reject) {
    form.parse(req, function (err:Error, fields:any, files:any) {
        if (err) {
            reject(err);
            return;
        }
        resolve({fields,files});
    }); // form.parse
});
return formfields
}
export const postNewProduct = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {


const obj = await teste(req)

const name = obj.fields.name[0]
const description = obj.fields.description[0]
const price:number = Number(obj.fields.price[0])
const userId:number = Number(obj.fields.userId[0])
const category = obj.fields.category[0]

    if (
      !(name && description  && price && category) ||
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
     price,
     photos: [],
      userId,
      category,
    };

    const result = await postProduct(req,res);

    return res.status(StatusCodes.CREATED).send({
      message: "Product successfully saved to database!",
      product: result,
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
    const result = await patchProd(Number(id), data);
    return res.send({
      message: "Product successfully patched",
      user: result,
    });
  } catch (e: any) {
    if (e.message === "Product not found") {
      return res.status(StatusCodes.NOT_FOUND).send({
        error: {
          message: e.message,
          cause: "Product not found",
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
