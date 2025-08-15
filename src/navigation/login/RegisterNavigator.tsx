import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RegisterNavParams} from '../../types/navigation';
import RegDeregDeviceScreen from '../../screens/login/RegDeregDeviceScreen';
import ActionFailed from '../../screens/ActionFailed';
import {observer} from 'mobx-react-lite';

const Stack = createNativeStackNavigator<RegisterNavParams>();

const RegisterNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="RegisterDevice" component={RegDeregDeviceScreen} />
      <Stack.Screen name="ActionFailed" component={ActionFailed} />
    </Stack.Navigator>
  );
};

export default observer(RegisterNavigator);
