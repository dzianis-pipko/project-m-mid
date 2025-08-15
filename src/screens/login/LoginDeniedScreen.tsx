import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {LoginNavParams} from '../../types/navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// COMPONENTS
import MainButton from '../../components/MainButton/MainButton';

// STYLES
import logo from '../../assets/images/logo.png';
import lock from '../../assets/images/login/lock.png';
import {DARK, GRAY, LIGHT_GRAY, WHITE} from '../../styles/colors';
import {observer} from 'mobx-react-lite';
import {useStores} from '../../store/rootStoreContext';

const LoginDeniedScreen = (): JSX.Element => {
  const {services} = useStores();
  const navigation = useNavigation<NativeStackNavigationProp<LoginNavParams>>();

  const navigateToMainLogin = () => {
    services.setValidationError(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={logo} />
      </View>

      <View style={styles.mainContent}>
        <Image style={styles.lockImg} source={lock} />

        <Text style={styles.title}>
          Login attempt
          <Text style={[styles.title, styles.highlightedPart]}> failed.</Text>
        </Text>
        <Text style={styles.subtitle}>
          Your account is locked, please contact the system administrator
        </Text>

        <MainButton
          containerStyles={styles.mainButtonParams}
          title="Back to Login form"
          onPress={navigateToMainLogin}
          outlined
        />
      </View>
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
  lockImg: {
    width: 182,
    height: 182,
    marginBottom: 40,
  },
  title: {
    fontFamily: 'poppins_regular',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 24,
    color: DARK,

    textAlign: 'center',
    marginBottom: 8,
  },
  highlightedPart: {
    fontFamily: 'poppins_medium',
  },
  subtitle: {
    fontFamily: 'poppins_regular',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 24,
    color: GRAY,

    maxWidth: 288,
    textAlign: 'center',
    marginBottom: 40,
  },
  mainButtonParams: {flex: 0},
});

export default observer(LoginDeniedScreen);
