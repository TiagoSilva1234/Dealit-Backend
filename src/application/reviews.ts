import { Request, Response } from "express";
import getRevsByUserId from "../domain/reviews/get-reviewsByUserId";
import getRevsByProductId from "../domain/reviews/get-reviewsByProductId";
import getRevsByReviewer from "../domain/reviews/get-reviewsByReviewer";
import postRev from "../domain/reviews/post-review";
import { StatusCodes } from "http-status-codes";
import { ReviewData } from "../utils/types";

export const getReviewsByUserId = async (
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
    return res.send(await getRevsByUserId(Number(userId)));
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

export const getReviewsByProductId = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const productId = req.params.productId;
    if (isNaN(Number(productId))) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "Invalid id format",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    }
    return res.send(await getRevsByProductId(Number(productId)));
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

export const getReviewsByReviewer = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const reviewer = req.params.reviewer;

    return res.send(await getRevsByReviewer(reviewer));
  } catch (e: any) {
    if (e.message === "Reviewer does not exist") {
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

export const postReview = async (
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> => {
  try {
    const { userId, productId, comment, photo, rating, reviewer } = req.body;
    console.log(userId, productId);
    if (!(comment && photo && rating && reviewer)) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "Required data missing",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    }
    if (userId !== undefined) {
      const data: ReviewData = {
        userId: Number(userId),
        comment,
        photo,
        rating: Number(rating),
        reviewer,
      };
      return res.send({
        message: "Review successfully saved to datebase!",
        review: await postRev(data),
      });
    } else if (productId !== undefined) {
      const data: ReviewData = {
        productId: Number(productId),
        comment,
        photo,
        rating: Number(rating),
        reviewer,
      };
      return res.send(await postRev(data));
    }
    return res.status(StatusCodes.BAD_REQUEST).send({
      error: {
        message: "Could not find an id for product or user",
        cause: "Bad Request",
        date: new Date().toLocaleString(),
      },
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
