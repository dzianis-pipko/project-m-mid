import {AxiosError, isAxiosError} from 'axios';
import {Alert} from 'react-native';
import errorHandler, {loginErrorHandler} from './errorHandler';
import services from '../store/services';
import navigateToScreen from './navigateToScreen';

interface ApiErrorHandlerProps {
  error: Error | AxiosError;
  navigation?: any;
  currentRouteName?: string;
  parentRouteName?: string;
  errorTitle?: string;
  onRetryPress?: () => void;
  onRetryPressDeReg?: () => void;
  sendRequest?: () => void;
}

const alertError = (errorText: string, error: Error) => {
  Alert.alert(errorText, error.message, [
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
};

const apiErrorHandler = ({
  error,
  navigation,
  currentRouteName,
  parentRouteName,
  errorTitle,
  onRetryPress,
  sendRequest,
}: ApiErrorHandlerProps) => {
  if (isAxiosError(error)) {
    switch (currentRouteName) {
      case 'RegisterDevice':
      case 'DeregisterDevice':
        navigation.navigate(
          'ActionFailed',
          errorHandler({
            errorData: error.response?.data,
            currentRouteName,
            onRetryPress,
          }),
        );
        break;
      case 'MainLogin':
        loginErrorHandler({errorData: error.response?.data, navigation});
        break;
      case 'AssignTruck':
        services.setIsSuccessful(false);
        services.setErrorText(
          error.response?.data
            ? error.response?.data.errors[0].usermessage
            : error.response?.data,
        );
        navigateToScreen({
          navigation,
          currentRouteName,
          sendRequest,
        });
        break;
      case 'DriverHome':
        services.setIsDisabled(true);
        break;
    }

    switch (parentRouteName) {
      case 'AssignedTruckDetails':
      case 'DispatchTruck':
      case 'TruckArrived':
        services.setIsSuccessful(false);
        services.setErrorText(
          error.response?.data
            ? error.response?.data.errors[0].usermessage
            : error.response?.data,
        );
        navigateToScreen({
          errorData: error.response?.data,
          navigation,
          parentRouteName,
          onRetryPress,
          errorTitle,
        });
        break;
    }
  } else {
    switch (currentRouteName || parentRouteName) {
      case 'RegisterDevice':
      case 'DeregisterDevice':
      case 'MainLogin':
        alertError('Email or password not correct', error);
        break;
      case 'WarehouseHome':
      case 'DriverHome':
      case 'DeliveryOrdersScreen':
      case 'DeliveryOrdersToBegin':
      case 'DeliveryOrdersToLoad':
        alertError('Error: ', error);
        break;
      case 'AssignTruck':
        alertError('Error: ', error);
        services.setIsSuccessful(false);
        services.setErrorText(error.message);
        navigateToScreen({navigation, currentRouteName, onRetryPress});
        break;
      case 'AssignedTruckDetails':
      case 'DispatchTruck':
      case 'TruckArrived':
        alertError('Error: ', error);
        break;
    }
  }
};

export default apiErrorHandler;
