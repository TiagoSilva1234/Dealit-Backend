const {
  postAddress,
  setFavoriteAddress,
  getAddressesByUserId,
  getAddressAutocomplete,
} = require("../addresses");

const postAdd = require("../../Domain/addresses/post-address");
jest.mock("../../Domain/addresses/post-address", () => jest.fn());
const setAddressIsFavorite = require("../../domain/addresses/patch-adressIsFavorite");
jest.mock("../../Domain/addresses//patch-adressIsFavorite", () => jest.fn());
const getAddsByUserId = require("../../domain/addresses/get-addressByUserId");
jest.mock("../../Domain/addresses/get-addressByUserId", () => jest.fn());
const getAddressAuto = require("../../domain/addresses/get-addressAuto");
jest.mock("../../Domain/addresses/get-addressAuto", () => jest.fn());

describe("Addresses Endpoint", () => {
  const mockSend = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  };

  describe("get addresses by user id", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should return a custom error object if id has letters in it", async () => {
      await getAddressesByUserId({ params: { userId: "q" } }, mockSend);

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
      getAddsByUserId.mockRejectedValueOnce(new Error("User does not exist"));
      await getAddressesByUserId({ params: { userId: "9" } }, mockSend);
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
          id: 4,
          country: "Portugal",
          city: "Porto",
          zipCode: "4000-543",
          street: "Rua do Porto",
          houseNumber: "534",
          isFavorite: true,
          userId: 0,
        },
        {
          id: 6,
          country: "United States",
          city: "Silicon Valley",
          zipCode: "90041",
          street: "Sili Street",
          houseNumber: "332",
          isFavorite: false,
          userId: 0,
        },
      ];
      getAddsByUserId.mockResolvedValueOnce(response);
      await getAddressesByUserId({ params: { userId: 0 } }, mockSend);

      expect(mockSend.status).toHaveBeenCalledTimes(0);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
    });

    it("should return a custom error object if any unexpected error is met", async () => {
      getAddsByUserId.mockRejectedValueOnce(new Error("An unexpected Error"));
      await getAddressesByUserId({ params: { userId: "0" } }, mockSend);
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

  describe("post address", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return a custom error if required data is missing", async () => {
      await postAddress({ body: {} }, mockSend);
      expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "Required data missing",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    });

    it("should return a custom error if an unexpected error occurs", async () => {
      const mockReq = {
        body: {
          country: "United States",
          city: "Silicon Valley",
          zipCode: "90041",
          street: "Sili Street",
          houseNumber: "332",
          isFavorite: false,
          userId: 0,
        },
      };

      postAdd.mockRejectedValueOnce(new Error("An unexpected error"));

      await postAddress(mockReq, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "An unexpected error",
          cause: "Unexpected error",
          date: new Date().toLocaleString(),
        },
      });
    });

    it("should return a successful response", async () => {
      const response = {
        message: "Address successfully saved to database",
        address: {
          country: "United States",
          city: "Silicon Valley",
          zipCode: "90041",
          street: "Sili Street",
          houseNumber: "332",
          isFavorite: false,
          userId: 0,
        },
      };
      const mockReq = {
        body: {
          country: "United States",
          city: "Silicon Valley",
          zipCode: "90041",
          street: "Sili Street",
          houseNumber: "332",
          isFavorite: false,
          userId: 0,
        },
      };
      postAdd.mockResolvedValueOnce(mockReq.body);
      await postAddress(mockReq, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 201);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
    });
  });

  describe("set favorite address", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return a custom error if id has letters", async () => {
      await setFavoriteAddress({ params: { id: "f" } }, mockSend);
      expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "Invalid id format",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    });

    it("should return a custom error if an unexpected error occurs", async () => {
      setAddressIsFavorite.mockRejectedValueOnce(
        new Error("An unexpected error")
      );

      await setFavoriteAddress({ params: { id: "0" } }, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "An unexpected error",
          cause: "Unexpected error",
          date: new Date().toLocaleString(),
        },
      });
    });

    it("should return a successful response", async () => {
      const response = {
        message: "Favorite address successfully updated",
        address: {
          country: "United States",
          city: "Silicon Valley",
          zipCode: "90041",
          street: "Sili Street",
          houseNumber: "332",
          isFavorite: false,
          userId: 0,
        },
      };
      setAddressIsFavorite.mockResolvedValueOnce(response.address);
      await setFavoriteAddress({ params: { id: "0" } }, mockSend);

      expect(mockSend.status).toHaveBeenCalledTimes(0);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, response);
    });
  });

  describe("get address autocomplete", () => {
    it("should return a custom error query param is not of string type", async () => {
      await getAddressAutocomplete(
        { query: { text: ["asd", "sdf"] } },
        mockSend
      );
      expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "Invalid query parameter type",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    });

    it("should return a custom error if an unexpected error occurs", async () => {
      getAddressAuto.mockRejectedValueOnce(new Error("An unexpected error"));

      await getAddressAutocomplete({ query: { text: "porto" } }, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "An unexpected error",
          cause: "Unexpected error",
          date: new Date().toLocaleString(),
        },
      });
    });

    it("should return a successful response", async () => {
      const mockRes = [{ address: "a" }, { address: "b" }];
      getAddressAuto.mockResolvedValueOnce(mockRes);

      await getAddressAutocomplete({ query: { text: "porto" } }, mockSend);

     // expect(mockSend.status).toHaveBeenCalledTimes(0);
      expect(mockSend.send).toHaveBeenNthCalledWith(1, mockRes);
    });
  });
});
