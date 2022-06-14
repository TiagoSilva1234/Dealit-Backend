import { Request, Response } from "express";
import getRevsByUserId from "../domain/reviews/get-reviewsByUserId";
import getRevsByProductId from "../domain/reviews/get-reviewsByProductId";
import getRevsByReviewer from "../domain/reviews/get-reviewsByReviewer";
import postRev from "../domain/reviews/post-review";
import { StatusCodes } from "http-status-codes";
import { Review } from "@prisma/client";

export const getReviewsByUserId = async (req: Request, res: Response) => {
  try {
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
    res.send(await getRevsByUserId(Number(userId)));
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

export const getReviewsByProductId = async (req: Request, res: Response) => {
  try {
    let productId = req.params.productId;
    if (isNaN(Number(productId))) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        error: {
          message: "Invalid id format",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    }
    res.send(await getRevsByProductId(Number(productId)));
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

export const getReviewsByReviewer = async (req: Request, res: Response) => {
  try {
    let reviewer = req.params.reviewer;

    res.send(await getRevsByReviewer(reviewer));
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

export const postReview = async (req: Request, res: Response) => {
    try {
        const {userId, productId, comment, photo, rating, reviewer} = req.body;
        if (!(userId || productId) ||
            !(
                comment &&
                photo &&
                rating &&
                reviewer 
            )
          ) {
            return res.status(StatusCodes.BAD_REQUEST).send({
              error: {
                message: "Required data missing",
                cause: "Bad Request",
                date: new Date().toLocaleString(),
              },
            });
          }
          if (userId) {
              const data: any = {
                  userId,
                  comment,
                  photo,
                  rating,
                  reviewer
              }
              return res.send(await postRev(data))
          }
          if(productId){
            const data: any = {
                productId,
                comment,
                photo,
                rating,
                reviewer
            }
            return res.send(await postRev(data))
          }
    } catch(e: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: {
              message: e.message,
              cause: "Unexpected error",
              date: new Date().toLocaleString(),
            },
          });
    }
}
