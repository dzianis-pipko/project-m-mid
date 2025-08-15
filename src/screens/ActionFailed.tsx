import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  DriverNavParams,
  RegisterNavParams,
  WarehouseNavParams,
} from '../types/navigation';

// COMPONENTS
import Header from '../components/Header/Header';
import MenuModal from '../components/MenuModal';
import MainButton from '../components/MainButton/MainButton';
import SuccessModal from '../components/SuccessModal';

// STYLES
import {DARK, WHITE} from '../styles/colors';

import failed from '../assets/images/failed.png';

import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const ActionFailed = (): JSX.Element => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const navigation =
    useNavigation<
      NativeStackNavigationProp<
        WarehouseNavParams & DriverNavParams & RegisterNavParams
      >
    >();
  const navigateHome = () => navigation.popToTop();
  const route =
    useRoute<
      RouteProp<
        WarehouseNavParams & DriverNavParams & RegisterNavParams,
        'ActionFailed'
      >
    >();

  const title = route.params?.title;
  const errorText = route.params?.errorText;
  const sendRequest = route.params?.onRetryPress;
  const hasHomeBtn = route.params?.hasHomeBtn ?? true;
  //default title 'Retry' for Warehouse
  const btnTitle = route.params?.btnTitle ?? 'Retry';

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

        <Image style={styles.failedIcon} source={failed} />

        <Text style={[styles.text, styles.errorText]}>{errorText}</Text>

        <MainButton
          outlined={!hasHomeBtn}
          onPress={sendRequest}
          title={btnTitle}
          containerStyles={styles.btnContainerStyles}
        />
        {hasHomeBtn && (
          <MainButton outlined onPress={navigateHome} title="Home" />
        )}
      </ScrollView>

      <MenuModal
        modalVisible={menuVisible}
        setModalVisible={setMenuVisible}
        setSuccessModalVisible={setSuccessModalVisible}
      />
      <SuccessModal
        modalVisible={successModalVisible}
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
  btnContainerStyles: {
    marginBottom: 14,
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
    marginBottom: 40,
  },
  errorText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
  },
  text: {
    fontFamily: 'poppins_regular',
    fontStyle: 'normal',
    color: DARK,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
  },
  failedIcon: {
    height: 182,
    width: 182,
    marginBottom: 40,
  },
});

export default ActionFailed;
