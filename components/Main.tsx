import React, {useEffect, useState} from 'react';

import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import ProjectsList from './ProjectsList';
import UserData from '../types/userData';
// import {FirebaseAuthTypes} from '@react-native-firebase/auth';
// import {useUserContext} from '../helpers/context';

type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

type MainProps = {
  navigation: MainScreenNavigationProp;
};

function Main({navigation}: MainProps): JSX.Element {
  let [userDataFromSession, setUserDataFromSession] = useState<
    UserData | undefined
  >(undefined);

  async function getUserData() {
    //let jsonValue = null;
    try {
      const result = await AsyncStorage.getItem('@shiftMateAppUserData');
      console.log('1111111111111111111111111111111111');
      console.log('result', result);
      if (result !== null) {
        setUserDataFromSession(result != null ? JSON.parse(result) : null);
      } else {
        navigation.navigate('Login', {itemId: 1});
      }
      //jsonValue = result != null ? JSON.parse(result) : null;
      return result;
    } catch (e) {
      // error reading value
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <Text>Home</Text>
      {userDataFromSession && (
        <ProjectsList
          navigation={navigation}
          emailUser={userDataFromSession.user.email}
        />
      )}
    </View>
  );
}

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
