import React, {Dispatch, SetStateAction} from 'react';
import {View, Image, StyleSheet, Pressable, ViewStyle} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {useNavigation} from '@react-navigation/native';
import {WarehouseNavParams, DriverNavParams} from '../../types/navigation';
import {useNavigation} from '@react-navigation/native';

// STYLES
import {LIGHT_GRAY} from '../../styles/colors';
import logo from '../../assets/images/logo.png';
import menu from '../../assets/images/menu.png';
import cross from '../../assets/images/cross.png';
import {hitSlop} from '../../styles/common';
import {useStores} from '../../store/rootStoreContext';
import {observer} from 'mobx-react-lite';

interface HeaderProps {
  containerStyles?: ViewStyle;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
}

const Header = ({
  modalVisible,
  setModalVisible,
  containerStyles,
}: HeaderProps): JSX.Element => {
  const {user} = useStores();
  const navigationWarehouse =
    useNavigation<NativeStackNavigationProp<WarehouseNavParams>>();

  const navigationDriver =
    useNavigation<NativeStackNavigationProp<DriverNavParams>>();

  const navigateHome = () => {
    switch (user.mainRole) {
      case 'Manager':
        navigationWarehouse.navigate('WarehouseHome');
        break;
      case 'Driver':
        navigationDriver.navigate('DriverHome');
        break;
      case 'Admin':
        console.log('Admin');
        break;
      case 'Basic':
        console.log('Basic');
        break;
    }
  };

  return (
    <View style={[styles.container, containerStyles]}>
      <Pressable
        style={styles.menuIcon}
        hitSlop={hitSlop}
        onPress={() => setModalVisible(prev => !prev)}>
        <Image style={styles.menuIcon} source={modalVisible ? cross : menu} />
      </Pressable>

      <Pressable onPress={navigateHome} style={styles.logo}>
        <Image style={styles.logoIcon} source={logo} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: LIGHT_GRAY,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    marginBottom: 40,
  },
  menuIcon: {
    width: 32,
    height: 32,
  },
  logo: {
    position: 'absolute',
    alignSelf: 'center',
  },
  logoIcon: {
    width: 168,
    height: 36,
  },
});

export default observer(Header);
