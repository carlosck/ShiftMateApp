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
    <View style={styles.container}>
      <Text style={styles.title}>ShiftMate</Text>
      <View>
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
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 50,
    alignContent: 'center',
    alignItems: 'center',
  },
  centered: {
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    textAlign: 'center',
    color: '#35d0ba',
    fontWeight: 600,
  },
  InputField: {
    borderWidth: 1,
    borderColor: '#000',
    width: 250,
    marginBottom: 20,
  },
  Button: {
    backgroundColor: '#393e46',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    color: '#fefed5',
    borderRadius: 15,
    textAlign: 'center',
    width: 250,
  },
  Register: {
    fontSize: 15,
    padding: 25,
    textDecorationLine: 'underline',
  },
});

export default LogoutScreen;
