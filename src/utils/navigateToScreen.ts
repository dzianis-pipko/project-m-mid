import services from '../store/services';
import truck from '../store/truck';

interface NavigateToScreenProps {
  navigation: any;
  currentRouteName?: string;
  parentRouteName?: string;
  onRetryPress?: () => void;
  navigateHome?: () => void;
  sendRequest?: () => void;
  errorTitle?: string;
  errorData?: any;
}

const navigateToScreen = ({
  navigation,
  currentRouteName,
  parentRouteName,
  onRetryPress,
  navigateHome,
  sendRequest,
  errorTitle,
}: NavigateToScreenProps) => {
  if (services.isSuccessful) {
    switch (currentRouteName) {
      case 'AssignTruck':
        setTimeout(() => {
          services.setSuccessModalVisible(false);
          navigation.navigate('AssignedTruckDetails');
        }, 1500);
        break;
      case 'DispatchTruck':
        navigation.navigate('YesNoActionScreen', {
          title: 'Dispatch this truck?',
          truckRegNumber: truck.truckRegNumber,
          truckId: truck.assignedTruckId,
        });
        break;
      case 'TruckArrived':
        navigation.navigate('YesNoActionScreen', {
          title: 'Truck has returned?',
          truckRegNumber: truck.truckRegNumber,
          truckId: truck.assignedTruckId,
        });
        break;
    }

    switch (parentRouteName) {
      case 'AssignedTruckDetails':
      case 'DispatchTruck':
      case 'TruckArrived':
        setTimeout(() => {
          services.setSuccessModalVisible(false);
          navigateHome && navigateHome();
        }, 1500);
        break;
    }
  } else {
    switch (currentRouteName) {
      case 'AssignTruck':
        navigation.navigate('ActionFailed', {
          title: 'Unable to assign device to truck',
          errorText: services.errorText,
          onRetryPress: sendRequest,
          hasHomeBtn: true,
        });
        break;
      case 'DispatchTruck':
        navigation.navigate('ActionFailed', {
          title: 'Truck ID does not exist',
          errorText: services.errorText,
          hasHomeBtn: true,
        });
        break;
      case 'TruckArrived':
        navigation.navigate('ActionFailed', {
          title: 'Truck ID does not exist',
          errorText: services.errorText,
          hasHomeBtn: true,
        });
        break;
    }

    switch (parentRouteName) {
      case 'AssignedTruckDetails':
      case 'DispatchTruck':
      case 'TruckArrived':
        navigation.navigate('ActionFailed', {
          title: errorTitle && errorTitle,
          errorText: services.errorText,
          onRetryPress,
        });
        break;
    }
  }
};

export default navigateToScreen;
