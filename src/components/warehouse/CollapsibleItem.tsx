import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';

// COMPONENTS
import Collapsible from 'react-native-collapsible';
import LabelStatus from '../LabelStatus';

// STYLES
import {DARK, LIGHT_GRAY, WHITE} from '../../styles/colors';
import down from '../../assets/images/arrow_down.png';
import top from '../../assets/images/arrow_top.png';
import {hitSlop} from '../../styles/common';
// import {Statuses} from '../../types/common';
import MainButton from '../MainButton/MainButton';
import {Statuses} from '../../types/common';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DriverNavParams} from '../../types/navigation';

interface CollapsibleItemProps {
  bol?: string;
  address?: string;
  labelStatus: Statuses;
  children: React.ReactNode;
  btnTitle?: string;
  btnAction?: () => void;
}

const CollapsibleItem = ({
  bol,
  address,
  children,
  labelStatus,
  btnTitle,
  btnAction,
}: CollapsibleItemProps): JSX.Element => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const navigation =
    useNavigation<NativeStackNavigationProp<DriverNavParams>>();

  const currentRouteIndex = navigation.getState().routes.length - 1;
  const currentRouteName = navigation.getState().routes[currentRouteIndex].name;

  let MainButtonVisualization;
  switch (currentRouteName) {
    case 'DeliveryOrdersToBegin':
      MainButtonVisualization = (
        <>
          {btnTitle && (
            <MainButton
              title={btnTitle}
              onPress={btnAction}
              containerStyles={styles.btnContainer}
            />
          )}
        </>
      );
      break;
    case 'DeliveryOrdersToLoad':
      MainButtonVisualization = (
        <>
          {((btnTitle && labelStatus === Statuses.inWarehouse) ||
            (btnTitle && labelStatus === Statuses.loading)) && (
            <MainButton
              title={btnTitle}
              onPress={btnAction}
              containerStyles={styles.btnContainer}
            />
          )}
        </>
      );
      break;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        {bol && (
          <Text style={[styles.text, styles.headerText]}>
            <Text style={[styles.text, styles.headerText, styles.bold]}>
              BOL
            </Text>{' '}
            {bol}
          </Text>
        )}
        {!bol && address && (
          <Text style={[styles.text, styles.headerText]}>{address}</Text>
        )}
        <Pressable
          onPress={() => setIsCollapsed(prev => !prev)}
          hitSlop={hitSlop}>
          <Image style={styles.arrowIcon} source={isCollapsed ? down : top} />
        </Pressable>
      </View>
      {/* @ts-ignore */}
      <Collapsible collapsed={isCollapsed}>
        <View style={styles.collapsible}>{children}</View>

        {MainButtonVisualization}
      </Collapsible>
      {isCollapsed && <LabelStatus status={labelStatus} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: LIGHT_GRAY,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 12,
    minWidth: '100%',
    marginBottom: 12,
  },
  collapsible: {
    minWidth: '100%',
    backgroundColor: WHITE,
    paddingHorizontal: 22,
    paddingVertical: 22,
    borderRadius: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  arrowIcon: {width: 24, height: 24},
  headerText: {
    flex: 1,
    marginRight: 10,
  },
  bold: {fontFamily: 'poppins_semibold'},
  text: {
    fontFamily: 'poppins_regular',
    fontStyle: 'normal',
    color: DARK,
    fontSize: 16,
    lineHeight: 24,
  },
  btnContainer: {marginTop: 16, flex: 0},
});

export default CollapsibleItem;
