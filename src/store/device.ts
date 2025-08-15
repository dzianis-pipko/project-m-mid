import {makeAutoObservable} from 'mobx';
import {makePersistable} from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  registerDevice,
  deregisterDevice,
  assignDevice,
  unassignDevice,
  createDevice,
  getDevice,
} from '../services/DeviceService';
// import auth from './auth';
import truck from './truck';
import services from './services';
import authAdmin from './authAdmin';
import {TruckDetails} from '../types/truck';
import navigateToScreen from '../utils/navigateToScreen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {WarehouseNavParams} from '../types/navigation';
// import authAdmin from './authAdmin';

class Device {
  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'device',
      properties: ['regSerialNumber', 'deviceId'],
      storage: AsyncStorage,
    });
  }

  deviceId: number = 0; //???
  regSerialNumber: string = '';

  setDeviceId(deviceId: number) {
    this.deviceId = deviceId;
  }
  setRegSerialNumber(regSerialNumber: string) {
    this.regSerialNumber = regSerialNumber;
  }

  async createDevice(serialNumber: string) {
    const responce = await createDevice(serialNumber);
    this.setDeviceId(responce.data);
    return responce;
  }

  async registerDevice(serialNumber: string) {
    const responce = await registerDevice(serialNumber);
    // this.setRegSerialNumber(responce.data.serialNumber);
    // this.setDeviceId(responce.data.id);
    this.setDeviceId(1);
    return responce;
  }

  async deregisterDevice() {
    // uniqueId
    const regTestSerialNumber = 'UM-Y78676-GHT55-99';
    // const regTestSerialNumber = 'Device: TC0004';

    await deregisterDevice(regTestSerialNumber);

    services.setSuccessModalVisible(true);

    setTimeout(() => {
      services.setSuccessModalVisible(false);
      this.setDeviceId(0);
      this.setRegSerialNumber('');
      authAdmin.setAuthAdmin(false);
    }, 1500);
  }

  async getDevice() {
    const responce = await getDevice(this.deviceId);
    if (responce.data.truckId) {
      truck.setIsAssignTruck(true);
      services.setIsDisabled(false);
    } else {
      truck.setIsAssignTruck(false);
      services.setIsDisabled(true);
    }
  }

  async assignDevice(
    truckItem: TruckDetails,
    qrCodeFromTruck: string,
    navigation: NativeStackNavigationProp<WarehouseNavParams>,
    currentRouteName: string,
  ) {
    const responce = await assignDevice(
      truckItem?.id,
      this.deviceId,
      qrCodeFromTruck,
    );
    services.setIsSuccessful(true);
    truck.setAssignedTruckId(truckItem?.id);
    truck.setTruckRegNumber(truckItem.registrationNo);
    truck.setIsAssignTruck(true);
    services.setSuccessModalVisible(true);
    navigateToScreen({navigation, currentRouteName});
    return responce;
  }

  async unassignDevice(
    navigation: NativeStackNavigationProp<WarehouseNavParams>,
    parentRouteName: string,
    navigateHome: () => void,
  ) {
    const responce = await unassignDevice(truck.assignedTruckId, this.deviceId);
    services.setIsSuccessful(true);
    truck.setIsAssignTruck(false);
    services.setSuccessModalVisible(true);
    navigateToScreen({navigation, parentRouteName, navigateHome});
    return responce;
  }
}

export default new Device();
