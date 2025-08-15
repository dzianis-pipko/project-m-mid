import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {MainParamList} from '../types/navigation';
import WarehouseNavigator from './role/WarehouseNavigator';
import DriverNavigator from './role/DriverNavigator';
import {useStores} from '../store/rootStoreContext';
import {observer} from 'mobx-react-lite';

const Stack = createNativeStackNavigator<MainParamList>();

const MainNavigator = () => {
  const {
    user,
    auth: {isAuth},
  } = useStores();

  console.log('user.mainRole: ', user.mainRole);
  console.log('auth.isAuth: ', isAuth);

  return user.mainRole === 'Manager' ? (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="WarehouseStack" component={WarehouseNavigator} />
      <Stack.Screen name="DriverStack" component={DriverNavigator} />
    </Stack.Navigator>
  ) : user.mainRole === 'Driver' ? (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="DriverStack" component={DriverNavigator} />
      <Stack.Screen name="WarehouseStack" component={WarehouseNavigator} />
    </Stack.Navigator>
  ) : user.mainRole === 'Admin' ? (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="WarehouseStack" component={WarehouseNavigator} />
      <Stack.Screen name="DriverStack" component={DriverNavigator} />
    </Stack.Navigator>
  ) : (
    <>{console.log('failed')}</>
  );
};

export default observer(MainNavigator);
