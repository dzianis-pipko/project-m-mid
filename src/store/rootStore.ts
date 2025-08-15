import auth from './auth';
import authAdmin from './authAdmin';
import delivery from './delivery';
import device from './device';
import truck from './truck';
import user from './user';
import services from './services';

class RootStore {
  auth = auth;
  authAdmin = authAdmin;
  delivery = delivery;
  device = device;
  truck = truck;
  user = user;
  services = services;
}

export default RootStore;
