import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {DriverNavParams} from '../../types/navigation';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {useIsFocused} from '@react-navigation/native';

// COMPONENTS
import Header from '../../components/Header/Header';
import MenuModal from '../../components/MenuModal';
import MainButton from '../../components/MainButton/MainButton';
import SuccessModal from '../../components/SuccessModal';
import Input from '../../components/driver/Input';

// STYLES
import {DARK, GRAY, LIGHT_GRAY, WHITE} from '../../styles/colors';
import Counter, {Types} from '../../components/driver/Counter';

const ScanQrScreen = (): JSX.Element => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [isScanned, setIsScanned] = useState(false);

  // to refresh the camera
  const isScreenFocused = useIsFocused();

  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<DriverNavParams>>();

  const currentRouteIndex = navigation.getState().routes.length - 1;
  const currentRouteName = navigation.getState().routes[currentRouteIndex].name;

  const route = useRoute<RouteProp<DriverNavParams, 'MakeDelivery'>>();

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
          sendRequest();
        } catch (error) {
          console.warn(error);
        }
      });
    }
  }, [barcodes]);

  const title = route.params?.title;
  const inputTitle = route.params?.inputTitle;
  const inputPlaceholder = route.params?.inputPlaceholder;
  const btnTitle = route.params?.btnTitle;

  const getCameraPermission = async () => {
    if (!hasPermission) {
      await Camera.requestCameraPermission();
      const cameraPermission = await Camera.getCameraPermissionStatus();
      setHasPermission(cameraPermission === 'authorized');
    }
  };

  const sendRequest = () => {
    // TODO
    // обработка запроса на сервер
    const isSuccessful = true;
    const errorText = '<errorText>';

    navigateToScreen(isSuccessful, errorText);
  };

  let errorTitle = '';
  let successModalTitle = '';
  let failedBtnTitle = '';
  let counterTitle = '';

  switch (currentRouteName) {
    case 'MakeDelivery':
      errorTitle = 'Unable to begin delivery';
      failedBtnTitle = 'Try again';
      break;
    case 'ScanToUnload':
      errorTitle = 'Unable to unload item';
      successModalTitle = 'Item unloaded successfully';
      failedBtnTitle = 'Unload another item';
      counterTitle = 'Delivery Orders Unloaded:';
      break;
    case 'ScanToLoad':
      errorTitle = 'Unable to load item onto truck';
      successModalTitle = 'Item loaded successfully';
      failedBtnTitle = 'Try again';
      counterTitle = 'Delivery Orders Loaded:';
      break;
  }

  const navigateToScreen = (isSuccessful: boolean, errorText: string) => {
    const allCompleted = true;
    if (isSuccessful && allCompleted) {
      switch (currentRouteName) {
        case 'ScanToUnload':
          navigation.navigate('ActionSuccessful', {
            title: 'All items unloaded',
            subtitle:
              'Press next and ask the customer to review the items and sign',
            btnTitle: 'Next',
            onPress: () => navigation.navigate('ReviewAndSign'),
          });
          break;
        case 'ScanToLoad':
          navigation.navigate('ActionSuccessful', {
            title: 'All items have been loaded onto the truck',
            btnTitle: 'Next Order',
            onPress: () => navigation.navigate('DeliveryOrdersToLoad'),
          });
          break;
        case 'MakeDelivery':
          navigation.navigate('DeliveryDetails');
          break;
      }
    } else if (isSuccessful) {
      switch (currentRouteName) {
        case 'MakeDelivery':
          navigation.navigate('DeliveryDetails');
          break;
        case 'ScanToUnload':
          // TODO
          // Логика по увеличению счетчика разгруженных???
          setSuccessModalVisible(true);
          setTimeout(() => setSuccessModalVisible(false), 1500);
          break;
        case 'ScanToLoad':
          // TODO
          // Логика по увеличению счетчика загруженных???
          setSuccessModalVisible(true);
          setTimeout(() => setSuccessModalVisible(false), 1500);
          break;
      }
    } else {
      navigation.navigate('ActionFailed', {
        title: errorTitle,
        errorText: errorText,
        onRetryPress: sendRequest,
        btnTitle: failedBtnTitle,
      });
    }
  };

  const count = [
    {
      count: 15,
      amount: 15,
      title: 'RT001 (Anton:1)',
    },
    {
      count: 5,
      amount: 15,
      title: 'RT021 (Anton:2)',
    },
    {
      count: 1,
      amount: 15,
      title: 'RT023 (Anton:3)',
    },
    {
      count: 6,
      amount: 15,
      title: 'RT032 (Anton:4)',
    },
    {
      count: 7,
      amount: 7,
      title: 'RT024 (Anton:5)',
    },
  ];

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

        <Text style={[styles.text, styles.scanLabel]}>Scan the QR code</Text>

        {/* TODO
            данные для счётчика*/}
        {(currentRouteName === 'ScanToUnload' ||
          currentRouteName === 'ScanToLoad') && (
          <Counter
            count={5}
            amount={15}
            title={counterTitle}
            type={Types.totalAmount}
          />
        )}

        <Pressable onPress={getCameraPermission} style={styles.cameraContainer}>
          <View style={styles.cameraPlaceholder}>
            <Text style={[styles.text, styles.cameraPlaceholderText]}>
              Need permission to use the camera
            </Text>
          </View>
          {device && hasPermission && (
            <View style={styles.cameraView}>
              <Camera
                frameProcessorFps={2}
                frameProcessor={frameProcessor}
                style={styles.camera}
                device={device}
                isActive={isScreenFocused}
              />
            </View>
          )}
        </Pressable>

        <Text style={[styles.text, styles.listLabel]}>{inputTitle}</Text>

        <Input placeholder={inputPlaceholder} />

        <MainButton onPress={sendRequest} title={btnTitle} />

        {/* TODO
            Данные для номера накладной и количества */}
        {(currentRouteName === 'ScanToUnload' ||
          currentRouteName === 'ScanToLoad') && (
          <>
            <View style={styles.deliveriesListHeader}>
              <Text style={styles.deliveriesListTitle}>
                <Text style={styles.bold}>BOL</Text> RT6874|01A
              </Text>
              <Text
                style={[
                  styles.deliveriesListTitle,
                  styles.deliveriesListTitleCounter,
                ]}>
                1/23
              </Text>
            </View>
            {count.map(item => (
              <Counter
                key={item.title}
                count={item.count}
                amount={item.amount}
                title={item.title}
                type={
                  item.count === item.amount
                    ? Types.completed
                    : Types.uncompleted
                }
              />
            ))}
          </>
        )}
      </ScrollView>

      <MenuModal
        modalVisible={menuVisible}
        setModalVisible={setMenuVisible}
        setSuccessModalVisible={setSuccessModalVisible}
      />
      <SuccessModal
        successModalTitle={successModalTitle}
        modalVisible={successModalVisible}
        menuModalVisible={menuVisible}
        setMenuModalVisible={setMenuVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Main
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
  header: {
    marginBottom: 0,
  },
  title: {
    fontFamily: 'poppins_semibold',
    fontSize: 20,
    lineHeight: 30,
    marginBottom: 6,
  },
  text: {
    fontFamily: 'poppins_regular',
    fontStyle: 'normal',
    color: DARK,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
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
  // Camera
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

  deliveriesListHeader: {
    marginVertical: 22,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bold: {
    fontFamily: 'poppins_semibold',
  },
  deliveriesListTitle: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: DARK,
    textAlign: 'left',
  },
  deliveriesListTitleCounter: {
    textAlign: 'right',
  },
});

export default ScanQrScreen;
