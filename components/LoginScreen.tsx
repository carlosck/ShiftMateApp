import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';

function LoginScreen(): JSX.Element {
  const setLogin: any = () => {};
  return (
    <View style={styles.Container}>
      <Text style={styles.Title}>ShiftMate</Text>
      <View>
        <Text>User</Text>
        <TextInput placeholder="User" style={styles.InputField} />
        <Text>Password</Text>
        <TextInput placeholder="Password" style={styles.InputField} />
        <Pressable onPress={setLogin}>
          <Text style={styles.Button}>Login</Text>
        </Pressable>
      </View>
      <View>
        <Pressable>
          <Text style={styles.Register}>Register</Text>
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
