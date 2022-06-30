import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Order } from "@prisma/client";
import getUserOrders from "../domain/orders/get-ordersByUserId";
import postOrders from "../domain/orders/post-order";
import patchOrderSendDate from "../domain/orders/patch-orderSendDate";
import patchOrderDeliveryDate from "../domain/orders/patch-orderDeliveryDate";
import { ProductInOrderData } from "../utils/types";

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
    const prods: ProductInOrderData[] = req.body.products;
    if (!data || !prods) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "Required inputs missing",
          cause: "Bad request",
          date: new Date().toLocaleString(),
        },
      });
    }
    if (prods.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "Order requires products",
          cause: "Bad request",
          date: new Date().toLocaleString(),
        },
        
      });
    }
    const result  = await postOrders(data, prods)
    return res.status(StatusCodes.CREATED).send({
      message: "Order successfully saved to database",
      order: result,
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
  try {
    const id = Number(req.params.id);
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
          cause: "Bad request",
          date: new Date().toLocaleString(),
        },
      });
    }
    const result = await patchOrderSendDate(id, data);
    return res.send({
      message: "Send date successfully updated",
      order: result,
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

export const patchOrderDelivery = async (
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
          cause: "Bad request",
          date: new Date().toLocaleString(),
        },
      });
    }
    const result = await patchOrderDeliveryDate(Number(id), data)
    return res.send({
      message: "Delivery date successfully updated",
      order: result,
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
