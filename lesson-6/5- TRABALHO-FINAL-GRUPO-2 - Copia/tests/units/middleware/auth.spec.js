const jwt = require("jsonwebtoken");
const {
  authorizationMock,
  responseMock,
} = require("../../mocks/controllers-mocks");
const auth = require("../../../src/middlewares/auth");
let next = jest.fn();

describe("auth middleware", () => {
  it("Deve retornar status 401 se o token não for fornecido", async () => {
    const result = await auth(authorizationMock(""), responseMock, next);

    expect(result.status).toBe(401);
    expect(result.data.message).toBe("Token is not provided");
  });

  it("Deve permitir que prossiga (next) se o token for válido", async () => {
    let spy = jest
      .spyOn(jwt, "verify")
      .mockImplementationOnce(() => ({ email: "email@mail.com" }));
    const result = await auth(authorizationMock("token"), responseMock, next);

    expect(spy).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("Deve retornar 401 se o e-mail não for fornecido", async () => {
    const result = await auth(authorizationMock("token"), responseMock, next);
    expect(result.status).toBe(401);
  });
});
