import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import GetUSerFromStorage from '../helpers/getUSerDataFromStorage';
import DBManager from '../helpers/dbManager';

type ItemProps = {title: string; delUser: Function};

const Item = ({title, delUser}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.itemTitle}>{title}</Text>
    <Pressable>
      <Text
        onPress={() => {
          delUser(title);
        }}>
        X
      </Text>
    </Pressable>
  </View>
);

function EditShiftScreen({route, navigation}: any): JSX.Element {
  const [shiftName, setShiftName] = useState('');
  const [userName, setUserName] = useState<string>('');

  const [emailUser, setEmailUser] = useState<String | undefined>(undefined);

  const [actors, setActors] = useState<string[]>([]);
  const [isLoadingInitialData, setIsLoadingInitialData] = useState(false);
  const [isLoadingSendData, setIsLoadingSendData] = useState(false);

  const addUser = () => {
    setActors([...actors, userName]);
    setUserName('');
  };
  function delUser(user: string) {
    console.log('user to delete', user);
    const filtered = actors.filter(actor => {
      return actor !== user;
    });
    setActors(filtered);
    console.log('filtered', filtered);
  }
  const {projectSlug} = route.params;

  async function getData() {
    const data = await GetUSerFromStorage(navigation);
    console.log('data........', data);
    setEmailUser(data.user.email);
  }

  const getDetailData = async () => {
    console.log('getDetailData');
    console.log('emailUser', emailUser);
    console.log('projectSlug', projectSlug);

    var raw = JSON.stringify({
      mail: emailUser,
      project: projectSlug,
    });
    const db = new DBManager();
    const data = await db.getData('get_project', raw);
    setIsLoadingInitialData(false);
    const resultJson = JSON.parse(data);
    console.log('resultJson', resultJson);
    console.log('resultJson detail--------------->', resultJson.data);
    setActors(resultJson.data.actors);
    setShiftName(resultJson.data.name);
  };

  useEffect(() => {
    if (emailUser) {
      getDetailData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailUser]);

  useEffect(() => {
    setIsLoadingInitialData(true);
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editProject = async () => {
    setIsLoadingSendData(true);
    var raw = JSON.stringify({
      mail: emailUser,
      name: shiftName,
      actors: actors,
      slug: projectSlug,
    });
    const db = new DBManager();
    const data = await db.getData('edit_project', raw);
    const resultJson = JSON.parse(data);
    console.log('resultJson', resultJson.data);
    setIsLoadingSendData(false);
  };

  console.log('init');

  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Edit Shift</Text>
        {!isLoadingInitialData ? (
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
              {isLoadingSendData ? (
                <ActivityIndicator size="small" />
              ) : (
                <Pressable>
                  <Text
                    style={styles.buttonDone}
                    onPress={() => {
                      editProject();
                    }}>
                    Edit
                  </Text>
                </Pressable>
              )}
            </View>
            <View>
              <FlatList
                data={actors}
                renderItem={({item}) => {
                  return <Item title={item} delUser={delUser} />;
                }}
              />
            </View>
          </View>
        ) : (
          <ActivityIndicator size="large" />
        )}
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

export default EditShiftScreen;
