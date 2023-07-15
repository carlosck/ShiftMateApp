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
import DBManager from '../helpers/dbManager';
type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

type MainProps = {
  navigation: MainScreenNavigationProp;
  emailUser: any;
};

type ItemProps = {
  slug: string;
  name: string;
  navigation: MainScreenNavigationProp;
};

const Item = ({slug, name, navigation}: ItemProps) => (
  <View style={styles.item}>
    <Pressable>
      <Text
        onPress={() => {
          navigation.navigate('Detail', {projectSlug: slug});
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
    if (emailUser !== null) {
      getProjects();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailUser]);

  const getProjects = async () => {
    var raw = JSON.stringify({
      mail: emailUser,
    });
    const db = new DBManager();
    const data = await db.getData('get_user', raw);
    const resultJson = JSON.parse(data);
    console.log('resultJson', resultJson.data);
    setProjects(resultJson.data);
  };

  function AddProjectClick() {
    navigation.navigate('NewShift', {});
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProjects();
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
            return (
              <Item slug={item.id} name={item.name} navigation={navigation} />
            );
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
    backgroundColor: '#35d0ba',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: 'hidden',
    background: 'transparent',
  },
  title: {
    fontSize: 32,
    color: '#fefed5',
  },
});
