import React from 'react';

import {View, Text, StyleSheet, FlatList} from 'react-native';

const ELEMENTS = [
  {
    id: 1,
    title: 'Lavar Platos',
  },
  {
    id: 2,
    title: 'Baniar a Tati',
  },
  {
    id: 3,
    title: 'Sacar la basura',
  },
  {
    id: 4,
    title: 'Banarse primero',
  },
  {
    id: 5,
    title: 'Barrer la cochera',
  },
];

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

function Main(): JSX.Element {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <Text>Home</Text>
      <FlatList
        removeClippedSubviews={false}
        data={ELEMENTS}
        renderItem={({item}) => {
          return <Item title={item.title} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Main;
/*
<SafeAreaView>
        <FlatList
          data={ELEMENTS}
          renderItem={({item}) => <Item title={item.title} key={item.id} />}
          removeClippedSubviews={false}
        />
      </SafeAreaView>
      */
