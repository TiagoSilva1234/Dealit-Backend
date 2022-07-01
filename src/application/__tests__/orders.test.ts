const { getOrdersByUserId,postOrder,patchOrderDelivery,patchOrderSend } = require("../orders");

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
      it("should return orders by user id", async () => {
        getUserOrders.mockRejectedValueOnce(new Error("User does not exist"))
        await getOrdersByUserId({ params: { userId: "1" } }, mockSend);
  
        expect(mockSend.status).toHaveBeenNthCalledWith(1,404);
  
        expect(mockSend.send).toHaveBeenNthCalledWith(1, {
            error: {
              message: "User does not exist",
              cause: "Not found",
              date: new Date().toLocaleString(),
            },
          });
      });
      it("should return unexpeccted error", async () => {
        getUserOrders.mockRejectedValueOnce(new Error("error test"))
        await getOrdersByUserId({ params: { userId: "1" } }, mockSend);
  
        expect(mockSend.status).toHaveBeenNthCalledWith(1,500);
  
        expect(mockSend.send).toHaveBeenNthCalledWith(1, {
            error: {
              message: "error test",
              cause: "Unexpected error",
              date: new Date().toLocaleString(),
            },
          });
      });
      it("should return unexpeccted error", async () => {
        getUserOrders.mockRejectedValueOnce(new Error("error test"))
        await getOrdersByUserId({ params: { userId: "1" } }, mockSend);
  
        expect(mockSend.status).toHaveBeenNthCalledWith(1,500);
  
        expect(mockSend.send).toHaveBeenNthCalledWith(1, {
            error: {
              message: "error test",
              cause: "Unexpected error",
              date: new Date().toLocaleString(),
            },
          });
      });
  });
  describe("post orders", () => {
    const mockSend = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should return Required inputs missing", async () => {
        await postOrder({ params: { userId: "1" },body:{} }, mockSend);
  
        expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
        expect(mockSend.send).toHaveBeenNthCalledWith(1, {
            error: {
              message: "Required inputs missing",
              cause: "Bad request",
              date: new Date().toLocaleString(),
            },
          });
      });
      it("should return Order requires products", async () => {
        await postOrder({ params: { userId: "1" },body:{order:{},products:[]} }, mockSend);
  
        expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
        expect(mockSend.send).toHaveBeenNthCalledWith(1, {
            error: {
              message: "Order requires products",
              cause: "Bad request",
              date: new Date().toLocaleString(),
            },
          });
      });
      it("should return Orders successfully saved", async () => {
          postOrders.mockResolvedValueOnce({})
        await postOrder({ params: { userId: "1" },body:{order:{},products:["",""]} }, mockSend);
  
        expect(mockSend.status).toHaveBeenNthCalledWith(1, 201);
        expect(mockSend.send).toHaveBeenNthCalledWith(1,{
            message: "Order successfully saved to database",
            order: {},
          });
      });
      it("should return Unexpected Error", async () => {
        postOrders.mockRejectedValueOnce(new Error("test error"))
      await postOrder({ params: { userId: "1" },body:{order:{},products:["",""]} }, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
      expect(mockSend.send).toHaveBeenNthCalledWith(1,{
        error: {
          message: "test error",
          cause: "Unexpected error",
          date: new Date().toLocaleString(),
        },
      });
    });
  });
  describe("patch orders Delivery Date", () => {
    const mockSend = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should return invalid id format", async () => {
        await patchOrderDelivery({ params: { userId: "q" },body:{} }, mockSend);
  
        expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
        expect(mockSend.send).toHaveBeenNthCalledWith(1, {
            error: {
              message: "Invalid id format",
              cause: "Bad Request",
              date: new Date().toLocaleString(),
            },
          });
      });
      it("should return Required inputs missing", async () => {
        await patchOrderDelivery({ params: { id: "1" } }, mockSend);
  
        expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
        expect(mockSend.send).toHaveBeenNthCalledWith(1, {
            error: {
              message: "Required inputs missing",
              cause: "Bad request",
              date: new Date().toLocaleString(),
            },
          });
      });
      it("should return Required inputs missing", async () => {
          patchOrderDeliveryDate.mockResolvedValueOnce({})
        await patchOrderDelivery({ params: { id: "1" },body:{} }, mockSend);
  
        expect(mockSend.status).toHaveBeenCalledTimes(0);
        expect(mockSend.send).toHaveBeenNthCalledWith(1, {
            message: "Delivery date successfully updated",
            order: {},
          });
      });
      it("should return Orders Unexpected error", async () => {
        patchOrderDeliveryDate.mockRejectedValueOnce(new Error("test error"))
        await patchOrderDelivery({ params: { id: "1" },body:{} }, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
      expect(mockSend.send).toHaveBeenNthCalledWith(1,{
        error: {
          message: "test error",
          cause: "Unexpected error",
          date: new Date().toLocaleString(),
        },
      });
    });


}); 



describe("patch orders send Date", () => {
    const mockSend = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should return invalid id format", async () => {
        await patchOrderSend({ params: { userId: "q" },body:{} }, mockSend);
  
        expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
        expect(mockSend.send).toHaveBeenNthCalledWith(1, {
            error: {
              message: "Invalid id format",
              cause: "Bad Request",
              date: new Date().toLocaleString(),
            },
          });
      });
      it("should return Required inputs missing", async () => {
        await patchOrderSend({ params: { id: "1" } }, mockSend);
  
        expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
        expect(mockSend.send).toHaveBeenNthCalledWith(1, {
            error: {
              message: "Required inputs missing",
              cause: "Bad request",
              date: new Date().toLocaleString(),
            },
          });
      });
      it("should return Required inputs missing", async () => {
        patchOrderSendDate.mockResolvedValueOnce({})
        await patchOrderSend({ params: { id: "1" },body:{} }, mockSend);
  
        expect(mockSend.status).toHaveBeenCalledTimes(0);
        expect(mockSend.send).toHaveBeenNthCalledWith(1, {
            message: "Send date successfully updated",
            order: {},
          });
      });
      it("should return Orders Unexpected error", async () => {
        patchOrderSendDate.mockRejectedValueOnce(new Error("test error"))
        await patchOrderSend({ params: { id: "1" },body:{} }, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
      expect(mockSend.send).toHaveBeenNthCalledWith(1,{
        error: {
          message: "test error",
          cause: "Unexpected error",
          date: new Date().toLocaleString(),
        },
      });
    });


});
  
});
