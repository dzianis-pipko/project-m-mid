import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  ImageSourcePropType,
  Pressable,
} from 'react-native';

// STYLES
import {
  DARK,
  LIGHT_GRAY,
  LIGHT_GREEN,
  TRANSLUCENT_LIGHT_GREEN,
} from '../../styles/colors';

interface HomeScreenMenuItemProps {
  img: ImageSourcePropType;
  title: string;
  isDisabled?: boolean;
  onItemPress: () => void;
}

const HomeScreenMenuItem = ({
  img,
  title,
  isDisabled = false,
  onItemPress,
}: HomeScreenMenuItemProps): JSX.Element => {
  return (
    <Pressable
      onPress={() => !isDisabled && onItemPress()}
      style={[styles.container, isDisabled && styles.containerDisabled]}>
      <Image style={styles.img} source={img} />
      <Text style={[styles.title, isDisabled && styles.titleDisabled]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: TRANSLUCENT_LIGHT_GREEN,
    borderRadius: 12,

    paddingHorizontal: 32,
    paddingVertical: 26,
    marginBottom: 10,
  },
  containerDisabled: {
    backgroundColor: LIGHT_GRAY,
  },

  img: {
    width: 42,
    height: 42,
  },
  title: {
    fontFamily: 'poppins_semibold',
    fontStyle: 'normal',
    fontSize: 16,
    lineHeight: 24,
    color: LIGHT_GREEN,
    textAlign: 'center',
    maxWidth: 134,
  },
  titleDisabled: {
    fontFamily: 'poppins_regular',
    color: DARK,
  },
});

export default HomeScreenMenuItem;
