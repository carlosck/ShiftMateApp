import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
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

/* type UserDataContext = {
  user: any,
  setUser: any
}
 */
async function saveUSerData(user: FirebaseAuthTypes.UserCredential) {
  try {
    await AsyncStorage.setItem('@shiftMateAppUserData', JSON.stringify(user));
  } catch (e) {
    console.log('Error: save UserData');
  }
}
function LoginScreen({navigation}: MainProps): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [user, setUser] = useUserContext()
  // console.log('UserData', user);

  const setLogin: any = () => {
    //navigation.navigate('Main', {userId: 1});
    auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then(async _user => {
        // const user = useContext(UserContext);
        // setUser(_user);
        console.log('User____> ', _user);
        saveUSerData(_user);
        navigation.navigate('Main', {});
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        if (error.code === 'auth/weak-password') {
          console.log('That password is weak');
        }

        console.error(error);
      });
  };

  const setSignUP: any = () => {
    navigation.navigate('SignUp', {});
  };
  return (
    <View style={styles.Container}>
      <Text style={styles.Title}>ShiftMate</Text>
      <View>
        <Text>User</Text>
        <TextInput
          placeholder="Email"
          style={styles.InputField}
          onChangeText={setEmail}
        />
        <Text>Password</Text>
        <TextInput
          placeholder="Password"
          style={styles.InputField}
          onChangeText={setPassword}
        />
        <Pressable onPress={setLogin}>
          <Text style={styles.Button}>Login</Text>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={setSignUP}>
          <Text style={styles.Register}>Create new account</Text>
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

export default LoginScreen;
