const {
  getReviewsByUserId,
  getReviewsByProductId,
  getReviewsByReviewer,
  postReview,
} = require("../reviews");
const getRevsByUserId = require("../../domain/reviews/get-reviewsByUserId");
jest.mock("../../domain/reviews/get-reviewsByUserId", () => jest.fn());
const getRevsByProductId = require("../../domain/reviews/get-reviewsByProductId");
jest.mock("../../domain/reviews/get-reviewsByProductId", () => jest.fn());
const getRevsByReviewer = require("../../domain/reviews/get-reviewsByReviewer");
jest.mock("../../domain/reviews/get-reviewsByReviewer", () => jest.fn());
const postRev = require("../../domain/reviews/post-review");
jest.mock("../../domain/reviews/post-review", () => jest.fn());

describe("Reviews Endpoint", () => {
  const mockSend = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };

  describe("get reviews by user id", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return a custom error object if id has letters in it", async () => {
      await getReviewsByUserId({ params: { userId: "q" } }, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);

      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "Invalid id format",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    });

    it("should return a custom error object if id doesn't match user in database", async () => {
      getRevsByUserId.mockRejectedValueOnce(new Error("User does not exist"));
      await getReviewsByUserId({ params: { userId: "9" } }, mockSend);
      expect(mockSend.status).toHaveBeenNthCalledWith(1, 404);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "User does not exist",
          cause: "Not found",
          date: new Date().toLocaleString(),
        },
      });
    });

    it("should return a successful response", async () => {
      const response = [
        {
          id: 1,
          userId: 0,
          comment: "Great seller! Fast and secure shipping!",
          photo:
            "https://www.lg.com/pt/images/tv/MD05958458/gallery/medium01.jpg",
          rating: 5,
          reviewer: "Tobias Jánavês",
        },
      ];

      getRevsByUserId.mockResolvedValueOnce(response);
      await getReviewsByUserId({ params: { userId: 0 } }, mockSend);

      expect(mockSend.status).toHaveBeenCalledTimes(0);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
    });

    it("should return a custom error object if any unexpected error is met", async () => {
      getRevsByUserId.mockRejectedValueOnce(new Error("An unexpected Error"));
      await getReviewsByUserId({ params: { userId: "0" } }, mockSend);
      expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "An unexpected Error",
          cause: "Unexpected error",
          date: new Date().toLocaleString(),
        },
      });
    });
  });

  describe("get reviews by product id", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return a custom error object if id has letters in it", async () => {
      await getReviewsByProductId({ params: { productId: "q" } }, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);

      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "Invalid id format",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    });

    it("should return a custom error object if id doesn't match user in database", async () => {
      getRevsByProductId.mockRejectedValueOnce(
        new Error("Product does not exist")
      );
      await getReviewsByProductId({ params: { productId: "9" } }, mockSend);
      expect(mockSend.status).toHaveBeenNthCalledWith(1, 404);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "Product does not exist",
          cause: "Not found",
          date: new Date().toLocaleString(),
        },
      });
    });

    it("should return a successful response", async () => {
      const response = [
        {
          id: 1,
          userId: 0,
          comment: "Great seller! Fast and secure shipping!",
          photo:
            "https://www.lg.com/pt/images/tv/MD05958458/gallery/medium01.jpg",
          rating: 5,
          reviewer: "Tobias Jánavês",
        },
      ];

      getRevsByProductId.mockResolvedValueOnce(response);
      await getReviewsByProductId({ params: { productId: 0 } }, mockSend);

      expect(mockSend.status).toHaveBeenCalledTimes(0);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
    });

    it("should return a custom error object if any unexpected error is met", async () => {
      getRevsByProductId.mockRejectedValueOnce(
        new Error("An unexpected Error")
      );
      await getReviewsByProductId({ params: { productId: "0" } }, mockSend);
      expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "An unexpected Error",
          cause: "Unexpected error",
          date: new Date().toLocaleString(),
        },
      });
    });
  });

  describe("get reviews by reviewer", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return a custom error object if id doesn't match user in database", async () => {
      getRevsByReviewer.mockRejectedValueOnce(
        new Error("Reviewer does not exist")
      );
      await getReviewsByReviewer({ params: { reviewer: "xxx" } }, mockSend);
      expect(mockSend.status).toHaveBeenNthCalledWith(1, 404);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "Reviewer does not exist",
          cause: "Not found",
          date: new Date().toLocaleString(),
        },
      });
    });

    it("should return a successful response", async () => {
      const response = [
        {
          id: 1,
          userId: 0,
          comment: "Great seller! Fast and secure shipping!",
          photo:
            "https://www.lg.com/pt/images/tv/MD05958458/gallery/medium01.jpg",
          rating: 5,
          reviewer: "Tobias Jánavês",
        },
      ];

      getRevsByReviewer.mockResolvedValueOnce(response);
      await getReviewsByReviewer(
        { params: { reviewer: "Tobias Jánavês" } },
        mockSend
      );

      expect(mockSend.status).toHaveBeenCalledTimes(0);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
    });

    it("should return a custom error object if any unexpected error is met", async () => {
      getRevsByReviewer.mockRejectedValueOnce(new Error("An unexpected Error"));
      await getReviewsByReviewer(
        { params: { reviewer: "Tobias Jánavês" } },
        mockSend
      );
      expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "An unexpected Error",
          cause: "Unexpected error",
          date: new Date().toLocaleString(),
        },
      });
    });
  });

  describe("post review", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return a custom error if required data is missing", async () => {
      await postReview({ body: {} }, mockSend);
      expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "Required data missing",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    });

    it("should return a custom error if no user id or product id is provided", async () => {
      const mockReq = {
        body: {
          comment: "Great product! Fast and secure shipping!",
          photo:
            "https://www.lg.com/pt/images/tv/MD05958458/gallery/medium01.jpg",
          rating: 5,
          reviewer: "Tobias Jánavês",
        },
      };

      await postReview(mockReq, mockSend);
      expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "Could not find an id for product or user",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    });

    it("should return a custom error if an unexpected error occurs", async () => {
      const mockReq = {
        body: {
          userId: 0,
          comment: "Great product! Fast and secure shipping!",
          photo:
            "https://www.lg.com/pt/images/tv/MD05958458/gallery/medium01.jpg",
          rating: 5,
          reviewer: "Tobias Jánavês",
        },
      };

      postRev.mockRejectedValueOnce(new Error("An unexpected error"));

      await postReview(mockReq, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "An unexpected error",
          cause: "Unexpected error",
          date: new Date().toLocaleString(),
        },
      });
    });

    it("should return a successful response for user review", async () => {
      const response = {
        message: "Review successfully saved to database",
        review: {
          userId: 0,
          comment: "Great seller! Fast and secure shipping!",
          photo:
            "https://www.lg.com/pt/images/tv/MD05958458/gallery/medium01.jpg",
          rating: 5,
          reviewer: "Tobias Jánavês",
        },
      };
      const mockReq = {
        body: {
          userId: 0,
          comment: "Great seller! Fast and secure shipping!",
          photo:
            "https://www.lg.com/pt/images/tv/MD05958458/gallery/medium01.jpg",
          rating: 5,
          reviewer: "Tobias Jánavês",
        },
      };
      postRev.mockResolvedValueOnce(mockReq.body);
      await postReview(mockReq, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 201);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
    });

    it("should return a successful response for product review", async () => {
      const response = {
        message: "Review successfully saved to database",
        review: {
          productId: 0,
          comment: "Great product! Fast and secure shipping!",
          photo:
            "https://www.lg.com/pt/images/tv/MD05958458/gallery/medium01.jpg",
          rating: 5,
          reviewer: "Tobias Jánavês",
        },
      };
      const mockReq = {
        body: {
          productId: 0,
          comment: "Great product! Fast and secure shipping!",
          photo:
            "https://www.lg.com/pt/images/tv/MD05958458/gallery/medium01.jpg",
          rating: 5,
          reviewer: "Tobias Jánavês",
        },
      };
      postRev.mockResolvedValueOnce(mockReq.body);
      await postReview(mockReq, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 201);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
    });
  });
});
