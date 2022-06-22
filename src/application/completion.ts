import { Request, Response } from "express";
import getCompletion from "../domain/completion/get-textCompletion";
import { StatusCodes } from "http-status-codes";

export const GetTextCompletion = async (req: Request, res: Response) => {
  try {
    const input = req.body.input;
    if (!input) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "Required data missing",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    }
    const resCompl = await getCompletion(input);
    res.send(resCompl);
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
