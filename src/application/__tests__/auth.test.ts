const {registerUser} = require("../auth")


const postUser = require("../../domain/auth/post-user")
const postLogin = require("../../domain/auth/post-login")
jest.mock("../../domain/auth/post-user",()=>jest.fn())
jest.mock("../../domain/auth/post-login",()=>jest.fn())

describe("auth Endpoints", () => {
    const mockSend = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  
    describe("Register user", () => {
        it("should return Required data missing", async () => {
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
      
    });
  });
  