import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Image, Pressable} from 'react-native';
import {observer} from 'mobx-react-lite';

import {LIGHT_GRAY, GRAY, RED, DARK} from '../../styles/colors';
import {hitSlop} from '../../styles/common';

import hidden from '../../assets/images/login/hidden.png';
import visible from '../../assets/images/login/visible.png';
import error from '../../assets/images/login/error.png';
import {useStores} from '../../store/rootStoreContext';

interface LoginInputProps {
  placeholder: string;
  login?: string;
  onChangeLogin: (text: string) => void;
  password?: boolean;
  validationError?: boolean;
  setValidationError?: (value: React.SetStateAction<boolean>) => void;
}

const LoginInput = ({
  placeholder,
  password = false,
  login,
  onChangeLogin,
  validationError,
}: LoginInputProps): JSX.Element => {
  const {services} = useStores();
  const [isVisible, setIsVisible] = useState(false);

  const errorImageSource = validationError ? error : null;
  const visibilityImageSource = isVisible ? hidden : visible;

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <View
      style={[
        styles.container,
        password && styles.lastMarginBottom,
        validationError && styles.errorStyle,
      ]}>
      <TextInput
        value={login}
        onChangeText={onChangeLogin}
        onFocus={() => services.setValidationError(false)}
        autoCorrect={false}
        secureTextEntry={!isVisible && password}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={GRAY}
      />
      {(password || validationError) && (
        <Pressable
          hitSlop={hitSlop}
          onPress={!validationError ? toggleVisibility : undefined}>
          <Image source={errorImageSource ?? visibilityImageSource} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderRadius: 8,
    minHeight: 47,
    backgroundColor: LIGHT_GRAY,

    paddingTop: 0,
    paddingBottom: 0,

    fontFamily: 'poppins_medium',
    fontStyle: 'normal',
    fontSize: 14,
    lineHeight: 21,
    color: DARK,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LIGHT_GRAY,

    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  lastMarginBottom: {
    // marginBottom: 38,
  },
  errorStyle: {
    borderWidth: 1,
    borderColor: RED,
  },
});

export default observer(LoginInput);
