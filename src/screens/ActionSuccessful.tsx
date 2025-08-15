import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {DriverNavParams} from '../types/navigation';

// COMPONENTS
import Header from '../components/Header/Header';
import MenuModal from '../components/MenuModal';
import MainButton from '../components/MainButton/MainButton';

// STYLES
import {DARK, WHITE} from '../styles/colors';
import actionsSuccessful from '../assets/images/action-successful.png';

const ActionSuccessful = (): JSX.Element => {
  const [menuVisible, setMenuVisible] = useState(false);

  const route = useRoute<RouteProp<DriverNavParams, 'ActionSuccessful'>>();

  const title = route.params?.title;
  const subtitle = route.params?.subtitle;
  const onPress = route.params?.onPress;
  const btnTitle = route.params?.btnTitle;
  const outlined = route.params?.outlined ?? false;

  return (
    <View style={styles.container}>
      <Header
        modalVisible={menuVisible}
        setModalVisible={setMenuVisible}
        containerStyles={styles.header}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainContent}>
        <Text style={[styles.text, styles.title]}>{title}</Text>

        <Image style={styles.successIcon} source={actionsSuccessful} />

        {subtitle && (
          <Text style={[styles.text, styles.subtitle]}>{subtitle}</Text>
        )}

        <MainButton outlined={outlined} onPress={onPress} title={btnTitle} />
      </ScrollView>

      <MenuModal modalVisible={menuVisible} setModalVisible={setMenuVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 0,
    backgroundColor: WHITE,
  },
  mainContent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
    width: '100%',
    paddingBottom: 125,
    paddingTop: 40,
  },
  header: {
    marginBottom: 0,
  },
  title: {
    fontFamily: 'poppins_semibold',
    fontSize: 20,
    lineHeight: 30,
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 40,
  },
  text: {
    fontFamily: 'poppins_regular',
    fontStyle: 'normal',
    color: DARK,
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 21,
  },
  successIcon: {
    height: 182,
    width: 182,
    marginBottom: 40,
  },
});

export default ActionSuccessful;
