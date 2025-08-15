import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {WarehouseNavParams} from '../../types/navigation';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {useIsFocused} from '@react-navigation/native';

// COMPONENTS
import Header from '../../components/Header/Header';
import MenuModal from '../../components/MenuModal';
import MainButton from '../../components/MainButton/MainButton';
import DropdownList from '../../components/DropdownList';
import SuccessModal from '../../components/SuccessModal';

// STYLES
import {DARK, GRAY, LIGHT_GRAY, WHITE} from '../../styles/colors';

import {AxiosError} from 'axios';

import {observer} from 'mobx-react-lite';
import {useStores} from '../../store/rootStoreContext';
import apiErrorHandler from '../../utils/apiErrorHandler';
import services from '../../store/services';
import navigateToScreen from '../../utils/navigateToScreen';

const ScanQrScreen = (): JSX.Element => {
  const {truck, device} = useStores();
  const [menuVisible, setMenuVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [isScanned, setIsScanned] = useState(false);

  // to refresh the camera
  const isScreenFocused = useIsFocused();

  // TODO
  // Сохранение выбранного значения (трака) в сторе
  const [selected, setSelected] = useState('');
  console.log('selected: ', selected);

  const devices = useCameraDevices();
  const deviceCam = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<WarehouseNavParams>>();

  const currentRouteIndex = navigation.getState().routes.length - 1;
  const currentRouteName = navigation.getState().routes[currentRouteIndex].name;

  // TODO
  // Переимновать и зарефакторить "AssignTruck",
  // так как параметы одинаковые и здесь не должно быть такого названия
  const route = useRoute<RouteProp<WarehouseNavParams, 'AssignTruck'>>();

  const title = route.params?.title;
  const subtitle = route.params?.subtitle;
  const btnTitle = route.params?.btnTitle;

  const getCameraPermission = async () => {
    if (!hasPermission) {
      await Camera.requestCameraPermission();
      const cameraPermission = await Camera.getCameraPermissionStatus();
      setHasPermission(cameraPermission === 'authorized');
    }
  };

  const sendRequest = () => {
    truck.findAndSetTruckItem(+selected, truck.trucks);

    switch (currentRouteName) {
      case 'AssignTruck':
        if (truck.truckItem?.id) {
          device
            .assignDevice(truck.truckItem, '', navigation, currentRouteName)
            .catch((error: Error | AxiosError) => {
              apiErrorHandler({
                error,
                navigation,
                currentRouteName,
                sendRequest,
              });
            });
        }
        break;
      case 'DispatchTruck':
        if (truck.truckItem?.id) {
          services.setIsSuccessful(true);
          navigateToScreen({navigation, currentRouteName});
        } else {
          services.setIsSuccessful(false);
          services.setErrorText('Truck ID does not exist');
          navigateToScreen({navigation, currentRouteName});
        }
        break;
      case 'TruckArrived':
        if (truck.truckItem?.id) {
          services.setIsSuccessful(true);
          navigateToScreen({navigation, currentRouteName});
        } else {
          services.setIsSuccessful(false);
          services.setErrorText('Truck ID does not exist');
          navigateToScreen({navigation, currentRouteName});
        }
        break;
    }
  };

  useEffect(() => {
    getCameraPermission();
  }, []);

  useEffect(() => {
    isScreenFocused && setIsScanned(false);
  }, [isScreenFocused]);

  useEffect(() => {
    if (barcodes && barcodes.length > 0 && !isScanned) {
      setIsScanned(true);
      barcodes.forEach(scannedCode => {
        try {
          scannedCode?.rawValue && console.warn(scannedCode?.rawValue);
          // sendRequest(scannedCode?.rawValue);
          sendRequest();
        } catch (error) {
          console.warn(error);
        }
      });
    }
  }, [barcodes]);

  return (
    <View style={styles.container}>
      <Header
        modalVisible={menuVisible}
        setModalVisible={setMenuVisible}
        containerStyles={styles.header}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainContent}>
        <Text style={[styles.text, styles.title]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.text, styles.subtitle]}>{subtitle}</Text>
        )}
        <Text style={[styles.text, styles.scanLabel]}>
          Scan the QR code on the truck
        </Text>

        <Pressable onPress={getCameraPermission} style={styles.cameraContainer}>
          <View style={styles.cameraPlaceholder}>
            <Text style={[styles.text, styles.cameraPlaceholderText]}>
              Need permission to use the camera
            </Text>
          </View>
          {deviceCam && hasPermission && (
            <View style={styles.cameraView}>
              <Camera
                frameProcessorFps={2}
                frameProcessor={frameProcessor}
                style={styles.camera}
                device={deviceCam}
                isActive={isScreenFocused}
              />
            </View>
          )}
        </Pressable>

        <Text style={[styles.text, styles.listLabel]}>
          Or select the truck from the list below and press {btnTitle}
        </Text>

        <DropdownList data={truck.trucks} setSelected={setSelected} />

        <MainButton onPress={sendRequest} title={btnTitle} />
      </ScrollView>

      <MenuModal
        modalVisible={menuVisible}
        setModalVisible={setMenuVisible}
        setSuccessModalVisible={setSuccessModalVisible}
      />
      <SuccessModal
        modalVisible={services.successModalVisible}
        menuModalVisible={menuVisible}
        setMenuModalVisible={setMenuVisible}
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
    paddingBottom: 125,
    paddingTop: 40,
  },
  camera: {
    flex: 1,
  },
  cameraView: {
    width: 260,
    height: 260,
    position: 'absolute',
    zIndex: 2,
    overflow: 'hidden',
    borderRadius: 20,
  },
  cameraContainer: {
    position: 'relative',
    width: 275,
    height: 275,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
    overflow: 'hidden',
    borderRadius: 27,
  },
  cameraPlaceholder: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: LIGHT_GRAY,

    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraPlaceholderText: {
    color: GRAY,
    width: 210,
  },
  header: {
    marginBottom: 0,
  },
  title: {
    fontFamily: 'poppins_semibold',
    fontSize: 20,
    lineHeight: 30,
    marginBottom: 6,
  },
  subtitle: {
    marginBottom: 22,
    maxWidth: 223,
  },
  scanLabel: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 22,
  },
  listLabel: {
    marginBottom: 19,
    maxWidth: 254,
  },
  text: {
    fontFamily: 'poppins_regular',
    fontStyle: 'normal',
    color: DARK,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
  },
});

export default observer(ScanQrScreen);
