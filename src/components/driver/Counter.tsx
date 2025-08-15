import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {LIGHT_GRAY, GRAY, DARK} from '../../styles/colors';

export enum Types {
  totalAmount,
  completed,
  uncompleted,
}

interface LoginInputProps {
  type: Types;
  title: string;
  count: number;
  amount: number;
}

const Counter = ({
  type,
  title,
  count,
  amount,
}: LoginInputProps): JSX.Element => {
  return (
    <View
      style={[
        styles.container,
        type === Types.completed && styles.completed,
        type === Types.uncompleted && styles.uncompleted,
      ]}>
      <Text
        style={[
          styles.text,
          styles.label,
          type === Types.totalAmount && styles.totalAmount,
        ]}>
        {title}
      </Text>
      <Text style={[styles.text, styles.counter]}>
        {count}/{amount}{' '}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    flex: 1,
    fontFamily: 'poppins_medium',
    marginRight: 5,
  },
  counter: {
    fontFamily: 'poppins_regular',
  },
  text: {
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 24,
    color: DARK,
  },
  container: {
    flex: 1,
    minHeight: 47,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: LIGHT_GRAY,

    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 22,
  },
  totalAmount: {
    color: GRAY,
  },
  completed: {
    paddingHorizontal: 20,
    minHeight: 64,
    backgroundColor: 'rgba(54, 161, 93, 0.15)',
  },
  uncompleted: {
    paddingHorizontal: 20,
    minHeight: 64,
  },
});

export default Counter;
