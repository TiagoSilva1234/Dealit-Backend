const { getCategoryByMainCat, getAllMainCategories } = require("../categories");

const getCategoryMainCat = require("../../domain/categories/get-categoryById");
jest.mock("../../domain/categories/get-categoryById", () => jest.fn());
const mainCategory = require("../../domain/categories/get-allMainCategories");
jest.mock("../../domain/categories/get-allMainCategories", () => jest.fn());

describe("Categories Endpoint", () => {
  const mockSend = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };

  describe("get categories by main cat or subcat", () => {
    it("should return a custom error object if id has numbers in it", async () => {
      await getCategoryByMainCat({ params: { cat: "1234" } }, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);

      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "Invalid id format",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    });

    it("should return a successful response", async () => {
      const response = {
        main: {
          id: 2,
          name: "Clothing",
          level: 1,
          upperLevel: null,
          image:
            "https://www.macleans.ca/wp-content/uploads/2014/09/MAC36_WOMENS_CLOTHES_POST.jpg",
        },
        subcategory: {
          id: 20,
          name: "Men's Fashion",
          level: 2,
          upperLevel: "Clothing",
          image:
            "https://i.pinimg.com/originals/8d/bb/1e/8dbb1e179e04e7ab8a66e419609599fa.jpg",
        },
      };
      getCategoryMainCat.mockResolvedValueOnce(response);
      await getCategoryByMainCat(
        { params: { cat: "Men's Fashion" } },
        mockSend
      );

      expect(mockSend.status).toHaveBeenCalledTimes(0);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
    });

    it("should return a custom error object if any unexpected error is met", async () => {
      getCategoryMainCat.mockRejectedValueOnce(
        new Error("An unexpected Error")
      );
      await getCategoryByMainCat({ params: { cat: "xxx" } }, mockSend);
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

  describe("get all main categories", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return existing main categories", async () => {
      const res = [
        {
          id: 2,
          name: "Clothing",
          level: 1,
          upperLevel: null,
          image:
            "https://www.macleans.ca/wp-content/uploads/2014/09/MAC36_WOMENS_CLOTHES_POST.jpg",
          subcategories: [
            {
              id: 18,
              name: "Women's Fashion",
              level: 2,
              upperLevel: "Clothing",
              image:
                "https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?cs=srgb&dl=pexels-spencer-selover-428338.jpg&fm=jpg",
            },
          ],
        },
      ];
      mainCategory.mockResolvedValueOnce(res);
      await getAllMainCategories({}, mockSend);
      expect(mockSend.status).toHaveBeenCalledTimes(0);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, res);
    });

    it("should return a custom error object if any unexpected error is met", async () => {
      const e = new Error("An unexpected error");
      mainCategory.mockRejectedValueOnce(e);

      await getAllMainCategories({}, mockSend);
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
