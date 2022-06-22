const {
  postAddress,
  setFavoriteAddress,
  getAddressesByUserId,
  getAddressAutocomplete,
} = require("../addresses");

const postAdd = require("../domain/addresses/post-address");
jest.mock("../../Domain/addresses/post-address", () => jest.fn());
const setAddressIsFavorite = require("../domain/addresses/patch-adressIsFavorite");
jest.mock("../../Domain/addresses//patch-adressIsFavorite", () => jest.fn());
const getAddsByUserId = require("../domain/addresses/get-addressByUserId");
jest.mock("../../Domain/addresses/get-addressByUserId", () => jest.fn());
const getAddressAuto = require("../domain/addresses/get-addressAuto");
jest.mock("../../Domain/addresses/get-addressAuto", () => jest.fn());

describe("Addresses Endpoint", () => {
    describe("get addresses by user id", () => {
        const mockSend = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn().mockReturnThis(),
        };
    
        beforeEach(() => {
          jest.clearAllMocks();      
        });
    
    
        it("should return a custom error object if id has letters in it", async () => {
          await getUserById({ params: { id: "qu1m" } }, mockSend);
    
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
          getUser.mockRejectedValueOnce(new Error("User does not exist"));
          await getUserById({ params: { id: "90" } }, mockSend);
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
    
          const response = {
            id: 0,
            username: "DealIt",
            email: "dealit@dealit.com",
            phone: "910000000",
    
            address: {
              country: "Portugal",
              city: "Porto",
            },
          };
          getUser.mockResolvedValueOnce(response);
          await getUserById({ params: { id: "1" } }, mockSend);
    
          expect(mockSend.status).toHaveBeenCalledTimes(0);
          expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
        });
    
        it("should return a custom error object if any unexpected error is met", async () => {
          const e = new Error("An unexpected Error");
          getUser.mockRejectedValueOnce(e);
          await getUserById({ params: { id: "90" } }, mockSend);
          expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
          expect(mockSend.send).toHaveBeenNthCalledWith(1, {
            error: {
              message: e.message,
              cause: "Unexpected error",
              date: new Date().toLocaleString(),
            },
          });
        });
      });
});
