import api from '../http';
import {AxiosResponse} from 'axios';
import {AuthResponce} from '../types/user';

export const getToken = async (
  email: string,
  password: string,
  tenant: string,
): Promise<AxiosResponse<AuthResponce>> => {
  console.log(1);
  return api.post(
    '/api/tokens',
    {
      email,
      password,
    },
    {
      headers: {
        tenant,
      },
    },
  );
};

export const initialiseDatabase = async (
  tenantid: string,
  userid: string,
): Promise<AxiosResponse<string | null>> => {
  return api.post('/api/v1/utilities/initialisedatabase', {
    tenantid,
    userid,
  });
};

export const logout = async (
  email: string,
  token: string,
): Promise<AxiosResponse<string>> => {
  return api.post('/api/users/logout', {
    email: email,
    token: token,
  });
};
