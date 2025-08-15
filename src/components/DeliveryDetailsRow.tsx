import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {GRAY, DARK} from '../styles/colors';

interface DeliveryDetailsRowProps {
  label: string;
  value?: string;
  children?: React.ReactNode;
}

const DeliveryDetailsRow = ({
  label,
  value,
  children,
}: DeliveryDetailsRowProps): JSX.Element => {
  return (
    <View style={[styles.container, children ? styles.hasStatus : undefined]}>
      <Text style={[styles.text, styles.label]}>{label}</Text>
      {!children && <Text style={[styles.text, styles.value]}> {value} </Text>}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  hasStatus: {
    alignItems: 'center',
  },
  label: {
    color: GRAY,
    flexBasis: '40%',
    paddingRight: 5,
  },
  value: {
    flexBasis: '60%',
  },
  text: {
    fontFamily: 'poppins_regular',
    fontStyle: 'normal',
    color: DARK,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default DeliveryDetailsRow;
