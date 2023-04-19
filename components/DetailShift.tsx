import React from 'react';
import {View, Text, FlatList, StyleSheet, Pressable} from 'react-native';

interface Shift {
  id: number;
  title: string;
  shift: number;
}
const SHIFTS: Array<Shift> = [
  {
    id: 1,
    title: 'Carlos',
    shift: 0,
  },
  {
    id: 2,
    title: 'Benjamín',
    shift: 1,
  },
  {
    id: 3,
    title: 'Carlitos',
    shift: 2,
  },
];
const CURRENT_SHIFT_ID = 1;
const LAST_CHANGE_DATE = '01/01/2023';
let curren_shift_user: Shift = {
  id: 0,
  title: '',
  shift: 0,
};
const orderShifts = (shifts: any) => {
  let index = shifts.findIndex(
    (element: Shift) => element.shift === CURRENT_SHIFT_ID,
  );
  curren_shift_user = SHIFTS[index];
  const prev = shifts.splice(0, index);
  const next = shifts.splice(index);

  return [...next, ...prev];
};

let ORDERED_SHIFTS = orderShifts(SHIFTS);

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.itemTitle}>{title}</Text>
  </View>
);
function DetailShift(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lavar Trastes</Text>
      <View>
        <Text style={styles.lastChangeTitle}>
          Last Change:{' '}
          <Text style={styles.lastChangeDate}>{LAST_CHANGE_DATE} </Text>{' '}
        </Text>
        <Text style={styles.current}>Current Assigned</Text>
        <Text style={styles.currentShift}>{curren_shift_user.title}</Text>
      </View>
      <Pressable>
        <Text style={styles.buttonDone}>Done</Text>
      </Pressable>
      <View>
        <Text>Ordered List</Text>
        <FlatList
          removeClippedSubviews={false}
          data={ORDERED_SHIFTS}
          renderItem={({item}) => {
            return <Item title={item.title} />;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemTitle: {
    fontSize: 15,
    textAlign: 'center',
  },
  current: {
    fontSize: 15,
    marginBottom: 5,
    textAlign: 'center',
  },
  currentShift: {
    fontSize: 50,
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  buttonDone: {
    backgroundColor: '#000',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    color: '#fff',
    borderRadius: 15,
    textAlign: 'center',
  },
  lastChangeTitle: {
    fontSize: 12,
    marginBottom: 0,
    textAlign: 'center',
  },
  lastChangeDate: {
    fontSize: 12,
    marginBottom: 0,
    textAlign: 'center',
  },
});
export default DetailShift;
