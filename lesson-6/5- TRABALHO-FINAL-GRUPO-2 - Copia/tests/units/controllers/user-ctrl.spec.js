const UserController = require("../../../src/controllers/user-ctrl");
const UserService = require("../../../src/services/user-service");

const {
  requestMock,
  requestMockWithoutEmail,
  requestMockWithoutPassword,
  responseMock,
} = require("../../mocks/controllers-mocks");

const UserServiceMock = class UserServiceMock {
  static async createUser() {
    return { id: 1 };
  }
};

describe("User Controller", () => {
  it("Deve retornar um id se um usuário for criado", async () => {
    jest
      .spyOn(UserService, "createUser")
      .mockImplementationOnce(UserServiceMock.createUser);

    const res = await UserController.create(requestMock, responseMock);
    expect(res.data).toHaveProperty("id");
  });

  it("Deve retornar status 400 se a senha não for passada como parametro", async () => {
    jest
      .spyOn(UserService, "createUser")
      .mockImplementationOnce(UserServiceMock.createUser);

    const res = await UserController.create(
      requestMockWithoutPassword,
      responseMock
    );

    expect(res.status).toBe(400);
  });

  it("Deve retornar status 400 se o email não for passado como parametro", async () => {
    jest
      .spyOn(UserService, "createUser")
      .mockImplementationOnce(UserServiceMock.createUser);

    const res = await UserController.create(
      requestMockWithoutEmail,
      responseMock
    );

    expect(res.status).toBe(400);
  });

  it("Deve retornar 200 se a senha for ok", async () => {
    jest
      .spyOn(UserService, "createUser")
      .mockImplementationOnce(UserServiceMock.createUser);

    const res = await UserController.changePassword(
      requestMockWithoutEmail,
      responseMock
    );

    expect(res.status).toBe(200);
  });

  it("Deve retornar 500 se houver erro de criação do usuário", async () => {
    jest
      .spyOn(UserService, "createUser")
      .mockImplementationOnce(UserServiceMock.createUser);

    const res = await UserController.create("", responseMock);
    expect(res.status).toBe(500);
  });
});
