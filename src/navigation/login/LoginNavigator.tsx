import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LoginNavParams} from '../../types/navigation';
import MainLoginScreen from '../../screens/login/MainLoginScreen';
import LoginDeniedScreen from '../../screens/login/LoginDeniedScreen';
import ActionFailed from '../../screens/ActionFailed';
import RegDeregDeviceScreen from '../../screens/login/RegDeregDeviceScreen';
import {observer} from 'mobx-react-lite';

const Stack = createNativeStackNavigator<LoginNavParams>();

const LoginNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MainLogin" component={MainLoginScreen} />
      <Stack.Screen name="DeregisterDevice" component={RegDeregDeviceScreen} />
      <Stack.Screen name="LoginDenied" component={LoginDeniedScreen} />
      <Stack.Screen name="ActionFailed" component={ActionFailed} />
    </Stack.Navigator>
  );
};

export default observer(LoginNavigator);
