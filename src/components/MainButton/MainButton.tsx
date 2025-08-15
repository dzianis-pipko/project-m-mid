import React from 'react';
import {
  StyleSheet,
  Text,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
} from 'react-native';

import {GREEN, WHITE} from '../../styles/colors';

interface MainButtonProps {
  title: string;
  outlined?: boolean;
  onPress?: () => void;
  containerStyles?: StyleProp<ViewStyle>;
}

const MainButton = ({
  title,
  outlined = false,
  onPress,
  containerStyles,
}: MainButtonProps): JSX.Element => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.common,
        outlined ? styles.outlined : styles.primary,
        containerStyles,
      ]}>
      <Text
        style={[
          styles.title,
          outlined ? styles.outlinedTitle : styles.primaryTitle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  common: {
    flex: 1, // for YesNoScreen
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // minWidth: '100%',
    borderRadius: 8,
    height: 56,
    maxHeight: 56,
  },
  primary: {
    backgroundColor: GREEN,

    shadowColor: GREEN,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  outlined: {
    borderWidth: 1,
    borderColor: GREEN,
    borderStyle: 'solid',
  },
  title: {
    flex: 1,
    fontFamily: 'poppins_regular',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  primaryTitle: {
    color: WHITE,
    fontFamily: 'poppins_semibold',
  },
  outlinedTitle: {
    fontFamily: 'poppins_medium',
    color: GREEN,
  },
});

export default MainButton;
