import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {WarehouseNavParams} from '../types/navigation';

// COMPONENTS
import Header from '../components/Header/Header';
import MenuModal from '../components/MenuModal';
import MainButton from '../components/MainButton/MainButton';
import LabelValueItem from '../components/LabelValueItem';
import SuccessModal from '../components/SuccessModal';

// STYLES
import {DARK, WHITE} from '../styles/colors';

import {AxiosError} from 'axios';
import {useStores} from '../store/rootStoreContext';
import apiErrorHandler from '../utils/apiErrorHandler';
import {observer} from 'mobx-react-lite';

const YesNoActionScreen = (): JSX.Element => {
  const {device, truck, services} = useStores();
  const [menuVisible, setMenuVisible] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<WarehouseNavParams>>();
  const route = useRoute<RouteProp<WarehouseNavParams, 'YesNoActionScreen'>>();

  const currentRouteIndex = navigation.getState().routes.length - 1;
  const parentRouteName =
    navigation.getState().routes[currentRouteIndex - 1].name;

  const navigateHome = () => navigation.navigate('WarehouseHome');

  const title = route.params?.title;
  const truckRegNumber = route.params?.truckRegNumber;
  const truckId = route.params?.truckId;

  let successModalTitle = '';
  let errorTitle = '';

  let onPressNoBtn = navigateHome;
  switch (parentRouteName) {
    case 'AssignedTruckDetails':
      successModalTitle = 'Device has been unassigned';
      errorTitle = 'Unable to unassign truck';
      break;
    case 'DispatchTruck':
      successModalTitle = 'Truck has been dispatched';
      errorTitle = 'Unable to dispatched this truck';
      break;
    case 'TruckArrived':
      successModalTitle = 'Truck returned to warehouse';
      errorTitle = 'Unable to mark truck as arrived';
      onPressNoBtn = navigation.goBack;
      break;
  }

  const sendRequest = async () => {
    switch (parentRouteName) {
      case 'AssignedTruckDetails':
        device
          .unassignDevice(navigation, parentRouteName, navigateHome)
          .catch((error: Error | AxiosError) => {
            apiErrorHandler({
              error,
              navigation,
              parentRouteName,
              errorTitle,
              sendRequest,
            });
          });
        break;
      case 'DispatchTruck':
        if (truckId) {
          truck
            .dispatchTruck(
              truckId,
              '',
              navigation,
              parentRouteName,
              navigateHome,
            )
            .catch((error: Error | AxiosError) => {
              apiErrorHandler({
                error,
                navigation,
                parentRouteName,
                errorTitle,
                sendRequest,
              });
            });
        }
        break;
      case 'TruckArrived':
        if (truckId) {
          truck
            .truckArrived(
              truckId,
              '',
              navigation,
              parentRouteName,
              navigateHome,
            )
            .catch((error: Error | AxiosError) => {
              apiErrorHandler({
                error,
                navigation,
                parentRouteName,
                errorTitle,
                sendRequest,
              });
            });
        }
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        modalVisible={menuVisible}
        setModalVisible={setMenuVisible}
        containerStyles={styles.header}
      />

      <View style={styles.mainContent}>
        <Text style={[styles.text, styles.title]}>{title}</Text>
        <LabelValueItem
          label="Registration number"
          value={truckRegNumber ? truckRegNumber : ''}
        />

        <View style={styles.btnsRow}>
          <MainButton
            onPress={sendRequest}
            containerStyles={styles.btnContainerStyles}
            title="Yes"
          />
          <MainButton onPress={onPressNoBtn} outlined title="No" />
        </View>
      </View>

      <MenuModal modalVisible={menuVisible} setModalVisible={setMenuVisible} />
      <SuccessModal
        modalVisible={services.successModalVisible}
        menuModalVisible={menuVisible}
        setMenuModalVisible={setMenuVisible}
        successModalTitle={successModalTitle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: WHITE,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
    width: '100%',
    paddingTop: 40,
  },
  header: {
    marginBottom: 0,
  },
  title: {
    fontFamily: 'poppins_semibold',
    fontSize: 20,
    lineHeight: 30,
    marginBottom: 40,
    maxWidth: 275,
    textAlign: 'center',
  },
  text: {
    fontFamily: 'poppins_regular',
    fontStyle: 'normal',
    color: DARK,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
  },
  btnContainerStyles: {
    marginRight: 16,
  },
  btnsRow: {
    flexDirection: 'row',
  },
});

export default observer(YesNoActionScreen);
