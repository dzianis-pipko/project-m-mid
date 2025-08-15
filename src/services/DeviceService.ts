import api from '../http';
import {AxiosResponse} from 'axios';
// import {AuthResponce, IRole} from '../types/user';

interface ResRegDeRegDevice {
  id: number;
  serialNumber: string;
  truckId: number;
  status: number;
  tenantId: number | string | null;
}

export const createDevice = async (
  SerialNumber: string,
): Promise<AxiosResponse<number>> => {
  return api.post('/api/v1/device/', {
    SerialNumber,
  });
};

export const registerDevice = async (
  SerialNumber: string,
): Promise<AxiosResponse<ResRegDeRegDevice>> => {
  return api.post('/api/v1/device/register', {
    SerialNumber,
  });
};

export const deregisterDevice = async (
  serialNumber: string,
): Promise<AxiosResponse<ResRegDeRegDevice>> => {
  return api.put('/api/v1/device/deregister', {
    serialNumber,
  });
};

export const getDevice = async (
  deviceId: number,
): Promise<AxiosResponse<ResRegDeRegDevice>> => {
  return api.get(`/api/v1/device/${deviceId}`);
};

// TODO /api/v1/truck/assigndevice
export const assignDevice = async (
  truckid: number,
  deviceid: number,
  qrcodefromtruck: string,
): Promise<AxiosResponse<string>> => {
  return api.put('/api/v1/truck/assigndevice', {
    truckid,
    deviceid,
    qrcodefromtruck,
  });
};

// TODO /api/v1/truck/unassigndevice
export const unassignDevice = async (
  truckId: number,
  deviceId: number,
): Promise<AxiosResponse<string>> => {
  return api.put('/api/v1/truck/unassigndevice', {
    truckId,
    deviceId,
  });
};
