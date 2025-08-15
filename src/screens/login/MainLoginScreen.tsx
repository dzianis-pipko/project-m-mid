import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LoginNavParams} from '../../types/navigation';
import {useNavigation} from '@react-navigation/native';

import {observer} from 'mobx-react-lite';

import {getUniqueId} from 'react-native-device-info';

// COMPONENTS
import MainButton from '../../components/MainButton/MainButton';
import LoginInput from '../../components/LoginInput/LoginInput';

import login_bg from '../../assets/images/login/login_bg.png';
import logo from '../../assets/images/logo.png';
import {DARK, RED} from '../../styles/colors';
import {hitSlop} from '../../styles/common';
import {useStores} from '../../store/rootStoreContext';
import SuccessModal from '../../components/SuccessModal';
import {AxiosError} from 'axios';
import apiErrorHandler from '../../utils/apiErrorHandler';

const MainLoginScreen = (): JSX.Element => {
  const {auth, authAdmin, user, services} = useStores();
  const [uniqueId, setUniqueId] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<LoginNavParams>>();

  const currentRouteIndex = navigation.getState().routes.length - 1;
  const currentRouteName = navigation.getState().routes[currentRouteIndex].name;

  let successModalTitle = '';
  switch (currentRouteName) {
    case 'DeregisterDevice':
      successModalTitle = 'Device has been deregistered successfully';
      break;
    default:
      successModalTitle = 'login is successfull';
      break;
  }

  const signIn = () => {
    auth.login().catch((error: Error | AxiosError) => {
      apiErrorHandler({error, navigation, currentRouteName});
    });
  };

  const navigateToScreen = () => {
    authAdmin.setAuthAdmin(false);
    navigation.navigate('DeregisterDevice');
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
      <Text style={styles.title}>Enter your login credentials</Text>

      <LoginInput
        validationError={services.validationError}
        login={user.email}
        onChangeLogin={text => user.setEmail(text)}
        placeholder="Email"
      />
      <LoginInput
        validationError={services.validationError}
        login={user.password}
        onChangeLogin={text => user.setPassword(text)}
        placeholder="Password"
        password
      />
      <MainButton
        containerStyles={styles.buttonMarginTop}
        title="Sign in"
        onPress={signIn}
      />
      <TouchableOpacity
        hitSlop={hitSlop}
        style={styles.deregisterButton}
        onPress={navigateToScreen}>
        <Text style={styles.deregisterText}>Deregister device</Text>
      </TouchableOpacity>

      <SuccessModal
        successModalTitle={successModalTitle}
        modalVisible={services.successModalVisible}
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
    marginBottom: 38,
  },
  deregisterButton: {
    marginTop: 60,
  },
  deregisterText: {
    fontFamily: 'poppins_medium',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: RED,
  },
  buttonMarginTop: {
    marginTop: 34,
  },
});

export default observer(MainLoginScreen);
