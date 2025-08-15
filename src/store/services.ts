import {makeAutoObservable} from 'mobx';
import {makePersistable} from 'mobx-persist-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Services {
  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: 'services',
      properties: ['successModalVisible', 'isDisabled'],
      storage: AsyncStorage,
    });
  }
  successModalVisible: boolean = false;
  validationError: boolean = false;
  isDisabled: boolean = true;
  modalVisible: boolean = false;
  isSuccessful: boolean = false;
  errorText: string = '';

  setSuccessModalVisible(bool: boolean) {
    this.successModalVisible = bool;
  }
  setValidationError(bool: boolean) {
    this.validationError = bool;
  }
  setIsDisabled(bool: boolean) {
    this.isDisabled = bool;
  }
  setModalVisible(bool: boolean) {
    this.modalVisible = bool;
  }
  setIsSuccessful(bool: boolean) {
    this.isSuccessful = bool;
  }
  setErrorText(errorText: string) {
    this.errorText = errorText;
  }
}

export default new Services();
