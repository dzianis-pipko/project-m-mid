import {makeAutoObservable} from 'mobx';
import {makePersistable} from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getToken, logout} from '../services/AuthService';
import user from './user';
import authAdmin from './authAdmin';
import services from './services';

class Auth {
  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'auth',
      properties: [
        'tenantId',
        'email',
        'password',
        'token',
        'refreshToken',
        'refreshTokenExpiryTime',
        'isAuth',
      ],
      storage: AsyncStorage,
    });
  }
  email: string = '';
  password: string = '';
  token: string = '';
  tenantId: string = '';
  refreshToken: string = '';
  refreshTokenExpiryTime: string = '';
  isAuth: boolean = false;

  setEmail(email: string) {
    this.email = email;
  }
  setPassword(password: string) {
    this.password = password;
  }
  setAuth(bool: boolean) {
    this.isAuth = bool;
  }
  setToken(token: string) {
    this.token = token;
  }
  setTenantId(tenantId: string) {
    this.tenantId = tenantId;
  }
  setRefreshToken(token: string) {
    this.refreshToken = token;
  }
  setRefreshTokenExpiryTime(time: string) {
    this.refreshTokenExpiryTime = time;
  }

  async login() {
    const responce = await getToken(
      user.email,
      user.password,
      authAdmin.tenantId,
    );

    this.setToken(responce.data.token);
    this.setRefreshToken(responce.data.refreshToken);
    this.setRefreshTokenExpiryTime(responce.data.refreshTokenExpiryTime);

    user
      .getRoles()
      .then(() => {
        user.setRole(user.mainRole);
        return user.getUserDetails();
      })
      .then(() => {
        services.setSuccessModalVisible(true);
        setTimeout(() => {
          services.setSuccessModalVisible(false);
          this.setAuth(true);
        }, 1500);
      });
  }

  async logout() {
    const res = await logout(user.email, this.token);
    console.log('res: ', res.data);
    this.setToken('');
    this.setRefreshToken('');
    this.setRefreshTokenExpiryTime('');

    user.setEmail('');
    user.setPassword('');
    user.setRoles([]);

    this.setAuth(false);
  }
}

export default new Auth();
