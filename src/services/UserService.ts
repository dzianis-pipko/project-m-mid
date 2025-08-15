import api from '../http';
import {AxiosResponse} from 'axios';
import {IRole, UserDetails} from '../types/user';

export const getRoles = async (): Promise<AxiosResponse<IRole[]>> => {
  return api.get('/api/personal/roles');
};

export const getUserDetails = async (): Promise<AxiosResponse<UserDetails>> => {
  return api.get('/api/personal/profile');
};
