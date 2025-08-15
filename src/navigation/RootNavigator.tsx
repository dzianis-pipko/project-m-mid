import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogBox, StatusBar} from 'react-native';
import {RootParamList} from '../types/navigation';

import {useStores} from '../store/rootStoreContext';
import {WHITE} from '../styles/colors';
import {observer} from 'mobx-react-lite';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';

const RootNavigator = () => {
  const {
    auth: {isAuth},
  } = useStores();

  const Stack = createNativeStackNavigator<RootParamList>();

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const RootStack = observer(() => {
    const Router = isAuth ? (
      <Stack.Screen
        name="MainStack"
        component={MainNavigator}
        options={{headerShown: false}}
      />
    ) : (
      <Stack.Screen
        name="AuthStack"
        component={AuthNavigator}
        options={{headerShown: false}}
      />
    );

    return <Stack.Navigator>{Router}</Stack.Navigator>;
  });

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={WHITE} barStyle="dark-content" />
      <RootStack />
    </NavigationContainer>
  );
};

export default observer(RootNavigator);
