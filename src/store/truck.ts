import {makeAutoObservable} from 'mobx';
import {makePersistable} from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TruckDetails} from '../types/truck';
import {
  dispatchTruck,
  getAllTrucks,
  getTruck,
  getUnassignedTrucks,
  truckArrived,
} from '../services/TruckService';
import {resTruckStatuses} from '../types/common';
import services from './services';
import delivery from './delivery';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {WarehouseNavParams} from '../types/navigation';
import navigateToScreen from '../utils/navigateToScreen';

class Truck {
  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'truck',
      properties: [
        'truck',
        'trucks',
        'truckItem',
        'unassignedTrucks',
        'truckRegNumber',
        'assignedTruckId',
        'isAssignTruck',
      ],
      storage: AsyncStorage,
    });
  }
  truck: TruckDetails = {} as TruckDetails;
  trucks: TruckDetails[] = [];
  truckItem: TruckDetails | undefined = undefined;
  unassignedTrucks: TruckDetails[] = [];
  truckRegNumber: string = '';
  assignedTruckId: number = 0;
  isAssignTruck: boolean = false;

  setAssignedTruck(truckId: number) {
    this.assignedTruckId = truckId;
  }
  setIsAssignTruck(bool: boolean) {
    this.isAssignTruck = bool;
  }
  setTruck(truck: TruckDetails) {
    this.truck = truck;
  }
  setTrucks(trucks: TruckDetails[]) {
    this.trucks = trucks;
  }
  setTruckItem(truck: TruckDetails | undefined) {
    this.truckItem = truck;
  }
  setUnassignedTrucks(trucks: TruckDetails[]) {
    this.trucks = trucks;
  }
  setTruckRegNumber(truckRegNumber: string) {
    this.truckRegNumber = truckRegNumber;
  }
  setAssignedTruckId(assignedTruckId: number) {
    this.assignedTruckId = assignedTruckId;
  }

  isDisabledTruck(res: TruckDetails) {
    console.log('3');
    if (res.status !== resTruckStatuses.defaultTruck) {
      services.setIsDisabled(false);
    } else {
      services.setIsDisabled(true);
    }
  }

  findAndSetTruckItem(selected: number, trucks: TruckDetails[]) {
    const findTruckItem = trucks.find(item => item.id === selected);
    this.setTruckItem(findTruckItem);
    // this.truckItem = findTruckItem;
  }

  async getTruck() {
    const responce = await getTruck(this.assignedTruckId);
    this.setTruck(responce.data);
    this.isDisabledTruck(responce.data);
    await delivery.getAllDeliveryOrders();
  }

  async getAllTrucks() {
    const responce = await getAllTrucks();
    this.setTrucks(responce.data);
    console.log('trucks: =====', this.trucks);
    return responce;
  }

  async getUnassignedTrucks(truckpurpose?: number) {
    try {
      const responce = truckpurpose
        ? await getUnassignedTrucks(truckpurpose)
        : await getUnassignedTrucks();
      this.setUnassignedTrucks(responce.data);
    } catch (error) {
      console.log('getUnassignedTrucks error');
      console.log(error);
    }
  }

  async dispatchTruck(
    truckId: number,
    qrCodeFromTruck: string,
    navigation: NativeStackNavigationProp<WarehouseNavParams>,
    parentRouteName: string,
    navigateHome: () => void,
  ) {
    const responce = await dispatchTruck(truckId, qrCodeFromTruck);
    services.setSuccessModalVisible(true);
    navigateToScreen({navigation, parentRouteName, navigateHome});
    return responce;
  }

  async truckArrived(
    truckId: number,
    qrCodeFromTruck: string,
    navigation: NativeStackNavigationProp<WarehouseNavParams>,
    parentRouteName: string,
    navigateHome: () => void,
  ) {
    const responce = await truckArrived(truckId, qrCodeFromTruck);
    services.setSuccessModalVisible(true);
    navigateToScreen({navigation, parentRouteName, navigateHome});
    return responce;
  }
}

export default new Truck();
