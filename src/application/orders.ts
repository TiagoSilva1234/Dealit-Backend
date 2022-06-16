import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Order } from "@prisma/client";
import getUserOrders from "../domain/orders/get-ordersByUserId";
import postOrders from "../domain/orders/post-order";
import patchOrderSendDate from "../domain/orders/patch-orderSendDate";
import patchOrderDeliveryDate from "../domain/orders/patch-orderDeliveryDate";

export const getOrdersByUserId = async (
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
    return res.send(await getUserOrders(Number(userId)));
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

export const postOrder = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
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
    return res.send({
      message: "Order successfully saved to database",
      order: await postOrders(data, prod),
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

export const patchOrderSend = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  if (isNaN(Number(req.params.id))) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      error: {
        message: "Wrong id type",
        cause: "Uri format",
        date: new Date().toLocaleString(),
      },
    });
  }
  const id = Number(req.params.id);

  return res.send(await patchOrderSendDate(id, req.body));
};

export const patchOrderDelivery = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  if (isNaN(Number(req.params.id))) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      error: {
        message: "Wrong id type",
        cause: "Uri format",
        date: new Date().toLocaleString(),
      },
    });
  }
  const id = Number(req.params.id);
  return res.send(await patchOrderDeliveryDate(id, req.body));
};
