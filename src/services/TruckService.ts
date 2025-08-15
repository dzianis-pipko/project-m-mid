import api from '../http';
import {AxiosResponse} from 'axios';
import {TruckDetails} from '../types/truck';

export const getTruck = async (
  truckId: number,
): Promise<AxiosResponse<TruckDetails>> => {
  return api.get(`/api/v1/truck/${truckId}`);
};

export const getAllTrucks = async (): Promise<
  AxiosResponse<TruckDetails[]>
> => {
  return api.get('/api/v1/truck');
};

export const getUnassignedTrucks = async (
  truckpurpose?: number,
): Promise<AxiosResponse<TruckDetails[]>> => {
  return truckpurpose
    ? api.get(`/api/v1/truck/unassigned?truckpurpose=${truckpurpose}`)
    : api.get(`/api/v1/truck/unassigned`);
};

export const dispatchTruck = async (
  truckid: number,
  qrcodefromtruck: string,
): Promise<AxiosResponse<any>> => {
  return api.put(`/api/v1/truck/dispatch`, {
    truckid,
    qrcodefromtruck,
  });
};

export const truckArrived = async (
  truckid: number,
  qrcodefromtruck: string,
): Promise<AxiosResponse<any>> => {
  return api.put(`/api/v1/truck/arrived`, {
    truckid,
    qrcodefromtruck,
  });
};
