import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {RootStackParamList} from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {UserContext} from '../';

type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

type MainProps = {
  navigation: MainScreenNavigationProp;
};
async function saveUSerData(user: FirebaseAuthTypes.UserCredential) {
  try {
    await AsyncStorage.setItem('@shiftMateAppUserData', JSON.stringify(user));
  } catch (e) {
    console.log('Error: save UserData');
  }
}

function SignUp({navigation}: MainProps): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  //const UserData = useContext(UserContext);

  const setSignUp: any = () => {
    console.log('email', email);
    console.log('pass', password);

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(_user => {
        console.log('User account created & signed in!', _user);
        /* if (UserData !== null) {
          UserData.setUser(_user);
        } */
        saveUSerData(_user);
        navigation.navigate('Main', {emailUser: 'algo'});
        navigation.navigate('Main', {emailUser: ''});
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

  return (
    <View style={styles.Container}>
      <View>
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.InputField}
        />
        <Text>Name</Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.InputField}
        />
        <Text>Password</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          style={styles.InputField}
        />
        <Text>Re Password</Text>
        <TextInput
          placeholder="retype Password"
          value={repassword}
          onChangeText={setRepassword}
          style={styles.InputField}
        />
        <Pressable onPress={setSignUp}>
          <Text style={styles.Button}>Sign Up</Text>
        </Pressable>
      </View>
      <View>
        <Pressable>
          <Text style={styles.Register}>Login</Text>
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

export default SignUp;
