import { Request, Response } from "express";
import getUser from '../domain/users/get-userById'
import { StatusCodes } from "http-status-codes";

import patchUsr from "../domain/users/patch-user";
import getAllUsers from "../domain/users/get-allUsers";

//User endpoints logic
export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const id = req.params.id;
    if (isNaN(Number(id))) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "Invalid id format",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    }
    const user = await getUser(id);
    return res.send(user);
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

export const getEveryUser = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    return res.send(await getAllUsers());
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

export const patchUser = async (
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
    return res.send({
      message: "User successfully patched",
      user: await patchUsr(Number(id), data),
    });
  } catch (e: any) {
    if (e.message === "User not found") {
      return res.status(StatusCodes.NOT_FOUND).send({
        error: {
          message: e.message,
          cause: "Not Found",
          date: new Date().toLocaleString(),
        },
      });
    }
    if (e.message.slice(10, 33) === "prisma.user.update()")
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: `${e.message.slice(10, 33)} failed`,
          cause: "Bad Request",
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
