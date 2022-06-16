import { Request, Response } from "express";
import getCompletion from "../domain/completion/get-textCompletion";
import { StatusCodes } from "http-status-codes";
import { dealioErrorMessages } from "../utils/utils";

export const GetTextCompletion = async (req: Request, res: Response) => {
  try {
    const input = req.body.input;
    if (!input) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "No input in body",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    }
    res.send(await getCompletion(input));
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
