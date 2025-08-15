import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

// COMPONENTS
import {SelectList} from 'react-native-dropdown-select-list';

// STYLES
import {DARK, LIGHT_GRAY} from '../styles/colors';
import dropdown from '../assets/images/dropdown.png';
import {TruckDetails} from '../types/truck';

interface DropdownListProps {
  data: TruckDetails[];
  setSelected: (selectedTruck: string) => void;
}

const DropdownList = ({data, setSelected}: DropdownListProps): JSX.Element => {
  // TODO
  // Получение данных с сервера и сохранение в стор
  // key - это будет уникальный ID для поиска в сторе нужной инфы о траке
  // const data = [
  //   {key: '1', value: 'Truck 1'},
  //   {key: '2', value: 'Truck 2'},
  //   {key: '3', value: 'Truck 3'},
  //   {key: '4', value: 'Truck 4'},
  //   {key: '5', value: 'Truck 5'},
  //   {key: '6', value: 'Truck 6'},
  //   {key: '7', value: 'Truck 7'},
  // ];

  const mappedData = data.map(truck => {
    return {
      key: truck.id,
      value: truck.registrationNo,
    };
  });

  return (
    <View style={styles.container}>
      <SelectList
        setSelected={(selectedTruck: string) => setSelected(selectedTruck)}
        data={mappedData}
        defaultOption={mappedData[0]}
        save="key"
        search={false}
        boxStyles={styles.boxStyles}
        dropdownStyles={styles.boxStyles}
        inputStyles={styles.listText}
        dropdownTextStyles={styles.listText}
        fontFamily="poppins_regular"
        arrowicon={<Image style={styles.dropdownIcon} source={dropdown} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  boxStyles: {
    borderWidth: 0,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 8,
  },
  container: {
    minWidth: '100%',
    marginBottom: 22,
  },
  listText: {
    fontStyle: 'normal',
    color: DARK,
    fontSize: 16,
    lineHeight: 24,
  },
  dropdownIcon: {
    width: 24,
    height: 24,
  },
});

export default DropdownList;
