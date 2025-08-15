import {NavigatorScreenParams} from '@react-navigation/native';

// export type NavParams = {
//   MainLogin: undefined;
//   LoginDenied: undefined;
//   WarehouseNav: undefined;
//   DriverNav: undefined;
//   DeregisterDevice: undefined;
//   RegisterDevice: undefined;
//   ActionFailed: {
//     title: string;
//     errorText: string;
//     hasHomeBtn?: boolean;
//     onRetryPress: () => void;
//   };
// };

// export type CommonNavParams = {
//   // TODO
//   // ActionFailed
//   // DeliveryOrdersScreen
// };
// export type WarehouseNavParams = {
//   WarehouseHome: undefined;
//   AssignTruck: {title: string; subtitle?: string; btnTitle: string};
//   DispatchTruck: {title: string; subtitle?: string; btnTitle: string};
//   TruckArrived: {title: string; subtitle?: string; btnTitle: string};
//   ActionFailed: {
//     title: string;
//     errorText: string;
//     hasHomeBtn?: boolean;
//     onRetryPress: () => void;
//   };
//   AssignedTruckDetails: undefined;
//   YesNoActionScreen: {truckRegNumber?: string; title: string; truckId?: number};
//   DeliveryOrdersScreen: undefined;
//   AdminFunctionsScreen: undefined;
// };
// export type DriverNavParams = {
//   DriverHome: undefined;
//   MakeDelivery: {
//     title: string;
//     inputTitle: string;
//     inputPlaceholder: string;
//     btnTitle: string;
//   };
//   ScanToUnload: {
//     title: string;
//     inputTitle: string;
//     inputPlaceholder: string;
//     btnTitle: string;
//   };
//   ScanToLoad: {
//     title: string;
//     inputTitle: string;
//     inputPlaceholder: string;
//     btnTitle: string;
//   };
//   DeliveryDetails: undefined;
//   ActionFailed: {
//     title: string;
//     btnTitle?: string;
//     errorText: string;
//     hasHomeBtn?: boolean;
//     onRetryPress: () => void;
//   };
//   ActionSuccessful: {
//     title: string;
//     subtitle?: string;
//     btnTitle: string;
//     outlined?: boolean;
//     onPress: () => void;
//   };
//   ReviewAndSign: undefined;
//   DeliveryOrdersToBegin: undefined;
//   DeliveryOrdersToLoad: undefined;
// };

// =======

export type RootParamList = {
  MainStack: NavigatorScreenParams<MainParamList>;
  AuthStack: NavigatorScreenParams<AuthParamList>;
};

export type MainParamList = {
  WarehouseStack: NavigatorScreenParams<WarehouseNavParams>;
  DriverStack: NavigatorScreenParams<DriverNavParams>;
};

export type AuthParamList = {
  RegisterStack: NavigatorScreenParams<RegisterNavParams>;
  LoginStack: NavigatorScreenParams<LoginNavParams>;
};

export type WarehouseNavParams = {
  WarehouseHome: undefined;
  AssignTruck: {title: string; subtitle?: string; btnTitle: string};
  DispatchTruck: {title: string; subtitle?: string; btnTitle: string};
  TruckArrived: {title: string; subtitle?: string; btnTitle: string};
  ActionFailed: {
    title: string;
    errorText: string;
    hasHomeBtn?: boolean;
    onRetryPress: () => void;
  };
  AssignedTruckDetails: undefined;
  YesNoActionScreen: {truckRegNumber?: string; title: string; truckId?: number};
  DeliveryOrdersScreen: undefined;
  AdminFunctionsScreen: undefined;
};

export type DriverNavParams = {
  DriverHome: undefined;
  MakeDelivery: {
    title: string;
    inputTitle: string;
    inputPlaceholder: string;
    btnTitle: string;
  };
  ScanToUnload: {
    title: string;
    inputTitle: string;
    inputPlaceholder: string;
    btnTitle: string;
  };
  ScanToLoad: {
    title: string;
    inputTitle: string;
    inputPlaceholder: string;
    btnTitle: string;
  };
  DeliveryDetails: undefined;
  ActionFailed: {
    title: string;
    btnTitle?: string;
    errorText: string;
    hasHomeBtn?: boolean;
    onRetryPress: () => void;
  };
  ActionSuccessful: {
    title: string;
    subtitle?: string;
    btnTitle: string;
    outlined?: boolean;
    onPress: () => void;
  };
  ReviewAndSign: undefined;
  DeliveryOrdersToBegin: undefined;
  DeliveryOrdersToLoad: undefined;
};

export type RegisterNavParams = {
  RegisterDevice: undefined;
  ActionFailed: {
    title: string;
    errorText: string;
    hasHomeBtn?: boolean;
    onRetryPress: () => void;
  };
};

export type LoginNavParams = {
  MainLogin: undefined;
  LoginDenied: undefined;
  DeregisterDevice: undefined;
  ActionFailed: {
    title: string;
    errorText: string;
    hasHomeBtn?: boolean;
    onRetryPress: () => void;
  };
};
