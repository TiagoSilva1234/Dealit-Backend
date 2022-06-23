const { registerUser,userLogin } = require("../auth");

const postUser = require("../../domain/auth/post-user");
const postLogin = require("../../domain/auth/post-login");
const userDataIsNotValids = require("../../utils/utils");
jest.mock("../../domain/auth/post-user", () => jest.fn());
jest.mock("../../domain/auth/post-login", () => jest.fn());
jest.mock("../../utils/utils", () => jest.fn());

describe("auth Endpoints", () => {
  const mockSend = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    cookie: jest.fn().mockReturnThis(),
  };

  describe("Register user endpoint", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    it("should return Required data missing", async () => {
      await registerUser({ body: { address: {} } }, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);

      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "Required data missing",
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    });
    it("should return Successefully saved", async () => {
      const mock = {
        body: {
          username: "Jacques Tronault",
          address: {
            country: "France",
            city: "Paris",
            zipCode: "2314123",
            street: "Rue de Mock",
            houseNumber: "532",
            isFavorite: true,
          },
          email: "jacq@email.com",
          password: "P#s5w0rd",
          phone: "923456789",
        },
      };
      const test = { check: false, cause: [""] };
      userDataIsNotValids.mockImplementationOnce(() => test);
      postUser.mockResolvedValueOnce({});
      await registerUser(mock, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 201);

      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        message: "User successfully saved to database!",
        user: {},
      });
    });
    it("should return data is not valid", async () => {
      const mock = {
        body: {
          username: "Jacques Tronault",
          address: {
            country: "France",
            city: "Paris",
            zipCode: "2314123",
            street: "Rue de Mock",
            houseNumber: "532",
            isFavorite: true,
          },

          photo: "asda",
          email: "jacq@email.com",
          password: "P#s5w0rd",
          phone: "923456789",
        },
      };

      const test = { check: true, cause: ["not valid"] };
      userDataIsNotValids.mockImplementationOnce(() => test);

      await registerUser(mock, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);

      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: ["not valid"],
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    });
    it("should return data is not valid", async () => {
      const mock = {
        body: {
          username: "Jacques Tronault",
          address: {
            country: "France",
            city: "Paris",
            zipCode: "2314123",
            street: "Rue de Mock",
            houseNumber: "532",
            isFavorite: true,
          },
          creditCard: {
            cardNumber: 123,
            cvc: 123,
            expiryDate: "asda",
          },
          photo: "asda",
          email: "jacq@email.com",
          password: "P#s5w0rd",
          phone: "923456789",
        },
      };

      const test = { check: true, cause: ["not valid"] };
      userDataIsNotValids.mockImplementationOnce(() => test);

      await registerUser(mock, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);

      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: ["not valid"],
          cause: "Bad Request",
          date: new Date().toLocaleString(),
        },
      });
    });
    it("should return user already exists", async () => {
      const mock = {
        body: {
          username: "Jacques Tronault",
          address: {
            country: "France",
            city: "Paris",
            zipCode: "2314123",
            street: "Rue de Mock",
            houseNumber: "532",
            isFavorite: true,
          },
          creditCard: {
            cardNumber: 123,
            cvc: 123,
            expiryDate: "asda",
          },
          email: "jacq@email.com",
          password: "P#s5w0rd",
          phone: "923456789",
        },
      };
      const test = { check: false, cause: [""] };
      userDataIsNotValids.mockImplementationOnce(() => test);
      postUser.mockRejectedValueOnce(
        new Error("User Already Exists. Please Login")
      );
      await registerUser(mock, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 409);

      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "User Already Exists. Please Login",
          cause: "Conflict",
          date: new Date().toLocaleString(),
        },
      });
    });
    it("should return internal server error", async () => {
      const mock = {
        body: {
          username: "Jacques Tronault",
          address: {
            country: "France",
            city: "Paris",
            zipCode: "2314123",
            street: "Rue de Mock",
            houseNumber: "532",
            isFavorite: true,
          },
          email: "jacq@email.com",
          password: "P#s5w0rd",
          phone: "923456789",
        },
      };
      const test = { check: false, cause: [""] };
      userDataIsNotValids.mockImplementationOnce(() => test);
      postUser.mockRejectedValueOnce(new Error("test"));
      await registerUser(mock, mockSend);

      expect(mockSend.status).toHaveBeenNthCalledWith(1, 500);

      expect(mockSend.send).toHaveBeenNthCalledWith(1, {
        error: {
          message: "test",
          cause: "Unexpected error",
          date: new Date().toLocaleString(),
        },
      });
    });
    describe("login user", () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });


      it("should return all inputs are required", async () => {
        await userLogin({ body: {} }, mockSend);
      expect(mockSend.status).toHaveBeenNthCalledWith(1, 400);
  
        expect(mockSend.send).toHaveBeenNthCalledWith(1, {
          error: {
            message: "All inputs are required",
            cause: "Bad Request",
            date: new Date().toLocaleString(),
          },
        });
      });
      it("should return Login successfully completed", async () => {
        postLogin.mockResolvedValueOnce({token:"teste"})
        await userLogin({ body: {email:"claudio",password:"renato"} }, mockSend);
        expect(mockSend.status).toHaveBeenCalledTimes(0);
        expect(mockSend.cookie).toHaveBeenNthCalledWith(1,"token", "teste", {"domain": ".dealit-backend.herokuapp.com", "path": "/dealit/api", "secure": true})
        expect(mockSend.send).toHaveBeenNthCalledWith(1, {
          message: "Login successfully completed",
          res: {token: "teste"},
        });
      });
      it("should return invalid credentials", async () => {
        postLogin.mockRejectedValueOnce(new Error("Invalid credentials"))

        await userLogin({ body: {email:"claudio",password:"renato"} }, mockSend);
        expect(mockSend.status).toHaveBeenNthCalledWith(1,401);

        expect(mockSend.send).toHaveBeenNthCalledWith(1, {
          error: {
            message: "Invalid credentials",
            cause: "Unauthorized",
            date: new Date().toLocaleString(),
          },
        });
      });
      it("should return internal server error", async () => {
        postLogin.mockRejectedValueOnce(new Error("test"))

        await userLogin({ body: {email:"claudio",password:"renato"} }, mockSend);
        expect(mockSend.status).toHaveBeenNthCalledWith(1,500);

        expect(mockSend.send).toHaveBeenNthCalledWith(1, {
          error: {
            message: "test",
            cause: "Unexpected error",
            date: new Date().toLocaleString(),
          },
        });
      });
    });
  });
});
