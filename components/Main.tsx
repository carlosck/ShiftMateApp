import React from 'react';

import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';

const ELEMENTS = [
  {
    id: 1,
    title: 'Lavar Platos',
  },
  {
    id: 2,
    title: 'Bañar a Tati',
  },
  {
    id: 3,
    title: 'Sacar la basura',
  },
  {
    id: 4,
    title: 'Bañarse primero',
  },
  {
    id: 5,
    title: 'Barrer la cochera',
  },
];

type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

type MainProps = {
  navigation: MainScreenNavigationProp;
};

type ItemProps = {
  id: number;
  title: string;
  navigation: MainScreenNavigationProp;
};

const Item = ({id, title, navigation}: ItemProps) => (
  <View style={styles.item}>
    <Pressable>
      <Text
        onPress={() => {
          navigation.navigate('Detail', {itemId: id});
        }}
        style={styles.title}>
        {title}
      </Text>
    </Pressable>
  </View>
);

function Main({navigation}: MainProps): JSX.Element {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <Text>Home</Text>
      <FlatList
        removeClippedSubviews={false}
        data={ELEMENTS}
        renderItem={({item}) => {
          return (
            <Item id={item.id} title={item.title} navigation={navigation} />
          );
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
