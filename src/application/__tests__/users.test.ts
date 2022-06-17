const { StatusCodes } = require("http-status-codes");
const { getUserById } = require("../users");
const getUser = require("../../Domain/users/get-userById");

jest.mock("../../Domain/users/get-userById");


describe("Users Endpoints", () => {
  describe("get user by id", () => {
    const mockSend = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return a custom error object if id has letters in it", async () => {
      await getUserById({ params: { name: "qu1m" } }, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(
        1,
        StatusCodes.BAD_REQUEST
      );
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "Invalid id format",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    });

    it("should return a custom error object if name doesn't match user in database", async () => {
      const e = new Error("User does not exist");
      getUser.mockRejectedValueOnce(e);
      await getUserById({ params: { name: "sbsdf" } }, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, StatusCodes.NOT_FOUND);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: e.message,
          cause: "Not found",
          date: new Date().toLocaleString(),
        },
      });
    });

    it("should return a successful response", async () => {
      const response = {
        id: 0,
        username: "DealIt",
        email: "dealit@dealit.com",
        phone: "910000000",
        orders: [],
        addresses: [
          {
            id: 4,
            country: "Portugal",
            city: "Porto",
            zipCode: "4000-543",
            street: "Rua do Porto",
            houseNumber: "534",
            isFavorite: true,
            userId: 0,
          },
        ],
        creditCards: [],
      };

      getUser.mockResolvedValueOnce(response);
      await getUserById({ params: { id: 0 } }, mockSend);

      expect(mockSend.status).toHaveBeenCalledTimes(0);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
    });
  });
});
