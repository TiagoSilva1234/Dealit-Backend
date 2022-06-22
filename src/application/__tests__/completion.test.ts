const { GetTextCompletion } = require("../completion");

const getCompletion = require("../../domain/completion/get-textCompletion");
jest.mock("../../domain/completion/get-textCompletion", () => jest.fn());

describe("AI Completion Endpoint", () => {
  const mockSend = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };

  describe("get text completion", () => {
    it("should return a custom error if required data is missing", async () => {
      await GetTextCompletion({ body: {} }, mockSend);
      expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "Required data missing",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    });

    it("should return a custom error object if any unexpected error is met", async () => {
      getCompletion.mockRejectedValueOnce(new Error("An unexpected Error"));
      await GetTextCompletion({ body: { input: "I need some pants" } }, mockSend);
      expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "An unexpected Error",
          cause: "Unexpected error",
          date: new Date().toLocaleString(),
        },
      });
    });

    it("should return a successful response", async () => {
      const response = {
        response: " You need to check out our Clothing section: http://www.dealit.com/products?category=Clothing"
      };

      getCompletion.mockResolvedValueOnce(response);
      await GetTextCompletion({ body: { input: "I need some pants" } }, mockSend);

      expect(mockSend.status).toHaveBeenCalledTimes(0);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
    });
  });
});
