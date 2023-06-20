import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {RootStackParamList} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {useUserContext} from '../helpers/context';

type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

type MainProps = {
  navigation: MainScreenNavigationProp;
};

async function deleteUSerData() {
  try {
    await AsyncStorage.removeItem('@shiftMateAppUserData');
  } catch (e) {
    console.log('Error: save UserData');
  }
}
function LogoutScreen({navigation}: MainProps): JSX.Element {
  const setLogout: any = () => {
    deleteUSerData().then(() => {
      navigation.navigate('Login', {});
    });
  };

  const setCancel: any = () => {
    navigation.navigate('Main', {});
  };
  return (
    <View style={styles.Container}>
      <Text style={styles.Title}>ShiftMate</Text>
      <View>
        <Text>Logout</Text>
        <Pressable onPress={setLogout}>
          <Text style={styles.Button}>Logout</Text>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={setCancel}>
          <Text style={styles.Register}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    paddingTop: 50,
    paddingBottom: 50,
  },
  Title: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
  },
  InputField: {
    borderWidth: 1,
    borderColor: '#000',
    width: 250,
    marginBottom: 20,
  },
  Button: {
    width: 250,
    borderRadius: 5,
    backgroundColor: '#000',
    color: '#fff',
    padding: 10,
    textAlign: 'center',
  },
  Register: {
    fontSize: 15,
    padding: 25,
    textDecorationLine: 'underline',
  },
});

export default LogoutScreen;
