import {makeAutoObservable} from 'mobx';
import {makePersistable} from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getToken, initialiseDatabase} from '../services/AuthService';
import device from './device';
import services from './services';

class AuthAdmin {
  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'authAdmin',
      properties: [
        'email',
        'password',
        'tenantId',
        'token',
        'refreshToken',
        'refreshTokenExpiryTime',
        'isAuthAdmin',
        'userId',
      ],
      storage: AsyncStorage,
    });
  }

  email: string = '';
  password: string = '';
  tenantId: string = '';
  isAuthAdmin: boolean = false;
  userId: string = '';
  token: string = '';
  refreshToken: string = '';
  refreshTokenExpiryTime: string = '';

  setEmail(email: string) {
    this.email = email;
  }
  setPassword(password: string) {
    this.password = password;
  }
  setTenantId(tenantId: string) {
    this.tenantId = tenantId;
  }
  setAuthAdmin(bool: boolean) {
    this.isAuthAdmin = bool;
  }
  setUserId(userId: string) {
    this.userId = userId;
  }
  setToken(token: string) {
    this.token = token;
  }
  setRefreshToken(token: string) {
    this.refreshToken = token;
  }
  setRefreshTokenExpiryTime(time: string) {
    this.refreshTokenExpiryTime = time;
  }

  async authAdmin() {
    // uniqueId
    const regTestSerialNumber = 'UM-Y78676-GHT55-99';
    // const regTestSerialNumber = 'Device: TC0004';
    const responce = await getToken(this.email, this.password, this.tenantId);

    await this.setToken(responce.data.token);
    await this.setRefreshToken(responce.data.refreshToken);
    await this.setRefreshTokenExpiryTime(responce.data.refreshTokenExpiryTime);

    const resDevice = await device.registerDevice(regTestSerialNumber);

    services.setSuccessModalVisible(true);
    setTimeout(() => {
      services.setSuccessModalVisible(false);
      device.setRegSerialNumber(resDevice.data.serialNumber);
      this.setAuthAdmin(true);
    }, 1500);
  }

  async initialiseDatabase() {
    const responce = await initialiseDatabase(this.tenantId, this.userId);
    this.setAuthAdmin(true);
    return responce;
  }
}

export default new AuthAdmin();
