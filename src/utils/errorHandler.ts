import services from '../store/services';

const errorTitleHamdler = (errorData: any) => {
  if (errorData.errors) {
  } else {
    if (
      errorData.exception === 'Provided Credentials are invalid.' ||
      errorData.exception === 'Authentication Failed.'
    ) {
      return 'Email or password not correct.';
    }

    if (errorData.exception === 'Invalid Tenant.') {
      return 'Invalid Tenant.';
    }
    if (errorData.errors[0].error === 'DeviceAlreadyRegistered') {
      return 'Device already registered';
    }
  }

  return 'Provided Credentials are invalid.';
};

const errorTextHandler = (errorData: any) => {
  if (errorData.errors) {
    if (errorData.errors.Email) {
      return errorData.errors.Email;
    }
    if (errorData.errors.Password) {
      return errorData.errors.Password;
    }
    if (errorData.errors.Email && errorData.errors.Password) {
      return `${errorData.errors.Email} And ${errorData.errors.Password}`;
    }
  } else {
    if (errorData.exception) {
      return errorData.exception;
    }
  }

  return errorData.errors.title;
};

interface LoginErrorHandlerProps {
  errorData: any;
  navigation: any;
}

export const loginErrorHandler = ({
  errorData,
  navigation,
}: LoginErrorHandlerProps) => {
  if (errorData.errors) {
    console.log('kk: ', errorData.errors.Password);

    if (errorData.errors.Email[0] === 'Invalid Email Address.') {
      services.setValidationError(true);
      return;
    }
    if (errorData.errors.Email[0] === "'Email' must not be empty.") {
      services.setValidationError(true);
      return;
    }
    if (errorData.errors.Password[0] === "'Password' must not be empty.") {
      services.setValidationError(true);
      return;
    }
  } else {
    if (
      errorData.messages[0] !== 'Authentication Failed.' &&
      errorData.messages[0] !== 'Provided Credentials are invalid.'
    ) {
      console.log('errorData: ', errorData);
      navigation.navigate('LoginDenied');
      return;
    }
    if (errorData.messages[0] === 'Authentication Failed.') {
      services.setValidationError(true);
      return;
    }
    if (errorData.messages[0] === 'Provided Credentials are invalid.') {
      services.setValidationError(true);
      return;
    }
  }
};

interface ErrorHandlerProps {
  errorData: any;
  currentRouteName?: string;
  onRetryPress?: () => void;
}

const errorHandler = ({
  errorData,
  currentRouteName,
  onRetryPress,
}: ErrorHandlerProps) => {
  switch (currentRouteName) {
    case 'RegisterDevice':
      return {
        title: errorTitleHamdler(errorData),
        errorText: errorTextHandler(errorData),
        onRetryPress,
        hasHomeBtn: false,
      };
    case 'DeregisterDevice':
      return {
        title: errorData.messages,
        errorText: errorData.messages,
        onRetryPress,
        hasHomeBtn: false,
      };
    case 'MainLogin':
      services.setValidationError(true);
      break;
    default:
      return {
        title: '',
        errorText: '',
        onRetryPress,
        hasHomeBtn: false,
      };
  }
};

export default errorHandler;
