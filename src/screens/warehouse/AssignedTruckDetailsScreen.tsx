import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {WarehouseNavParams} from '../../types/navigation';

// COMPONENTS
import Header from '../../components/Header/Header';
import MenuModal from '../../components/MenuModal';
import MainButton from '../../components/MainButton/MainButton';
import LabelValueItem from '../../components/LabelValueItem';

// STYLES
import {DARK, WHITE} from '../../styles/colors';

import {observer} from 'mobx-react-lite';
import {useStores} from '../../store/rootStoreContext';

const AssignedTruckDetails = (): JSX.Element => {
  const {delivery, truck} = useStores();
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    delivery.getAllDeliveryOrders();
  }, [delivery]);

  const truckRegNumber = truck.truckRegNumber;
  const totalDeliveryOrders = delivery.getTotalDeliveryOrdersByTruck;
  const totalNumberOfPackages = delivery.getTotalNumberOfPackagesByTruck;

  const navigation =
    useNavigation<NativeStackNavigationProp<WarehouseNavParams>>();

  const navigateToUnassignDevice = () => {
    navigation.navigate('YesNoActionScreen', {
      truckRegNumber: truckRegNumber,
      title: 'Unassign this device?',
    });
  };
  const navigateToDeliveryOrders = () =>
    navigation.navigate('DeliveryOrdersScreen');

  return (
    <View style={styles.container}>
      <Header
        modalVisible={menuVisible}
        setModalVisible={setMenuVisible}
        containerStyles={styles.header}
      />

      <View style={styles.mainContent}>
        <Text style={[styles.text, styles.title]}>
          This device has been assigned
        </Text>
        <LabelValueItem label="Registration number" value={truckRegNumber} />
        <LabelValueItem
          label="Total delivery orders"
          value={String(totalDeliveryOrders)}
        />
        <LabelValueItem
          label="Total number of packages"
          value={String(totalNumberOfPackages)}
        />

        <MainButton
          onPress={navigateToDeliveryOrders}
          containerStyles={styles.btnContainerStyles}
          title="View deliveries"
        />
        <MainButton
          onPress={navigateToUnassignDevice}
          outlined
          title="Unassign device"
        />
      </View>

      <MenuModal modalVisible={menuVisible} setModalVisible={setMenuVisible} />
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
    marginBottom: 14,
  },
});

export default observer(AssignedTruckDetails);
