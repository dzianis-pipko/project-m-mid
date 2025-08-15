import {makeAutoObservable} from 'mobx';
import {Booking, DeliveryOrder, DeliveryOrderDetail} from '../types/delivery';
import {makePersistable} from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAllDeliveryOrders,
  getBookingById,
  getDeliveryOrderByTruck,
  getDeliveryOrderDetail,
  // getDeliveryOrdersByTruck,
  getItemsByDeliveryOrder,
} from '../services/DeliveryService';
import truck from './truck';
import {configure} from 'mobx';

configure({
  enforceActions: 'never',
});

class Delivery {
  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'delivery',
      properties: [
        'allOrders',
        'truckOrder',
        'selectedOrderItems',
        'deliveryOrderDetail',
        // 'deliveryOrdersByTruck',
        // 'bookingsByTruck',
      ],
      storage: AsyncStorage,
    });
  }
  allOrders: DeliveryOrder[] = [];
  truckOrder: DeliveryOrder | {} = {};
  selectedOrderItems: DeliveryOrderDetail[] = [];
  deliveryOrderDetail: DeliveryOrderDetail[] = [];
  deliveryOrdersByTruck: DeliveryOrder[] = [];
  sortingDeliveryOrdersByTruck: DeliveryOrder[] = [];
  bookingsByTruck: Booking[] = [];

  get getTotalDeliveryOrdersByTruck() {
    return this.deliveryOrdersByTruck.length;
  }

  get getTotalNumberOfPackagesByTruck() {
    return this.bookingsByTruck.reduce(
      (acc, item) => acc + item.numberOfPackages,
      0,
    );
  }

  setAllOrders(orders: DeliveryOrder[]) {
    this.allOrders = orders;
  }
  setTruckOrder(orders: DeliveryOrder) {
    this.truckOrder = orders;
  }
  setSelectedOrderItems(orderItems: DeliveryOrderDetail[]) {
    this.selectedOrderItems = orderItems;
  }
  setDeliveryOrderDetail(orderItems: DeliveryOrderDetail[]) {
    this.deliveryOrderDetail = orderItems;
  }
  setSortingDeliveryOrdersByTruck(deliveries: DeliveryOrder[]) {
    this.sortingDeliveryOrdersByTruck = deliveries;
  }

  // ----- Delivery orders
  setDeliveryOrdersByTruck() {
    this.deliveryOrdersByTruck = this.allOrders.filter(
      item => item.truckId === truck.assignedTruckId,
    );
  }

  setBookingsByTruck(bookings: Promise<Booking>[]) {
    Promise.all(bookings).then(res => (this.bookingsByTruck = res));
  }

  getBookingByTruck() {
    const bookingsById = this.deliveryOrdersByTruck.map(item =>
      this.getBookingById(item.id).then(res => res.data),
    );
    this.setBookingsByTruck(bookingsById);
  }

  async getBookingById(id: number) {
    const responce = await getBookingById(id);
    return responce;
  }

  async getAllDeliveryOrders() {
    const responce = await getAllDeliveryOrders();
    await this.setAllOrders(responce.data);
    await this.setDeliveryOrdersByTruck();
    this.getBookingByTruck();
    return responce;
  }
  // ---//-- Delivery orders

  async getDeliveryOrderByTruck() {
    const responce = await getDeliveryOrderByTruck(truck.assignedTruckId); //?
    this.setTruckOrder(responce.data);
    return responce;
  }

  async getDeliveryOrderDetail(deliveryOrderId: number) {
    const responce = await getDeliveryOrderDetail(deliveryOrderId); //?
    this.setDeliveryOrderDetail(responce.data);
    return responce;
  }
  // before
  async getItemsByDeliveryOrder(deliveryOrderId: number) {
    const responce = await getItemsByDeliveryOrder(deliveryOrderId); //?
    this.setSelectedOrderItems(responce.data);
    return responce;
  }
}

export default new Delivery();
