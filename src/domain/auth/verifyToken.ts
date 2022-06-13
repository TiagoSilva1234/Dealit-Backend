import jwt, { Secret } from "jsonwebtoken";
import { Request, Response } from "express";
import StatusCodes from "http-status-codes";

export const verifyToken = (req: any, res: Response, next: () => void) => {
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
      let secret: Secret = process.env.TOKEN_KEY;
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
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
