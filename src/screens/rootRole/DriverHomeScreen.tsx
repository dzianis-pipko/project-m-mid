import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {DriverNavParams} from '../../types/navigation';

// COMPONENTS
import HomeScreenMenuItem from '../../components/HomeScreenMenuItem/HomeScreenMenuItem';
import Header from '../../components/Header/Header';
import MenuModal from '../../components/MenuModal';

// STYLES
import geo from '../../assets/images/available/geo.png';
import list from '../../assets/images/available/list.png';
import scan from '../../assets/images/available/scan.png';
import geo_disabled from '../../assets/images/disabled/geo.png';

import {DARK, LIGHT_GRAY, WHITE} from '../../styles/colors';
import {useStores} from '../../store/rootStoreContext';
import {observer} from 'mobx-react-lite';
import {AxiosError} from 'axios';
import {resDeliveryStatuses} from '../../types/common';
import apiErrorHandler from '../../utils/apiErrorHandler';

const DriverHomeScreen = (): JSX.Element => {
  const {user, truck, services, delivery} = useStores();
  // TODO
  // Логика для переменных ниже
  let isDisabled = false;

  const [modalVisible, setModalVisible] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<DriverNavParams>>();

  const currentRouteIndex = navigation.getState().routes.length - 1;
  const currentRouteName = navigation.getState().routes[currentRouteIndex].name;

  const isDoneStartLoadingTruck = async () => {
    truck.getTruck().catch((error: Error | AxiosError) => {
      apiErrorHandler({error, currentRouteName});
    });
  };

  useEffect(() => {
    isDoneStartLoadingTruck();
  }, []);

  const deliveries = delivery.deliveryOrdersByTruck;
  const deliveriesFilter = deliveries.filter(
    item => item.status >= resDeliveryStatuses.loaded,
  );

  console.log('deliveriesFilter: ', deliveriesFilter.length);
  console.log('deliveries: ', deliveries.length);

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
          title="Start loading truck"
          img={
            services.isDisabled
              ? geo_disabled
              : deliveriesFilter.length === deliveries.length
              ? geo_disabled
              : geo
          }
          isDisabled={
            services.isDisabled
              ? services.isDisabled
              : deliveriesFilter.length === deliveries.length
              ? true
              : false
          }
          onItemPress={() => navigation.navigate('DeliveryOrdersToLoad')}
        />
        <HomeScreenMenuItem
          title="Deliveries list"
          img={list}
          isDisabled={isDisabled}
          onItemPress={() => navigation.navigate('DeliveryOrdersToBegin')}
        />
        <HomeScreenMenuItem
          title="Scan delivery note"
          img={scan}
          isDisabled={isDisabled}
          onItemPress={() =>
            navigation.navigate('MakeDelivery', {
              title: 'Make delivery',
              btnTitle: 'Begin delivery',
              inputTitle:
                'Or enter the delivery order number or item reference',
              inputPlaceholder: 'D/Order or Item reference',
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

export default observer(DriverHomeScreen);
