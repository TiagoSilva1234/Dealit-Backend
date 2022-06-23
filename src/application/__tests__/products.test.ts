const {
//  getProductById,
  postNewProduct,
  getProductsByCategory,
  getAllProductsPaginated,
  getProductsByUserId,
  patchProduct,
} = require("../Products");

const getProduct = require("../../Domain/products/get-productById");
const postProduct = require("../../Domain/products/post-product");
const getProductsByCat = require("../../Domain/products/get-productsByCategoryPaginated");
const getAllProdsPaginated = require("../../domain/products/get-allProductsPaginated");
const getProdsByUserId = require("../../domain/products/get-productsByUserId");
const patchProd = require("../../domain/products/patch-product");
jest.mock("../../Domain/products/get-productById", () => jest.fn());
jest.mock("../../Domain/products/post-product", () => jest.fn());
jest.mock("../../Domain/products/get-productsByCategoryPaginated", () =>
  jest.fn()
);
jest.mock("../../domain/products/get-allProductsPaginated", () => jest.fn());
jest.mock("../../domain/products/get-productsByUserId", () => jest.fn());
jest.mock("../../domain/products/patch-product", () => jest.fn());

describe("Products Endpoints", () => {
 /* describe("get Product by id", () => {
    const mockSend = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return a custom error object if id has letters in it", async () => {
      await getProductById(
        { params: { id: "as" }, query: { page: 1, limit: 3 } },
        mockSend
      );

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "Invalid id format",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    });

    it("should return a custom error object if name doesn't match Product in database", async () => {
      getProduct.mockRejectedValueOnce(new Error("Product does not exist"));

      await getProductById(
        { params: { id: "1" }, query: { page: 1, limit: 3 } },
        mockSend
      );

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 404);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "Product does not exist",
          cause: "Not found",
          date: new Date().toLocaleString(),
        },
      });
    });

    it("should return unexpected error", async () => {
      getProduct.mockRejectedValueOnce(new Error("teste"));

      await getProductById({ params: { id: 1 }, query: {} }, mockSend);

      expect(mockSend.status).toHaveBeenCalledTimes(1);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "teste",
          cause: "Unexpected error",
          date: new Date().toLocaleString(),
        },
      });
    });
    it("should return product does  not exist", async () => {
      getProduct.mockRejectedValueOnce(new Error("Product does not exist"));

      await getProductById({ params: { id: 1 }, query: {} }, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 404);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "Product does not exist",
          cause: "Not found",
          date: new Date().toLocaleString(),
        },
      });
    });
  });
*/
  describe("post product", () => {
    const mockSend = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };

    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return a custom error required data missing", async () => {
      await postNewProduct({ body: {} }, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "Required data missing",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    });
    it("should return a unexpected error", async () => {
      postProduct.mockRejectedValueOnce(new Error());
      const mock = {
        body: {
          name: "claudio",
          description: "idk",
          photos: ["asd"],
          price: 123.1,
          userId: 1,
          category: "pao",
        },
      };
      await postNewProduct(mock, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "",
          cause: "Unexpected error",
          date: new Date().toLocaleString(),
        },
      });
    });
    it("should return a successful response", async () => {
      const response = {
        message: "Product successfully saved to database!",
        product: {
          category: "pao",
          description: "idk",
          name: "claudio",
          photos: ["asd"],
          price: 123.1,
          userId: 1,
        },
      };
      const mock = {
        body: {
          name: "claudio",
          description: "idk",
          photos: ["asd"],
          price: 123.1,
          userId: 1,
          category: "pao",
        },
      };
      postProduct.mockResolvedValueOnce(mock.body);
      await postNewProduct(mock, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 201);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
    });
  });

  describe("get product by category", () => {
    const mockSend = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };

    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return unexpected error", async () => {
      getProductsByCat.mockRejectedValueOnce(new Error());

      await getProductsByCategory(
        { params: { category: "Clothing" }, query: {} },
        mockSend
      );

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "",
          cause: "Unexpected error",
          date: new Date().toLocaleString(),
        },
      });
    });
    it("should return list of products", async () => {
      getProductsByCat.mockResolvedValueOnce([]);

      await getProductsByCategory(
        { params: { category: "Clothing" }, query: {} },
        mockSend
      );

      expect(mockSend.status).toHaveBeenCalledTimes(0);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, []);
    });
  });

  describe("get products paginated", () => {
    const mockSend = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };

    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return unexpected error", async () => {
      getAllProdsPaginated.mockRejectedValueOnce(new Error());

      await getAllProductsPaginated(
        { params: { category: "Clothing" }, query: {} },
        mockSend
      );

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "",
          cause: "Unexpected error",
          date: new Date().toLocaleString(),
        },
      });
    });
    it("should return list of products", async () => {
      getAllProdsPaginated.mockResolvedValueOnce([]);

      await getAllProductsPaginated(
        { params: { category: "Clothing" }, query: {} },
        mockSend
      );

      expect(mockSend.status).toHaveBeenCalledTimes(0);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, []);
    });
  });

  describe("get products by user Id", () => {
    const mockSend = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };

    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return invalid id format", async () => {
      await getProductsByUserId(
        { params: { userId: "asd" }, query: {} },
        mockSend
      );

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "Invalid id format",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    });
    it("should return all prods with that user id", async () => {
      getProdsByUserId.mockResolvedValueOnce(["prod1", "prod2"]);

      await getProductsByUserId(
        { params: { userId: "1" }, query: {} },
        mockSend
      );

      expect(mockSend.send).toHaveBeenNthCalledWith(1, ["prod1", "prod2"]);
    });
    it("should return user not found", async () => {
      getProdsByUserId.mockRejectedValueOnce(new Error("User does not exist"));

      await getProductsByUserId(
        { params: { userId: "1" }, query: {} },
        mockSend
      );

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 404);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "User does not exist",
          cause: "Not found",
          date: new Date().toLocaleString(),
        },
      });
    });
    it("should return unexpected error", async () => {
      getProdsByUserId.mockRejectedValueOnce(new Error("error"));

      await getProductsByUserId(
        { params: { userId: "1" }, query: {} },
        mockSend
      );

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "error",
          cause: "Unexpected error",
          date: new Date().toLocaleString(),
        },
      });
    });
  });

  describe("get products by user Id", () => {
    const mockSend = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };

    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return invalid id format", async () => {
      await patchProduct({ params: { id: "asd" }, query: {} }, mockSend);

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
      await patchProduct({ params: { id: "1" } }, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "Required inputs missing",
          cause: "Bad Requ∆est",
          date: new Date().toLocaleString(),
        },
      });
    });
    it("should return roduct successfully patched with the product patched", async () => {
      patchProd.mockResolvedValueOnce({});
      await patchProduct({ params: { id: "1" }, body: {} }, mockSend);

      expect(mockSend.status).toHaveBeenCalledTimes(0);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        message: "Product successfully patched",
        user: {},
      });
    });
    it("should return Product not found", async () => {
      patchProd.mockRejectedValueOnce(new Error("Product not found"));
      await patchProduct({ params: { id: "12312312312" }, body: {} }, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 404);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "Product not found",
          cause: "Product not found",
          date: new Date().toLocaleString(),
        },
      });
    });
    it("should return Product not found", async () => {
      patchProd.mockRejectedValueOnce(new Error("error test"));
      await patchProduct({ params: { id: "12312312312" }, body: {} }, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "error test",
          cause: "Unexpected error",
          date: new Date().toLocaleString(),
        },
      });
    });
  });
});
