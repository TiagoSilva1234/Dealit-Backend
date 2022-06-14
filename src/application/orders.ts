import { Request, Response } from "express";
import getUserOrders from "../domain/orders/get-ordersByUserId";
import { StatusCodes } from "http-status-codes";
import postOrders from "../domain/orders/post-order";

import { Order, Product } from "@prisma/client";
export const getOrdersByUserId = async (req: Request, res: Response) => {
  try {
    console.log("yo")
    console.log("yo")
    let userId = req.params.userId;
    if (isNaN(Number(userId))) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "Invalid id format",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    }
    res.send(await getUserOrders(Number(userId)));
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

export const postOrder = async (req: Request, res: Response) => {
  try {
    const data: Order = req.body.order;
    const prod: number[] = req.body.prods;
    if (prod.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "Order requires products",
          cause: "Bad request",
          date: new Date().toLocaleString(),
        },
      });
    }
    res.send(await postOrders(data, prod));
  } catch (e: any) {}
};
