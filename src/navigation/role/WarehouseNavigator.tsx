import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {WarehouseNavParams} from '../../types/navigation';
import WarehouseHomeScreen from '../../screens/rootRole/WarehouseHomeScreen';
import ScanQrScreen from '../../screens/warehouse/ScanQrScreen';
import ActionFailed from '../../screens/ActionFailed';
import AssignedTruckDetailsScreen from '../../screens/warehouse/AssignedTruckDetailsScreen';
import YesNoActionScreen from '../../screens/YesNoActionScreen';
import DeliveryOrdersScreen from '../../screens/DeliveryOrdersScreen';
import AdminFunctionsScreen from '../../screens/warehouse/AdminFunctionsScreen';
import {useStores} from '../../store/rootStoreContext';
import {observer} from 'mobx-react-lite';

const Stack = createNativeStackNavigator<WarehouseNavParams>();

const WarehouseNavigator = () => {
  const {truck} = useStores();

  useEffect(() => {
    truck.getAllTrucks();
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="WarehouseHome"
        component={WarehouseHomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AssignTruck"
        component={ScanQrScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DispatchTruck"
        component={ScanQrScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TruckArrived"
        component={ScanQrScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AssignedTruckDetails"
        component={AssignedTruckDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="YesNoActionScreen"
        component={YesNoActionScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DeliveryOrdersScreen"
        component={DeliveryOrdersScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AdminFunctionsScreen"
        component={AdminFunctionsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ActionFailed"
        component={ActionFailed}
        options={{headerShown: false}}
        initialParams={{title: 'Unable to assign device to truck'}}
      />
    </Stack.Navigator>
  );
};

export default observer(WarehouseNavigator);
