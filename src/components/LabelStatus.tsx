import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

// STYLES
import {DARK, GRAY2, GREEN, RED, WHITE} from '../styles/colors';
import {Statuses} from '../types/common';

interface LabelStatusProps {
  // status: Statuses;
  status: string;
}

const LabelStatus = ({status}: LabelStatusProps): JSX.Element => {
  let containerStyles: StyleProp<TextStyle> = null;
  let textStyles: StyleProp<TextStyle> = null;

  switch (status) {
    case Statuses.loading:
    case Statuses.loaded:
      containerStyles = {backgroundColor: GREEN};
      break;
    case Statuses.onTheWay:
    case Statuses.beginDelivery:
      containerStyles = {backgroundColor: DARK};
      break;
    case Statuses.inWarehouse:
      containerStyles = {backgroundColor: GRAY2};
      textStyles = {color: DARK};
      break;
    case Statuses.deliveryUnloaded:
      containerStyles = {backgroundColor: RED};
      break;
  }

  return (
    <Text style={[styles.common, containerStyles]}>
      <Text style={[styles.text, textStyles]}>{status}</Text>
    </Text>
  );
};

const styles = StyleSheet.create({
  common: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 70,
    height: 37,
    backgroundColor: GREEN,
  },
  text: {
    fontFamily: 'poppins_regular',
    fontStyle: 'normal',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
    color: WHITE,
  },
});

export default LabelStatus;
