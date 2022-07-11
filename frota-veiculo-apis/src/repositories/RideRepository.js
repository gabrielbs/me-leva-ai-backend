const vehicleRepository = require('../repositories/VehicleRepository');
const Ride = require('../models/Rides')

const getRide = async (id) => {
  return await Ride.findOne({ _id: id });
}
const getRides = async (page) => {
  return await Ride.paginate({}, { page, limit: 10 });
}
const getUserRides = async (telephone, page) => {
  return await Ride.paginate({ 'user.telephone': telephone }, { page, limit: 10 });
}
const askNewRide = async (user, vehicle, startPlace, finishPlace) => {
  return await Ride.create({
    user: user,
    vehicle: vehicle,
    startPlace: startPlace,
    finishPlace: finishPlace,
    status: 'asked'
  });
}
const startRide = async (ride) => {

  ride.startTime = new Date();
  ride.status = 'started';

  return await Ride.findOneAndUpdate({ _id: ride._id }, ride);
}
const finishRide = async (ride) => {

  ride.finishTime = new Date();
  ride.status = 'finished';

  //ride.vehicle = vehicleRepository.setVehicleAvailable(ride.vehicle);
  vehicleRepository.setVehicleAvailable(ride.vehicle);

  return await Ride.findOneAndUpdate({ _id: ride._id }, ride);
}
const checkBusyUser = async (user) => {
  return await Ride.findOne({ $and: [{ "user.telephone": user.telephone }, { $or: [{ status: "asked" }, { status: "started" }] }] });
}
module.exports = {
  checkBusyUser,
  finishRide,
  startRide,
  askNewRide,
  getRide,
  getRides,
  getUserRides
}
