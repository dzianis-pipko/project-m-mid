import React, {useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

import {LIGHT_GRAY, DARK, GREEN, LIGHT_DARK_GRAY} from '../../styles/colors';

interface LoginInputProps {
  placeholder: string;
}

const Input = ({placeholder}: LoginInputProps): JSX.Element => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <View style={[styles.container, isFocused && styles.focusedStyle]}>
      <TextInput
        autoCorrect={false}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={LIGHT_DARK_GRAY}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
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

    fontFamily: 'poppins_regular',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 24,
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
  focusedStyle: {
    borderWidth: 1,
    borderColor: GREEN,
  },
});

export default Input;
