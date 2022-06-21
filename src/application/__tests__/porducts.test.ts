const { getProductById } = require("../Products");
const { StatusCodes } = require("http-status-codes");
const getProduct = require("../../Domain/products/get-productById");
jest.mock("../../Domain/products/get-productById",()=>jest.fn())

describe("Products Endpoints", () => {
    describe("get Product by id", () => {
      const mockSend = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn().mockReturnThis(),
      };
  
      beforeEach(() => {
        jest.clearAllMocks();      
      });
  
     it("should return a custom error object if id has letters in it", async () => {
        await getProductById({ params: { id: "as" } }, mockSend);
  
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
  
      it("should return a custom error object if name doesn't match Product in database", async () => {
        getProduct.mockRejectedValueOnce(new Error("Product does not exist"))
  
        await getProductById({ params: { id: "81231" } }, mockSend);
  
        expect(mockSend.status).toHaveBeenNthCalledWith(1,
           StatusCodes.NOT_FOUND);
        expect(mockSend.send).toHaveBeenNthCalledWith(1,
           {
          error: {
            message:"Product does not exist",
            cause: "Not found",
            date: new Date().toLocaleString(),
          },
        });
      });
  
      it("should return a successful response", async () => {
  
        const response = {
          id: 0,
          Productname: "DealIt",
          email: "dealit@dealit.com",
          phone: "910000000",
          address: 
            {
              country: "Portugal",
              city: "Porto",  
            },
        };
        getProduct.mockResolvedValueOnce(response)
      
        await getProductById({ params: { id: 2 } }, mockSend);
  
      expect(mockSend.status).toHaveBeenCalledTimes(0);
        expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
      });
    });
  });
  