import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, ImageBackground, Image, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RegisterNavParams, LoginNavParams} from '../../types/navigation';
import {useNavigation} from '@react-navigation/native';

import {observer} from 'mobx-react-lite';

// COMPONENTS
import MainButton from '../../components/MainButton/MainButton';
import LoginInput from '../../components/LoginInput/LoginInput';

import login_bg from '../../assets/images/login/login_bg.png';
import logo from '../../assets/images/logo.png';
import {DARK, GREEN, RED, TRANSLUCENT_LIGHT_GREEN} from '../../styles/colors';
import {getUniqueId} from 'react-native-device-info';
import SuccessModal from '../../components/SuccessModal';
import {AxiosError} from 'axios';
import {useStores} from '../../store/rootStoreContext';
import apiErrorHandler from '../../utils/apiErrorHandler';

const RegDeregDeviceScreen = (): JSX.Element => {
  const {
    authAdmin,
    device,
    services: {successModalVisible},
  } = useStores();
  const [uniqueId, setUniqueId] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const navigation =
    useNavigation<
      NativeStackNavigationProp<RegisterNavParams & LoginNavParams>
    >();

  const currentRouteIndex = navigation.getState().routes.length - 1;
  const currentRouteName = navigation.getState().routes[currentRouteIndex].name;

  let successModalTitle = '';
  switch (currentRouteName) {
    case 'DeregisterDevice':
      successModalTitle = 'Device has been deregistered successfully';
      break;
    case 'RegisterDevice':
      successModalTitle = 'Device has been deregistered successfully';
      break;
    default:
      successModalTitle = 'Device has been registered successfully';
      break;
  }

  const onRetryPress = () => {
    navigation.navigate('RegisterDevice');
  };

  const onRetryPressDeReg = () => {
    navigation.navigate('DeregisterDevice');
  };

  const registerDevice = () => {
    authAdmin.authAdmin().catch((error: Error | AxiosError) => {
      apiErrorHandler({error, navigation, currentRouteName, onRetryPress});
    });
  };

  const deregisterDevice = () => {
    device.deregisterDevice().catch((error: Error | AxiosError) => {
      apiErrorHandler({error, navigation, currentRouteName, onRetryPressDeReg});
    });
  };

  useEffect(() => {
    if (!uniqueId) {
      getUniqueId().then(uniqueId => {
        setUniqueId(uniqueId);
      });
    }
  }, [uniqueId]);

  return (
    <ImageBackground
      source={login_bg}
      resizeMode="cover"
      style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <Text style={styles.title}>
        {currentRouteName === 'DeregisterDevice'
          ? 'Deregister this device'
          : 'Register new device'}
      </Text>
      <Text style={styles.subtitle}>
        {currentRouteName === 'DeregisterDevice'
          ? 'Use this screen to deregister this device'
          : 'Use this screen to register a new device'}
      </Text>
      {currentRouteName === 'DeregisterDevice' ? (
        <View style={styles.labelValueRow}>
          <Text style={styles.label}>Tenant ID</Text>
          <Text style={styles.value}>{authAdmin.tenantId}</Text>
        </View>
      ) : (
        <>
          <LoginInput
            login={authAdmin.email}
            onChangeLogin={text => authAdmin.setEmail(text)}
            placeholder="Email"
          />
          <LoginInput
            login={authAdmin.password}
            onChangeLogin={text => authAdmin.setPassword(text)}
            placeholder="Password"
            password
          />
          <LoginInput
            login={authAdmin.tenantId}
            onChangeLogin={text => authAdmin.setTenantId(text)}
            placeholder="Tenant ID"
          />
        </>
      )}
      <MainButton
        containerStyles={[
          currentRouteName === 'DeregisterDevice' && styles.deregisterButton,
          styles.buttonMarginTop,
        ]}
        title={
          currentRouteName === 'DeregisterDevice'
            ? 'Deregister device'
            : 'Register device'
        }
        onPress={
          currentRouteName === 'DeregisterDevice'
            ? deregisterDevice
            : registerDevice
        }
      />

      <SuccessModal
        successModalTitle={successModalTitle}
        modalVisible={successModalVisible}
        menuModalVisible={menuVisible}
        setMenuModalVisible={setMenuVisible}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 65,
  },
  logo: {
    width: 224,
    height: 48,
    marginBottom: 88,
  },
  title: {
    fontFamily: 'poppins_semibold',
    fontStyle: 'normal',
    fontSize: 18,
    lineHeight: 27,
    color: DARK,

    width: 233,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'poppins_regular',
    fontSize: 16,
    lineHeight: 24,
    color: DARK,

    width: 200,
    textAlign: 'center',
    marginBottom: 38,
  },
  deregisterButton: {
    backgroundColor: RED,
    shadowColor: RED,
  },
  labelValueRow: {
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TRANSLUCENT_LIGHT_GREEN,
    minHeight: 47,
  },
  label: {
    flexBasis: '35%',
    fontFamily: 'poppins_medium',
    fontSize: 14,
    lineHeight: 21,
    color: GREEN,
  },
  value: {
    // flexBasis: '50%',
    fontFamily: 'poppins_medium',
    fontSize: 14,
    lineHeight: 21,
    color: GREEN,
  },
  buttonMarginTop: {
    marginTop: 34,
  },
});

export default observer(RegDeregDeviceScreen);
