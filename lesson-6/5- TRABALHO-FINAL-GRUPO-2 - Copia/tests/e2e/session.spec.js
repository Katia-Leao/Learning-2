require("dotenv").config();

const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../src/app");

const User = require("../../src/schemas/User");

const { requestMock } = require("../mocks/controllers-mocks");
const userDataMock = requestMock.body;

describe("[E2E] Session Service", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_DB_URL);
    await User.create(userDataMock);
  });

  afterAll(async () => {
    await User.deleteMany({});
    mongoose.connection.close();
  });

  it("Deve retornar 200 se a sessão for criada", async () => {
    const res = await request(app).post("/session").send({
      email: userDataMock.email,
      password: userDataMock.password,
    });

    expect(res.status).toBe(200);
  });

  it("Deve retornar 400 se senha não coincidir", async () => {
    const res = await request(app).post("/session").send({
      email: userDataMock.email,
      password: "any_password",
    });

    expect(res.status).toBe(400);
  });

  it("Deve retornar 400 se e-mail não for fornecido", async () => {
    const res = await request(app).post("/session").send({
      password: userDataMock.password,
    });

    expect(res.status).toBe(400);
  });

  it("Deve retornar 404 se usuário não existir", async () => {
    const res = await request(app).post("/session").send({
      email: "any_user@mail.com",
      password: userDataMock.password,
    });

    expect(res.status).toBe(404);
  });
});
