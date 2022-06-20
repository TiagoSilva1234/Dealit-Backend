import jwt, { Secret } from "jsonwebtoken";
import { Request, Response } from "express";
import StatusCodes from "http-status-codes";

export const verifyToken = (
  req: Request,
  res: Response,
  next: () => void
): void | Response<any, Record<string, any>> => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(StatusCodes.FORBIDDEN).send({
      error: {
        message: "A token is required for authentication",
        cause: "Forbidden",
        date: new Date().toLocaleString(),
      },
    });
  }
  try {
    if (process.env.TOKEN_KEY) {
      const secret: Secret = process.env.TOKEN_KEY;
      const decoded = jwt.verify(token, secret);
      req.body.decoded = decoded;
    }
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).send({
      error: {
        message: "Invalid token",
        cause: "Unauthorized",
        date: new Date().toLocaleString(),
      },
    });
  }
  return next();
};
