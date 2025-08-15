import {makeAutoObservable} from 'mobx';
import {getRoles, getUserDetails} from '../services/UserService';
import {IRole, UserDetails} from '../types/user';
import {makePersistable} from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

class User {
  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'user',
      properties: ['roles', 'role', 'email', 'password', 'details'],
      storage: AsyncStorage,
    });
  }
  role: string = '';
  roles: IRole[] = [];
  email: string = '';
  password: string = '';
  details: UserDetails = {} as UserDetails;

  get mainRole() {
    const isDriver = this.roles.find(item => item.roleName === 'Driver');
    const isManager = this.roles.find(item => item.roleName === 'Manager');
    const isBasic = this.roles.find(item => item.roleName === 'Basic');
    const isAdmin = this.roles.find(item => item.roleName === 'Admin');
    if (isDriver) {
      return 'Driver';
    } else if (isManager) {
      return 'Manager';
    } else if (isAdmin) {
      return 'Admin';
    } else if (isBasic) {
      return 'Basic';
    } else {
      return 'ff';
    }
  }
  setRoles(roles: IRole[]) {
    this.roles = roles;
  }
  setRole(role: string) {
    this.role = role;
  }
  setDetails(details: UserDetails) {
    this.details = details;
  }
  setEmail(email: string) {
    this.email = email;
  }
  setPassword(password: string) {
    this.password = password;
  }

  async getRoles() {
    const responce = await getRoles();
    this.setRoles(responce.data);
    return responce;
  }
  async getUserDetails() {
    const responce = await getUserDetails();
    this.setDetails(responce.data);
    return responce;
  }
}

export default new User();
