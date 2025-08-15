import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {DriverNavParams} from '../../types/navigation';
import DriverHomeScreen from '../../screens/rootRole/DriverHomeScreen';
import ScanQrScreen from '../../screens/driver/ScanQrScreen';
import DeliveryDetails from '../../screens/driver/DeliveryDetailsScreen';
import ActionFailed from '../../screens/ActionFailed';
import ActionSuccessful from '../../screens/ActionSuccessful';
import ReviewAndSignScreen from '../../screens/driver/ReviewAndSignScreen';
import DeliveryOrdersScreen from '../../screens/DeliveryOrdersScreen';
import {observer} from 'mobx-react-lite';

const Stack = createNativeStackNavigator<DriverNavParams>();

const DriverNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="DriverHome"
        component={DriverHomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MakeDelivery"
        component={ScanQrScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ScanToUnload"
        component={ScanQrScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ScanToLoad"
        component={ScanQrScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DeliveryDetails"
        component={DeliveryDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ActionFailed"
        component={ActionFailed}
        options={{headerShown: false}}
        initialParams={{hasHomeBtn: false}}
      />
      <Stack.Screen
        name="ActionSuccessful"
        component={ActionSuccessful}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReviewAndSign"
        component={ReviewAndSignScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DeliveryOrdersToBegin"
        component={DeliveryOrdersScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DeliveryOrdersToLoad"
        component={DeliveryOrdersScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default observer(DriverNavigator);
