import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {WarehouseNavParams} from '../../types/navigation';

// COMPONENTS
import HomeScreenMenuItem from '../../components/HomeScreenMenuItem/HomeScreenMenuItem';
import Header from '../../components/Header/Header';
import MenuModal from '../../components/MenuModal';

// STYLES
import geo from '../../assets/images/available/geo.png';
import locked from '../../assets/images/warehouse/available/locked.png';
import unlocked from '../../assets/images/warehouse/available/unlocked.png';
import geo_disabled from '../../assets/images/disabled/geo.png';
import unlocked_disabled from '../../assets/images/warehouse/disabled/unlocked.png';

import {DARK, LIGHT_GRAY, WHITE} from '../../styles/colors';

import {getUniqueId} from 'react-native-device-info';
import {AxiosError} from 'axios';

import {useFocusEffect} from '@react-navigation/native';
import {useStores} from '../../store/rootStoreContext';
import {observer} from 'mobx-react-lite';
import apiErrorHandler from '../../utils/apiErrorHandler';

const WarehouseHomeScreen = (): JSX.Element => {
  const {
    user,
    device,
    truck: {isAssignTruck},
    services: {isDisabled},
  } = useStores();
  const [uniqueId, setUniqueId] = useState('');
  // TODO
  // Логика для переменных ниже
  const [modalVisible, setModalVisible] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<WarehouseNavParams>>();

  const currentRouteIndex = navigation.getState().routes.length - 1;
  const currentRouteName = navigation.getState().routes[currentRouteIndex].name;

  const isAssignDevice = () => {
    device.getDevice().catch((error: Error | AxiosError) => {
      apiErrorHandler({error, currentRouteName});
    });
  };

  useEffect(() => {
    if (!uniqueId) {
      getUniqueId().then(uniqueId => {
        setUniqueId(uniqueId);
      });
    }
  }, [uniqueId]);

  useFocusEffect(() => {
    isAssignDevice();
  });

  return (
    <View style={styles.container}>
      <Header modalVisible={modalVisible} setModalVisible={setModalVisible} />

      <View style={styles.mainContent}>
        <Text style={styles.title}>
          Welcome
          <Text style={[styles.title, styles.highlightedPart]}>
            {' '}
            {user.details.firstName}
          </Text>
        </Text>
        <HomeScreenMenuItem
          title="Assign Truck"
          img={locked}
          onItemPress={() => {
            if (isAssignTruck) {
              navigation.navigate('AssignedTruckDetails');
            } else {
              navigation.navigate('AssignTruck', {
                title: 'Assign device to truck',
                btnTitle: 'Assign',
                subtitle: 'Use this screen to assign this device to a truck',
              });
            }
          }}
        />
        <HomeScreenMenuItem
          title="Dispatch Truck"
          img={isDisabled ? unlocked_disabled : unlocked}
          isDisabled={isDisabled}
          onItemPress={() =>
            navigation.navigate('DispatchTruck', {
              title: 'Use this screen to mark a truck as dispatched',
              btnTitle: 'Next',
            })
          }
        />
        <HomeScreenMenuItem
          title="Truck Arrived"
          img={isDisabled ? geo_disabled : geo}
          isDisabled={isDisabled}
          onItemPress={() =>
            navigation.navigate('TruckArrived', {
              title: 'Use this screen to mark a truck as returned',
              btnTitle: 'Next',
            })
          }
        />
      </View>

      <MenuModal
        isHomeScreen
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        isDisabled={isDisabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 0,
    backgroundColor: WHITE,
  },
  mainContent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
    width: '100%',
  },
  logo: {
    width: 168,
    height: 36,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: LIGHT_GRAY,
    paddingVertical: 12,
    width: '100%',
    marginBottom: 40,
  },
  title: {
    fontFamily: 'poppins_medium',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 24,
    color: DARK,

    textAlign: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  highlightedPart: {
    fontFamily: 'poppins_semibold',
  },
});

export default observer(WarehouseHomeScreen);
