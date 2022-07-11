const app = require("../../frota-veiculo-apis/app");
const request = require('supertest');

describe("User", () => {

  it("should create a user", async () => {
    const user = {
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
      telephone: '0123456789'
    }
    const response = await request(app).post("/api/user").send(user);

    expect(response.statusCode).toBe(201);

  });
});
