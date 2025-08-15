import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {observer} from 'mobx-react-lite';

// COMPONENTS
import Header from '../components/Header/Header';
import LabelStatus from '../components/LabelStatus';
import MenuModal from '../components/MenuModal';
import CollapsibleItem from '../components/warehouse/CollapsibleItem';
import DeliveryDetailsRow from '../components/DeliveryDetailsRow';

// STYLES
import {DARK, LIGHT_GRAY, WHITE} from '../styles/colors';
import {DriverNavParams} from '../types/navigation';

import {AxiosError} from 'axios';
import {useStores} from '../store/rootStoreContext';
import apiErrorHandler from '../utils/apiErrorHandler';
import statusDetermination from '../utils/statusDetermination';
import sortingDeliveryOrdersToBegin from '../utils/sortingDeliveryOrdersToBegin';

const DeliveryOrdersScreen = (): JSX.Element => {
  const {delivery} = useStores();
  const [menuVisible, setMenuVisible] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<DriverNavParams>>();

  const currentRouteIndex = navigation.getState().routes.length - 1;
  const currentRouteName = navigation.getState().routes[currentRouteIndex].name;

  useEffect(() => {
    delivery.getAllDeliveryOrders().catch((error: Error | AxiosError) => {
      apiErrorHandler({error, currentRouteName});
    });
  }, [delivery, currentRouteName]);

  // TODO
  // получение данных
  // const deliveries = [
  //   {
  //     id: 1,
  //     status: 20,
  //     deliveryAddressLine1: '19 Westgate Road Cranworth Billington 42/2',
  //     bolReference: 'RT6874/03A',
  //     consigneeName: 'Tom`s Clothing Ltd',
  //     contatctNo: '0202222222',
  //     nop: '11',
  //   },
  // ];

  const deliveries = delivery.deliveryOrdersByTruck;
  // const deliveriesCopy = deliveries.slice();
  const boocingsByTruck = delivery.bookingsByTruck;
  console.log('boocingsByTruck: ', boocingsByTruck);

  let btnTitle: string = '';
  // let btnAction: undefined | (() => void) = undefined;
  let btnAction: () => void;

  switch (currentRouteName) {
    case 'DeliveryOrdersToBegin':
      // sort for "Deliveries List"

      sortingDeliveryOrdersToBegin(currentRouteName);

      btnTitle = 'Begin delivery';
      btnAction = () => {
        navigation.popToTop();
        navigation.navigate('MakeDelivery', {
          title: 'Make delivery',
          btnTitle: 'Begin delivery',
          inputTitle: 'Or enter the delivery order number or item reference',
          inputPlaceholder: 'D/Order or Item reference',
        });
      };
      break;
    case 'DeliveryOrdersToLoad':
      // sort for "Start Loading Truck"
      sortingDeliveryOrdersToBegin(currentRouteName);

      btnTitle = 'Start loading';
      btnAction = () =>
        navigation.navigate('ScanToLoad', {
          title: `Loading Delivery Order ${deliveries[0].bolReference}`,
          btnTitle: 'Load',
          inputTitle: 'Or enter item reference',
          inputPlaceholder: 'Item reference',
        });
      break;
  }

  return (
    <View style={styles.container}>
      <Header
        modalVisible={menuVisible}
        setModalVisible={setMenuVisible}
        containerStyles={styles.header}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <Text style={[styles.text, styles.title]}>Delivery Orders</Text>
        <View style={styles.mainContent}>
          {delivery.sortingDeliveryOrdersByTruck.map((item, index) => {
            const bookingOfDeliveryOrder = boocingsByTruck.find(booking => {
              return booking.bookingId === item.id;
            });

            return (
              <CollapsibleItem
                key={`${item.bolReference}${index}`}
                btnTitle={index === 0 ? btnTitle : undefined}
                btnAction={index === 0 ? btnAction : undefined}
                labelStatus={statusDetermination(item.status)}
                address={`${item.deliveryAddressLine1} ${item.deliveryAddressLine2} ${item.deliveryAddressLine3}`}>
                <DeliveryDetailsRow
                  label="BoL"
                  value={`${item.bolReference}`}
                />
                <DeliveryDetailsRow
                  label="Consignee"
                  value={`${item.consigneeName}`}
                />
                <DeliveryDetailsRow
                  label="Delivery address"
                  value={`${item.deliveryAddressLine1} ${item.deliveryAddressLine2} ${item.deliveryAddressLine3}`}
                />
                <DeliveryDetailsRow
                  label="Contatct No."
                  value={`item.contatctNo`}
                />
                <DeliveryDetailsRow
                  label="NOP"
                  value={String(bookingOfDeliveryOrder?.numberOfPackages)}
                />
                <DeliveryDetailsRow label="Status">
                  <LabelStatus status={statusDetermination(item.status)} />
                </DeliveryDetailsRow>
              </CollapsibleItem>
            );
          })}
        </View>
        <MenuModal
          modalVisible={menuVisible}
          setModalVisible={setMenuVisible}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: WHITE},
  scrollView: {
    backgroundColor: LIGHT_GRAY,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 150,
    width: '100%',
    backgroundColor: WHITE,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  header: {
    marginBottom: 0,
  },
  title: {
    fontFamily: 'poppins_semibold',
    fontSize: 20,
    lineHeight: 30,
    marginBottom: 30,
    textAlign: 'center',
    paddingTop: 40,
  },
  text: {
    fontFamily: 'poppins_regular',
    fontStyle: 'normal',
    color: DARK,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default observer(DeliveryOrdersScreen);
