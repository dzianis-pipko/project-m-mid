import React, {Dispatch, SetStateAction, useState} from 'react';
import {StyleSheet, View, Modal, TextInput, Pressable} from 'react-native';

// STYLES
import {
  DARK,
  GRAY2,
  LIGHT_DARK_GRAY,
  LIGHT_GRAY,
  WHITE,
} from '../styles/colors';
import MainButton from './MainButton/MainButton';

interface CommentModalProps {
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  onSavePress: Dispatch<SetStateAction<string>>;
  initialInputValue: string;
}

const CommentModal = ({
  modalVisible,
  setModalVisible,
  onSavePress,
  initialInputValue,
}: CommentModalProps): JSX.Element => {
  const [inputValue, setInputValue] = useState(initialInputValue);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
        setInputValue(initialInputValue);
      }}>
      <Pressable
        onPress={() => {
          setModalVisible(false);
          setInputValue(initialInputValue);
        }}
        style={styles.container}>
        <View style={styles.modalView}>
          <View style={styles.line} />
          <TextInput
            value={inputValue}
            onChangeText={setInputValue}
            style={styles.input}
            placeholder="Leave a comment about the delivery"
            placeholderTextColor={LIGHT_DARK_GRAY}
            multiline
            numberOfLines={7}
          />
          <MainButton
            onPress={() => {
              setModalVisible(false);
              onSavePress(inputValue);
            }}
            containerStyles={{flex: 0}}
            title="Save"
          />
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    justifyContent: 'flex-end',
    backgroundColor: WHITE,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: -11,
    },
    shadowOpacity: 0.23,
    shadowRadius: 11.78,
    elevation: 15,
  },
  line: {
    height: 4,
    width: 80,
    backgroundColor: GRAY2,
    marginBottom: 40,
  },
  input: {
    backgroundColor: LIGHT_GRAY,
    width: '100%',
    maxHeight: 200,
    borderRadius: 8,
    marginBottom: 24,
    textAlignVertical: 'top',
    paddingVertical: 22,
    paddingHorizontal: 12,

    fontFamily: 'poppins_regular',
    fontStyle: 'normal',
    color: DARK,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default CommentModal;
