import React, {Dispatch, SetStateAction} from 'react';
import {StyleSheet, Text, View, Modal, Image} from 'react-native';

// COMPONENTS
import Header from './Header/Header';

// STYLES

import {TRANSLUCENT_GREEN, WHITE} from '../styles/colors';
import success from '../assets/images/success.png';

interface SuccessModalProps {
  modalVisible: boolean;
  menuModalVisible: boolean;
  setMenuModalVisible: Dispatch<SetStateAction<boolean>>;
  successModalTitle?: string;
}

const SuccessModal = ({
  modalVisible,
  menuModalVisible,
  setMenuModalVisible,
  successModalTitle = 'This device has been assigned',
}: SuccessModalProps): JSX.Element => {
  return (
    <Modal
      style={styles.container}
      animationType="fade"
      transparent={false}
      visible={modalVisible}>
      <Header
        modalVisible={menuModalVisible}
        setModalVisible={setMenuModalVisible}
        containerStyles={styles.header}
      />
      <View style={styles.modalView}>
        <Image style={styles.successIcon} source={success} />
        <Text style={styles.modalText}>{successModalTitle}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 0,
  },
  container: {},
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: TRANSLUCENT_GREEN,
  },
  successIcon: {
    height: 120,
    width: 120,
    marginBottom: 30,
  },
  modalText: {
    fontFamily: 'poppins_semibold',
    fontStyle: 'normal',
    fontSize: 20,
    lineHeight: 30,
    color: WHITE,
    width: 230,
    textAlign: 'center',
  },
});

export default SuccessModal;
