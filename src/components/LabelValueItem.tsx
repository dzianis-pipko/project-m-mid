import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {LIGHT_GRAY, GRAY, DARK} from '../styles/colors';

interface LabelValueItemProps {
  label: string;
  value: string;
}

const LabelValueItem = ({label, value}: LabelValueItemProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.label]}>{label}</Text>
      <Text style={[styles.text, styles.value]}> {value} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: '100%',
    marginBottom: 17,
  },
  value: {
    backgroundColor: LIGHT_GRAY,
    color: GRAY,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 13,
    minHeight: 47,
    fontSize: 14,
    lineHeight: 21,
  },
  label: {
    color: DARK,
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 24,
  },
  text: {
    fontFamily: 'poppins_medium',
    fontStyle: 'normal',
  },
});

export default LabelValueItem;
