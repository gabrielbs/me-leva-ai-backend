const app = require("../../frota-veiculo-apis/app");
const request = require('supertest');
const jwt = require('jsonwebtoken');
const mockingoose = require('mockingoose');


const UserModel = require("../../frota-veiculo-apis/src/models/Users");
const VehicleModel = require("../../frota-veiculo-apis/src/models/Vehicles");


const mockToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY, {
    expiresIn: 3000
  });
}


describe('Testes integrados de corrida', () => {
  test('Deverá criar uma corrida', async () => {
    const data = {
      user: '0123456789',
      startPlace: 'Teste',
      finishPlace: 'Teste Final'
    }

    const user = {
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
      telephone: '0123456789'
    }
    const userParam = {
      _id: "62b8df3b85371c1b1502e791",
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
      telephone: '0123456789'
    };
    vehicleMock = {
			_id: "62bf847a818b2e4b5795fe15",
			licensePlate: "xxx-220",
			model: "Tesla",
			status: "avaialable",
			createdAt: "2022-07-01T23:34:18.760Z",
			__v: 0
		}

    const token = mockToken(user);
    //Mockando o usuario
    mockingoose(UserModel).toReturn(userParam, 'findOne');

    //Mocka o veículo para busca
    mockingoose(VehicleModel).toReturn(vehicleMock, 'findOne');

    // MOcka o veículo para atualizacao
    vehicleMock.status = "busy"
    mockingoose(VehicleModel).toReturn(vehicleMock, 'findOneAndUpdate');


    const headers = {
      "x-access-token": token
    }
    const response = await request(app).post("/api/rides").set(headers).send(data);
    expect(response.statusCode).toBe(201);
  });
});
