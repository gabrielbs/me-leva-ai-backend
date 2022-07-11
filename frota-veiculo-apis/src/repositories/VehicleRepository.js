const NewLicensePlate = require('../utils/NewLicensePlate');
const Vehicle = require('../models/Vehicles');

const createVehicleAutomatic = async () => {
  return await Vehicle.create({
    model: 'Tesla Model S',
    licensePlate: NewLicensePlate(),
    status: 'busy'
  });
}

const create = async (body) => {
  return await Vehicle.create(body);
}

const paginate = async (page) => {
  return await Vehicle.paginate({}, { page, limit: 10 });
}

const getAvailableVehicle = async () => {
  return await Vehicle.findOne({ status: 'available' })
}
const setVehicleBusy = async (vehicle) => {
  vehicle.status = 'busy'
  return await Vehicle.findOneAndUpdate({_id: vehicle._id}, vehicle);
}
const setVehicleAvailable = async (vehicle) => {
  vehicle.status = 'available'
  return await Vehicle.findOneAndUpdate({_id: vehicle._id}, vehicle);
}
const findById = async (id) => {
  return await Vehicle.findById(id);
}
const findByIdAndRemove = async (id) => {
  return await Vehicle.findByIdAndRemove(id);
}


module.exports = {
  setVehicleAvailable,
  setVehicleBusy,
  getAvailableVehicle,
  createVehicleAutomatic,
  create,
  paginate,
  findById,
  findByIdAndRemove
}
