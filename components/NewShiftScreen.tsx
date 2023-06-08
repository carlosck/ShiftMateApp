import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';

import GetUSerFromStorage from '../helpers/getUSerDataFromStorage';
type UserItemProps = {title: string};

const UserItem = ({title}: UserItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

function NewShiftScreen({navigation}: any): JSX.Element {
  const [shiftName, setShiftName] = useState('');
  const [userName, setUserName] = useState<string>('');
  const [userList, setUserList] = useState<string[]>([]);
  //const {emailUser} = route.params;
  const [emailUser, setEmailUser] = useState<String | undefined>(undefined);

  const addUser = () => {
    setUserList([...userList, userName]);
    setUserName('');
  };
  async function getData() {
    const data = await GetUSerFromStorage(navigation);
    console.log('data........', data);
    setEmailUser(data.user.email);
  }
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProject = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      mail: emailUser,
      name: shiftName,
      actors: userList,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    console.log('requestOptions', requestOptions);
    fetch(
      'https://shift-mate-crud.vercel.app/api/create_project',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        console.log(result);
        navigation.navigate('Main');
      })
      .catch(error => console.log('error', error));
  };

  console.log('init');

  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <Text style={styles.title}>New Shift</Text>
        <View>
          <View>
            <Text>Shift Name</Text>
            <TextInput
              placeholder="Wash dishes"
              value={shiftName}
              onChangeText={setShiftName}
              style={styles.InputField}
            />
          </View>
          <View>
            <Text>Add User</Text>
            <TextInput
              value={userName}
              onChangeText={name => {
                setUserName(name);
              }}
              placeholder="New User"
              style={styles.InputField}
            />
            <Pressable>
              <Text
                style={styles.buttonDone}
                onPress={() => {
                  addUser();
                }}>
                Add User
              </Text>
            </Pressable>
            <Pressable>
              <Text
                style={styles.buttonDone}
                onPress={() => {
                  addProject();
                }}>
                Done
              </Text>
            </Pressable>
          </View>
          <View>
            <FlatList
              data={userList}
              renderItem={({item}) => {
                console.log('item', item);
                return <UserItem title={item} />;
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemTitle: {
    fontSize: 15,
    textAlign: 'center',
  },
  current: {
    fontSize: 15,
    marginBottom: 5,
    textAlign: 'center',
  },
  currentShift: {
    fontSize: 50,
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  buttonDone: {
    backgroundColor: '#000',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    color: '#fff',
    borderRadius: 15,
    textAlign: 'center',
  },
  lastChangeTitle: {
    fontSize: 12,
    marginBottom: 0,
    textAlign: 'center',
  },
  lastChangeDate: {
    fontSize: 12,
    marginBottom: 0,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    paddingTop: 50,
    paddingBottom: 50,
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

export default NewShiftScreen;
