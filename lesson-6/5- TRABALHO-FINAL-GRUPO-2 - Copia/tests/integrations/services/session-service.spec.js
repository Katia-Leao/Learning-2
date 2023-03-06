require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

const User = require("../../../src/schemas/User");
const SessionController = require("../../../src/controllers/session-ctrl");
const SessionService = require("../../../src/services/session-service");
const {
  requestMock,
  requestMockByParam,
  responseMock,
} = require("../../mocks/controllers-mocks");

const userDataMock = requestMock.body;

describe("[Integration] Session Service", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_DB_URL);
    await User.create(userDataMock);
  });

  afterAll(async () => {
    await User.deleteMany({});
    mongoose.connection.close();
  });

  it("Deve retornar 200 se as credenciais forem válidas", async () => {
    const res = await SessionController.create(requestMock, responseMock);
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty("token");
  });

  it("Deve retornar 400 se o e-mail fornecido for inválido", async () => {
    const res = await SessionController.create(
      requestMockByParam({
        name: faker.name.fullName(),
        email: "invalidMail@mail",
        password: faker.internet.password(),
      }),
      responseMock
    );

    expect(res.status).toBe(400);
    expect(res.data).toBe("Email inválido");
  });

  it("Deve retornar 400 se a senha não for fornecida", async () => {
    const res = await SessionController.create(
      requestMockByParam({
        name: faker.name.fullName(),
        email: faker.internet.email(),
      }),
      responseMock
    );

    expect(res.status).toBe(400);
    expect(res.data).toBe("Senha inválida");
  });

  it("Deve retornar 404 se eusuário não for encontrado", async () => {
    const res = await SessionController.create(
      requestMockByParam({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      }),
      responseMock
    );

    expect(res.status).toBe(404);
    expect(res.data).toBe("Usuário não encontrado");
  });

  it("Deve retornar 400 se senha não for válida", async () => {
    const res = await SessionController.create(
      requestMockByParam({
        name: userDataMock.name,
        email: userDataMock.email,
        password: faker.internet.password(),
      }),
      responseMock
    );

    expect(res.status).toBe(400);
    expect(res.data).toBe("As senhas não batem");
  });

  it("Should return 500 se o token não for válido", async () => {
    jest.spyOn(SessionService, "generateToken").mockImplementationOnce(() => {
      throw new Error();
    });

    const res = await SessionController.create(requestMock, responseMock);

    expect(res.status).toBe(500);
    expect(res.data).toBe("Server Error");
  });
});
