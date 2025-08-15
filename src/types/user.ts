export interface AuthResponce {
  token: string;
  refreshToken: string;
  refreshTokenExpiryTime: string;
}

export interface IRole {
  description: string;
  enabled: boolean;
  roleId: string;
  roleName: string;
}

// export interface IRole {
//   id: string;
//   name: string;
//   description: string;
//   permissions: boolean | null;
// }

export interface UserDetails {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  emailConfirmed: boolean;
  phoneNumber: string;
  imageUrl: any;
}
