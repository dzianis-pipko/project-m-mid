import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {AuthParamList} from '../types/navigation';
import RegisterNavigator from './login/RegisterNavigator';
import LoginNavigator from './login/LoginNavigator';
import {useStores} from '../store/rootStoreContext';
import {observer} from 'mobx-react-lite';

const Stack = createNativeStackNavigator<AuthParamList>();

const AuthNavigator = () => {
  const {
    device: {regSerialNumber},
  } = useStores();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {regSerialNumber ? (
        <Stack.Screen name="LoginStack" component={LoginNavigator} />
      ) : (
        <Stack.Screen name="RegisterStack" component={RegisterNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default observer(AuthNavigator);
