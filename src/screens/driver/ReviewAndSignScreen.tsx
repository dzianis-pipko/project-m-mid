import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Alert, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import CommentModal from '../../components/CommentModal';
import DeliveryDetailsRow from '../../components/DeliveryDetailsRow';

// COMPONENTS
import Header from '../../components/Header/Header';
import LabelStatus from '../../components/LabelStatus';
import MainButton from '../../components/MainButton/MainButton';
import MenuModal from '../../components/MenuModal';
import SignatureArea from '../../components/SignatureArea';
import CollapsibleItem from '../../components/warehouse/CollapsibleItem';

// STYLES
import {
  DARK,
  GRAY,
  LIGHT_DARK_GRAY,
  LIGHT_GRAY,
  WHITE,
} from '../../styles/colors';
import {Statuses} from '../../types/common';
import {DriverNavParams} from '../../types/navigation';

const ReviewAndSignScreen = (): JSX.Element => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [signature, setSignature] = useState('');
  const [comment, setComment] = useState('');
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const navigation =
    useNavigation<NativeStackNavigationProp<DriverNavParams>>();

  const handleDeliveryComplete = () => {
    if (signature) {
      navigation.popToTop();
      navigation.navigate('DeliveryOrdersToBegin');
    } else {
      Alert.alert(
        'Unable to mark the delivery as completed',
        'The client`s signature is required',
        [{text: 'OK'}],
        {cancelable: true},
      );
    }
  };

  // TODO
  // получение данных
  const deliveries = [
    {
      status: Statuses.delivered,
      address: '17 Westgate Road Cranworth Billington 42/2',
      bol: 'RT6874/01A',
      consignee: 'Jane`s Clothing Ltd',
      contatctNo: '02084562352',
      nop: '14',
    },
    {
      status: Statuses.inWarehouse,
      address: '18 Westgate Road Cranworth Billington 42/2',
      bol: 'RT6874/02A',
      consignee: 'Tom`s Clothing Ltd',
      contatctNo: '0201111111',
      nop: '10',
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        modalVisible={menuVisible}
        setModalVisible={setMenuVisible}
        containerStyles={styles.header}
      />
      <ScrollView
        scrollEnabled={scrollEnabled}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <Text style={[styles.text, styles.title]}>
          Please review the list below and the sign
        </Text>

        <View style={styles.mainContent}>
          {/* subtitle */}
          <View style={styles.subtitleRow}>
            <Text style={[styles.value]}>
              <Text style={[styles.label]}>Delivery Order Ref: </Text>
              RT6874|01A
            </Text>
            <Text style={[styles.value]}>
              <Text style={[styles.label]}>BOLs </Text>
              14
            </Text>
          </View>
          {deliveries.map(item => (
            <CollapsibleItem
              key={item.bol}
              labelStatus={item.status}
              bol={item.bol}>
              <DeliveryDetailsRow label="BoL" value={item.bol} />
              <DeliveryDetailsRow label="Consignee" value={item.consignee} />
              <DeliveryDetailsRow
                label="Delivery address"
                value={item.address}
              />
              <DeliveryDetailsRow
                label="Contatct No."
                value={item.contatctNo}
              />
              <DeliveryDetailsRow label="NOP" value={item.nop} />
              <DeliveryDetailsRow label="Status">
                <LabelStatus status={item.status} />
              </DeliveryDetailsRow>
            </CollapsibleItem>
          ))}

          <View style={styles.signatureContainer}>
            <Text style={[styles.text, styles.signatureTitle]}>
              Customer Signature
            </Text>
            {signature && (
              <Image
                resizeMode={'center'}
                style={styles.signaturePreview}
                source={{uri: signature}}
              />
            )}
            {!signature && (
              <SignatureArea
                setScrollEnabled={setScrollEnabled}
                onOK={signature => setSignature(signature)}
              />
            )}
          </View>
          {comment && (
            <>
              <Text style={styles.commentLabel}>Comment on the order</Text>
              <Text style={styles.comment}>{comment.trim()}</Text>
            </>
          )}
          <MainButton
            containerStyles={styles.btnMarginBottom}
            outlined
            title={comment ? 'Edit comment' : 'Add note'}
            onPress={() => setCommentModalVisible(true)}
          />
          <MainButton
            onPress={handleDeliveryComplete}
            title="Delivery complete"
          />
        </View>

        <MenuModal
          modalVisible={menuVisible}
          setModalVisible={setMenuVisible}
        />
      </ScrollView>
      <CommentModal
        initialInputValue={comment}
        onSavePress={setComment}
        modalVisible={commentModalVisible}
        setModalVisible={setCommentModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: WHITE},
  scrollView: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 150,
    width: '100%',
  },
  header: {
    marginBottom: 0,
  },
  title: {
    maxWidth: 260,
    fontFamily: 'poppins_semibold',
    fontSize: 20,
    lineHeight: 30,
    marginBottom: 25,
    textAlign: 'center',
    marginTop: 40,
  },
  subtitleRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  label: {
    fontFamily: 'poppins_semibold',
    fontStyle: 'normal',
    color: GRAY,
    fontSize: 12,
    lineHeight: 18,
    paddingRight: 20,
  },
  value: {
    fontFamily: 'poppins_regular',
    fontStyle: 'normal',
    color: DARK,
    fontSize: 12,
    lineHeight: 18,
  },
  text: {
    fontFamily: 'poppins_regular',
    fontStyle: 'normal',
    color: DARK,
    fontSize: 16,
    lineHeight: 24,
  },
  btnMarginBottom: {
    marginBottom: 12,
  },
  signatureContainer: {
    height: 200,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: LIGHT_GRAY,

    borderRadius: 12,
    overflow: 'hidden',
    minWidth: '100%',
    marginBottom: 27,
    marginTop: 12,
  },
  signatureTitle: {
    paddingHorizontal: 22,
    paddingVertical: 13,
    color: LIGHT_DARK_GRAY,
  },
  signaturePreview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  commentLabel: {
    fontFamily: 'poppins_medium',
    fontStyle: 'normal',
    color: LIGHT_DARK_GRAY,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 12,
  },
  comment: {
    paddingVertical: 16,
    paddingHorizontal: 22,
    width: '100%',
    backgroundColor: LIGHT_GRAY,
    borderRadius: 8,
    marginBottom: 27,

    fontFamily: 'poppins_regular',
    fontStyle: 'normal',
    color: DARK,
    fontSize: 14,
    lineHeight: 21,
  },
});

export default ReviewAndSignScreen;
