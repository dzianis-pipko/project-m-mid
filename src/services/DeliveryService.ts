import api from '../http';
import {AxiosResponse} from 'axios';
import {Booking, DeliveryOrder, DeliveryOrderDetail} from '../types/delivery';

export const getAllDeliveryOrders = async (): Promise<
  AxiosResponse<DeliveryOrder[]>
> => {
  return api.get('/api/v1/deliveryorder/getall');
};

export const getDeliveryOrderByTruck = async (
  truckid: number,
): Promise<AxiosResponse<DeliveryOrder>> => {
  return api.get(`/api/v1/deliveryorder/${truckid}`);
};

export const getDeliveryOrderDetail = async (
  deliveryOrderId: number,
): Promise<AxiosResponse<DeliveryOrderDetail[]>> => {
  return api.get(`/api/v1/deliveryorderdetail/${deliveryOrderId}`);
};

// before
export const getItemsByDeliveryOrder = async (
  deliveryOrderId: number,
): Promise<AxiosResponse<DeliveryOrderDetail[]>> => {
  return api.get(
    `/api/v1/deliveryorderdetail/getitemsbydeliveryorder/${deliveryOrderId}`,
  );
};

export const getBookingById = async (
  id: number,
): Promise<AxiosResponse<Booking>> => {
  return api.get(`/api/v1/booking/${id}`);
};
