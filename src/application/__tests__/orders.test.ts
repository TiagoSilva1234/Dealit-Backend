const { getOrdersByUserId } = require("../orders");

const getUserOrders = require("../../domain/orders/get-ordersByUserId");
const postOrders = require("../../domain/orders/post-order");
const patchOrderSendDate = require("../../domain/orders/patch-orderSendDate");
const patchOrderDeliveryDate = require("../../domain/orders/patch-orderDeliveryDate");

jest.mock("../../domain/orders/get-ordersByUserId",()=>jest.fn());
jest.mock("../../domain/orders/post-order",()=>jest.fn());
jest.mock("../../domain/orders/patch-orderSendDate",()=>jest.fn());
jest.mock("../../domain/orders/patch-orderDeliveryDate",()=>jest.fn());
describe("Orders Endpoints", () => {
  describe("get Orders by user id", () => {
    const mockSend = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return a custom error object if id has letters in it", async () => {
      await getOrdersByUserId({ params: { userId: "q" } }, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);

      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "Invalid id format",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    });
    it("should return orders by user id", async () => {
        getUserOrders.mockResolvedValueOnce({})
        await getOrdersByUserId({ params: { userId: "1" } }, mockSend);
  
        expect(mockSend.status).toHaveBeenCalledTimes(0);
  
        expect(mockSend.send).toHaveBeenNthCalledWith(1, {});
      });
  });
});
