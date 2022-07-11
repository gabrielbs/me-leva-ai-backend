const rideService = require('../../frota-veiculo-apis/src/services/RideService');
const mockingoose = require('mockingoose');

const rideModel = require("../../frota-veiculo-apis/src/models/Rides");
const vehicleModel = require("../../frota-veiculo-apis/src/models/Vehicles");
const userModel = require("../../frota-veiculo-apis/src/models/Users");

afterEach(() => {
  jest.restoreAllMocks()
});

describe('Teste de Corrida', () => {
  test('Deverá inserir uma corrida', async () => {
    const data = {
      user: '0123456789',
      vehicle: 'xxx-0000',
      startPlace: 'Teste',
      finishPlace: 'Teste Final',
      status: 'asked'
    }


    const userData = {
      _id: "62b8df3b85371c1b1502e791",
      name: 'teste',
      email: 'teste@teste.com',
      password: '123456',
      telephone: '0123456789'
    };

    const vehicleData = {
      _id: "62bf83f8818b2e4b5795fe0c",
      licensePlate: "xxx-0000",
      model: "Tesla",
      status: "avaialable",
      createdAt: "2022-07-01T23:32:08.976Z",
    };

    //Mockando o usuario
    mockingoose(userModel).toReturn(userData, 'findOne');

    //Mockando o veículo
    mockingoose(vehicleModel).toReturn(vehicleData, 'findOne');

    const vehicleDataUpdate = {
      _id: "62bf83f8818b2e4b5795fe0c",
      licensePlate: "xxx-0000",
      model: "Tesla",
      status: "busy",
      createdAt: "2022-07-01T23:32:08.976Z",
    };
    //Mockando o veículo para o satus busy
    mockingoose(vehicleModel).toReturn(vehicleDataUpdate, 'findOneAndUpdate');

    const response = await rideService.ask(data.user, data.startPlace, data.finishPlace);
    expect(response.statusCode).toBe(201);
    expect(response.data.status).toBe('asked');
    expect(response.data.startPlace).toBe('Teste');
    expect(response.data.finishPlace).toBe('Teste Final');
    expect(JSON.parse(JSON.stringify(response.data.user))).toMatchObject(userData);
    expect(JSON.parse(JSON.stringify(response.data.vehicle))).toMatchObject(vehicleDataUpdate);
  });

  test('Deverá iniciar uma corrida', async () => {
    const status = "start";
    const rideData = {
      _id: '62c49e69b52490951c26dd70',
      user: {
        _id: '62b8df3b85371c1b1502e791',
        name: 'teste',
        email: 'teste@teste.com',
        password: '123456',
        telephone: '0123456789',
        createdAt: '2022-07-05T20:26:17.420Z'
      },
      vehicle: {
        _id: '62bf83f8818b2e4b5795fe0c',
        licensePlate: 'xxx-0000',
        model: 'Tesla',
        status: 'busy',
        createdAt: '2022-07-01T23:32:08.976Z'
      },
      startPlace: 'Teste',
      finishPlace: 'Teste Final',
      status: 'asked',
      createdAt: '2022-07-05T20:26:17.430Z'
    }

    //Mockando o getRides
    mockingoose(rideModel).toReturn(rideData, 'findOne');
    //mockando o updateStatus
    const rideDataUpdate = {
      _id: '62c49e69b52490951c26dd70',
      user: {
        _id: '62b8df3b85371c1b1502e791',
        name: 'Teste',
        email: 'teste@mail.com',
        telephone: '99999999',
        password: '123456',
        createdAt: '2022-07-05T20:26:17.420Z'
      },
      vehicle: {
        _id: '62bf83f8818b2e4b5795fe0c',
        licensePlate: 'xxx-0000',
        model: 'Tesla',
        status: 'busy',
        createdAt: '2022-07-01T23:32:08.976Z'
      },
      startPlace: 'Teste',
      finishPlace: 'Teste Final',
      status: 'started',
      createdAt: '2022-07-05T20:26:17.430Z'
    }
    mockingoose(rideModel).toReturn(rideDataUpdate, 'findOneAndUpdate');

    const response = await rideService.updateStatus(rideData._id, status);
    expect(JSON.parse(JSON.stringify(response.data))).toMatchObject(rideDataUpdate);
  });

  test('Deverá finalizar uma corrida', async () => {
    const status = "finish";
    const rideData = {
      _id: '62c49e69b52490951c26dd70',
      user: {
        _id: '62b8df3b85371c1b1502e791',
        name: 'teste',
        email: 'teste@teste.com',
        password: '123456',
        telephone: '0123456789',
        createdAt: '2022-07-05T20:26:17.420Z'
      },
      vehicle: {
        _id: '62bf83f8818b2e4b5795fe0c',
        licensePlate: 'xxx-0000',
        model: 'Tesla',
        status: 'busy',
        createdAt: '2022-07-01T23:32:08.976Z'
      },
      startPlace: 'Teste',
      finishPlace: 'Teste Final',
      status: 'started',
      createdAt: '2022-07-05T20:26:17.430Z'
    }

    //Mockando o getRides
    mockingoose(rideModel).toReturn(rideData, 'findOne');
    //mockando o updateStatus
    const rideDataUpdate = {
      _id: '62c49e69b52490951c26dd70',
      user: {
        _id: '62b8df3b85371c1b1502e791',
        name: 'Teste',
        email: 'teste@mail.com',
        telephone: '99999999',
        password: '123456',
        createdAt: '2022-07-05T20:26:17.420Z'
      },
      vehicle: {
        _id: '62bf83f8818b2e4b5795fe0c',
        licensePlate: 'xxx-0000',
        model: 'Tesla',
        status: 'busy',
        createdAt: '2022-07-01T23:32:08.976Z'
      },
      startPlace: 'Teste',
      finishPlace: 'Teste Final',
      status: 'finished',
      createdAt: '2022-07-05T20:26:17.430Z'
    }
    mockingoose(rideModel).toReturn(rideDataUpdate, 'findOneAndUpdate');

    const response = await rideService.updateStatus(rideData._id, status);
    expect(JSON.parse(JSON.stringify(response.data))).toMatchObject(rideDataUpdate);
  });
});

