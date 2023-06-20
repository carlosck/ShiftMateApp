import React, {useEffect, useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import ProjectsList from './ProjectsList';
import UserData from '../types/userData';
import GetUSerFromStorage from '../helpers/getUSerDataFromStorage';

// import {FirebaseAuthTypes} from '@react-native-firebase/auth';
// import {useUserContext} from '../helpers/context';

function Main({navigation}: any): JSX.Element {
  let [userDataFromSession, setUserDataFromSession] = useState<
    UserData | undefined
  >(undefined);
  const [steps, setSteps] = useState(['init']);
  const options = {
    headerRight: () => (
      <>
        <Pressable>
          <Text
            onPress={() => {
              navigation.navigate('Logout');
            }}>
            Logout
          </Text>
        </Pressable>
        <Pressable>
          <Text style={{marginLeft: 50}}
            onPress={() => {
              navigation.navigate('NewShift', {});
            }}>
            Add Project
          </Text>
        </Pressable>
      </>
    ),
  };

  async function getData() {
    setSteps([...steps, ...['getData']]);
    const data = await GetUSerFromStorage(navigation);
    console.log('data........', data);
    setUserDataFromSession(data);
  }
  useEffect(() => {
    getData();
    navigation.setOptions(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{flex: 1}}>
      <Text>Home_s</Text>
      {userDataFromSession ? (
        <>
          <ProjectsList
            navigation={navigation}
            emailUser={userDataFromSession.user.email}
          />
        </>
      ) : (
        <Text>Cargando usuario</Text>
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
