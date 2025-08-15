import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {DriverNavParams} from '../../types/navigation';

// COMPONENTS
import Header from '../../components/Header/Header';
import MenuModal from '../../components/MenuModal';
import MainButton from '../../components/MainButton/MainButton';

// STYLES
import {DARK, LIGHT_GRAY, WHITE} from '../../styles/colors';
import DeliveryDetailsRow from '../../components/DeliveryDetailsRow';
import LabelStatus from '../../components/LabelStatus';
import {Statuses} from '../../types/common';

const DeliveryDetails = (): JSX.Element => {
  const [menuVisible, setMenuVisible] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<DriverNavParams>>();

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
        <Text style={[styles.text, styles.title]}>Delivery Details</Text>

        <View style={styles.detailsContainer}>
          <DeliveryDetailsRow label="BoL" value="RT6874/01A" />
          <DeliveryDetailsRow label="Consignee" value="Jane’s Clothing Ltd" />
          <DeliveryDetailsRow
            label="Delivery address"
            value="17 Westgate Road Cranworth Billington"
          />
          <DeliveryDetailsRow label="Contatct No." value="02084562352" />
          <DeliveryDetailsRow label="NOP" value="14" />
          <DeliveryDetailsRow label="Status">
            <LabelStatus status={Statuses.inWarehouse} />
          </DeliveryDetailsRow>
        </View>

        <MainButton
          onPress={() =>
            navigation.navigate('ScanToUnload', {
              title: 'Scan item to mark as unloaded',
              btnTitle: 'Unload',
              inputTitle: 'Or enter item reference',
              inputPlaceholder: 'Item reference',
            })
          }
          containerStyles={styles.btnContainerStyles}
          title="Start unloading"
        />
        <MainButton
          onPress={() => navigation.goBack()}
          outlined
          title="Cancel"
        />
      </ScrollView>

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
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
    width: '100%',
    paddingTop: 40,
    paddingBottom: 150,
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
  detailsContainer: {
    minWidth: '100%',
    backgroundColor: LIGHT_GRAY,
    paddingHorizontal: 22,
    paddingVertical: 22,
    borderRadius: 12,
    marginBottom: 27,
  },
});

export default DeliveryDetails;
