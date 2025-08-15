import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {WarehouseNavParams} from '../../types/navigation';

// COMPONENTS
import HomeScreenMenuItem from '../../components/HomeScreenMenuItem/HomeScreenMenuItem';
import Header from '../../components/Header/Header';
import MenuModal from '../../components/MenuModal';

// STYLES
import link from '../../assets/images/link.png';

import {DARK, LIGHT_GRAY, WHITE} from '../../styles/colors';
import {observer} from 'mobx-react-lite';
import {useStores} from '../../store/rootStoreContext';

const AdminFunctionsScreen = (): JSX.Element => {
  const {user} = useStores();
  // TODO
  // Логика для переменных ниже
  // const isDisabled = true;

  const [modalVisible, setModalVisible] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<WarehouseNavParams>>();

  return (
    <View style={styles.container}>
      <Header modalVisible={modalVisible} setModalVisible={setModalVisible} />

      <View style={styles.mainContent}>
        <Text style={styles.title}>
          Welcome
          <Text style={[styles.title, styles.highlightedPart]}>
            {' '}
            {user.details.firstName}
          </Text>
        </Text>
        <HomeScreenMenuItem
          title="Deregister device"
          img={link}
          onItemPress={() =>
            navigation.navigate('AssignTruck', {
              title: 'Assign device to truck',
              btnTitle: 'Assign',
              subtitle: 'Use this screen to assign this device to a truck',
            })
          }
        />
      </View>

      <MenuModal
        isHomeScreen
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
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
  title: {
    fontFamily: 'poppins_medium',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 24,
    color: DARK,

    textAlign: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  highlightedPart: {
    fontFamily: 'poppins_semibold',
  },
});

export default observer(AdminFunctionsScreen);
