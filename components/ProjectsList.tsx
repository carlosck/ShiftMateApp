import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  Button,
} from 'react-native';
import {RootStackParamList} from '../types';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

type MainProps = {
  navigation: MainScreenNavigationProp;
  emailUser: any;
};

type ItemProps = {
  name: string;
  navigation: MainScreenNavigationProp;
};

const Item = ({name, navigation}: ItemProps) => (
  <View style={styles.item}>
    <Pressable>
      <Text
        onPress={() => {
          navigation.navigate('Detail', {itemName: name});
        }}
        style={styles.title}>
        {name}
      </Text>
    </Pressable>
  </View>
);

export default function ProjectsList({
  navigation,
  emailUser,
}: MainProps): JSX.Element {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    console.log('emailUser->', emailUser);
    getProjects(emailUser);
  }, [emailUser]);

  const getProjects = async (emailUser: String) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        mail: emailUser,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      await fetch(
        'https://shift-mate-crud.vercel.app/api/get_user',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          console.log('3333333333333333333333333333333');
          console.log('response.json', JSON.parse(result));
          const resultJson = JSON.parse(result);
          setProjects(resultJson.data);
          console.log(result);
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log('error---->', error);
    }
    // setLoaded(true);
  };
  function AddProjectClick() {
    navigation.navigate('NewShift', {});
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProjects(emailUser);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      {projects == null ? (
        <ActivityIndicator size="large" />
      ) : projects.length === 0 ? (
        <>
          <Text>0 Projects</Text>
          <Button
            onPress={() => {
              AddProjectClick();
            }}
            title="Add Project"
          />
        </>
      ) : (
        <FlatList
          removeClippedSubviews={false}
          data={projects}
          renderItem={({item}) => {
            console.log('item', item);
            return <Item name={item.name} navigation={navigation} />;
          }}
        />
      )}
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
