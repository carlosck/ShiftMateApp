import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import auth from '@react-native-firebase/auth';
import {RootStackParamList} from '../types';

type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

type MainProps = {
  navigation: MainScreenNavigationProp;
};

function SignUp({navigation}: MainProps): JSX.Element {
  const setSignUp: any = () => {
    navigation.navigate('Main', {userId: 1});
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

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
