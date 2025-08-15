import React, {Dispatch, SetStateAction} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  ImageBackground,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {DriverNavParams, WarehouseNavParams} from '../types/navigation';

// COMPONENTS
import Header from './Header/Header';

// STYLES

import {DARK, GREEN} from '../styles/colors';
import menu_bg from '../assets/images/menu_bg.png';
import {hitSlop} from '../styles/common';
import {useStores} from '../store/rootStoreContext';

interface MenuModalProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  setSuccessModalVisible?: Dispatch<SetStateAction<boolean>>;
  isHomeScreen?: boolean;
  isDisabled?: boolean;
  isAssignTruck?: boolean;
}

const MenuModal = ({
  modalVisible,
  setModalVisible,
  setSuccessModalVisible,
  isHomeScreen,
  isDisabled,
}: MenuModalProps): JSX.Element => {
  const {user, truck, auth} = useStores();
  const role = user.mainRole;
  console.log(role);

  // TODO
  // Логика для переменной ниже
  const truckNumber = truck.truckRegNumber;

  const driverNavigation =
    useNavigation<NativeStackNavigationProp<DriverNavParams>>();

  const warehouseNavigation =
    useNavigation<NativeStackNavigationProp<WarehouseNavParams>>();

  const navigateHome = () => {
    switch (user.mainRole) {
      case 'Manager':
        warehouseNavigation.navigate('WarehouseHome');
        setModalVisible(false);
        break;
      case 'Driver':
        driverNavigation.navigate('DriverHome');
        setModalVisible(false);
        break;
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <ImageBackground
        source={menu_bg}
        resizeMode="cover"
        style={styles.modalView}>
        <Header
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          containerStyles={styles.header}
        />
        <View style={styles.menu}>
          <Pressable
            hitSlop={hitSlop}
            style={styles.pressable}
            onPress={() => {
              if (role === 'Driver') {
                !isHomeScreen && driverNavigation.popToTop();
                driverNavigation.navigate('DeliveryOrdersToLoad');
              } else {
                if (truck.isAssignTruck) {
                  !isHomeScreen && warehouseNavigation.popToTop();
                  warehouseNavigation.navigate('AssignedTruckDetails');
                } else {
                  !isHomeScreen && warehouseNavigation.popToTop();
                  warehouseNavigation.navigate('AssignTruck', {
                    title: 'Assign device to truck',
                    btnTitle: 'Assign',
                    subtitle:
                      'Use this screen to assign this device to a truck',
                  });
                }
              }

              setModalVisible(false);
              setSuccessModalVisible && setSuccessModalVisible(false);
            }}>
            <Text style={styles.menuText}>
              {role === 'Driver' ? 'Start loading truck' : 'Assign Truck'}
            </Text>
          </Pressable>
          <Pressable
            disabled={isDisabled}
            hitSlop={hitSlop}
            style={styles.pressable}
            onPress={() => {
              if (role === 'Driver') {
                !isHomeScreen && driverNavigation.popToTop();
                driverNavigation.navigate('DeliveryOrdersToBegin');
              } else {
                !isHomeScreen && warehouseNavigation.popToTop();
                warehouseNavigation.navigate('DispatchTruck', {
                  title: 'Use this screen to mark a truck as dispatched',
                  btnTitle: 'Next',
                });
              }

              setModalVisible(false);
              setSuccessModalVisible && setSuccessModalVisible(false);
            }}>
            <Text style={styles.menuText}>
              {role === 'Driver' ? 'Deliveries list' : 'Truck Dispatched'}
            </Text>
          </Pressable>
          <Pressable
            disabled={isDisabled}
            hitSlop={hitSlop}
            style={styles.pressable}
            onPress={() => {
              if (role === 'Driver') {
                !isHomeScreen && driverNavigation.popToTop();
                driverNavigation.navigate('MakeDelivery', {
                  title: 'Make delivery',
                  btnTitle: 'Begin delivery',
                  inputTitle:
                    'Or enter the delivery order number or item reference',
                  inputPlaceholder: 'D/Order or Item reference',
                });
              } else {
                !isHomeScreen && warehouseNavigation.popToTop();
                warehouseNavigation.navigate('TruckArrived', {
                  title: 'Use this screen to mark a truck as returned',
                  btnTitle: 'Next',
                });
              }

              setModalVisible(false);
              setSuccessModalVisible && setSuccessModalVisible(false);
            }}>
            <Text style={styles.menuText}>
              {role === 'Driver' ? 'Scan delivery note' : 'Truck Arrived'}
            </Text>
          </Pressable>
          <Pressable
            hitSlop={hitSlop}
            style={styles.pressable}
            onPress={navigateHome}>
            <Text style={styles.menuText}>Go home</Text>
          </Pressable>
          <Pressable
            hitSlop={hitSlop}
            style={styles.pressable}
            onPress={() => {
              auth.logout();
            }}>
            <Text style={styles.menuText}>Log out</Text>
          </Pressable>
          {role === 'Manager' && (
            <Pressable
              hitSlop={hitSlop}
              style={[styles.pressable, styles.pressableBoldContainer]}
              onPress={() => {
                warehouseNavigation.navigate('AdminFunctionsScreen');
                setModalVisible(false);
                setSuccessModalVisible && setSuccessModalVisible(false);
              }}>
              <Text style={[styles.menuText, styles.pressableBoldText]}>
                Admin Functions
              </Text>
            </Pressable>
          )}
        </View>
        {truck.isAssignTruck && (
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalText}>Truck registration number</Text>
            <Text style={styles.modalText}>{truckNumber}</Text>
          </View>
        )}
      </ImageBackground>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    marginBottom: 55,
  },
  modalView: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 24,
  },
  menu: {
    flex: 1,
  },
  pressable: {
    marginBottom: 26,
  },
  pressableBoldContainer: {
    marginTop: 26,
  },
  pressableBoldText: {
    fontFamily: 'poppins_medium',
  },
  menuText: {
    fontFamily: 'poppins_regular',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 27,
    color: DARK,
  },
  modalText: {
    fontFamily: 'poppins_semibold',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 24,
    color: GREEN,
    marginBottom: 4,
  },
  modalTextContainer: {
    marginBottom: 34,
  },
});

export default MenuModal;
