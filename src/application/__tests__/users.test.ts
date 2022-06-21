const { StatusCodes } = require("http-status-codes");
const { getUserById } = require("../users");

const getUser = require("../../Domain/users/get-userById");
jest.mock("../../Domain/users/get-userById",()=>jest.fn());

describe("Users Endpoints", () => {
  describe("get user by id", () => {
    const mockSend = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };

    beforeEach(() => {
      jest.clearAllMocks();      
    });

   it("should return a custom error object if id has letters in it", async () => {
      await getUserById({ params: { id: "as" } }, mockSend);

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
      getUser.mockRejectedValueOnce(new Error("User does not exist"))

      await getUserById({ params: { id: "81231" } }, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1,
         StatusCodes.NOT_FOUND);
      expect(mockSend.send).toHaveBeenNthCalledWith(1,
         {
        error: {
          message:"User does not exist",
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
        address: 
          {
            country: "Portugal",
            city: "Porto",  
          },
      };
      getUser.mockResolvedValueOnce(response)
    
      await getUserById({ params: { id: 2 } }, mockSend);

    expect(mockSend.status).toHaveBeenCalledTimes(0);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
    });
  });
});
