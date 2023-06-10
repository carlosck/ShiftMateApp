import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';

import GetUSerFromStorage from '../helpers/getUSerDataFromStorage';

interface ProjectDataType {
  actors: Array<String>;
  current: number;
  name: String;
  last_change: any;
}
interface Shift {
  id: number;
  title: string;
  shift: number;
}

let curren_shift_user: Shift = {
  id: 0,
  title: '',
  shift: 0,
};
const orderShifts = (shifts: Array<string>, CURRENT_SHIFT_ID: number) => {
  let shifts_indexed: Shift[] = [];

  shifts.map((item, index) => {
    shifts_indexed.push({
      id: index + 1,
      title: item,
      shift: index,
    });
  });

  let index = shifts_indexed.findIndex(
    (element: Shift) => element.shift === CURRENT_SHIFT_ID,
  );
  console.log('---------------------------------orderShifts--------------');
  console.log('index', index);
  console.log('shifts_indexed', shifts_indexed);
  curren_shift_user = shifts_indexed[index];
  let prev = null;
  let next = null;
  if (index === 0) {
    prev = shifts_indexed.splice(1, 1);
    next = shifts_indexed.splice(1);
  } else {
    prev = shifts_indexed.splice(0, index);
    next = shifts_indexed.splice(index);
  }

  console.log('prev', prev);
  console.log('next', next);
  return [...next, ...prev];
};

let ORDERED_SHIFTS: ArrayLike<any> | null | undefined = [];

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.itemTitle}>{title}</Text>
  </View>
);

function DetailShiftScreen({route, navigation}: any): JSX.Element {
  const [emailUser, setEmailUser] = useState<String | undefined>(undefined);
  const [projectData, setProjectData] = useState<ProjectDataType | undefined>(
    undefined,
  );
  const {projectName} = route.params;

  console.log('projectName-------->', projectName);
  async function getData() {
    const data = await GetUSerFromStorage(navigation);
    console.log('data........', data);
    setEmailUser(data.user.email);
  }
  useEffect(() => {
    console.log('--------DetailShiftScreen---------');
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (emailUser) {
      getDetailData();
    }
  }, [emailUser]);

  async function getDetailData() {
    console.log('emailUser', emailUser);
    console.log('getdetail data', projectName);
    if (emailUser) {
      getDetailProject();
    }
  }

  const getDetailProject = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        mail: emailUser,
        project: projectName,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      await fetch(
        'https://shift-mate-crud.vercel.app/api/get_project',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          console.log('---------getProjectDetail---------');
          console.log('response.json', JSON.parse(result));
          const resultJson = JSON.parse(result);
          console.log('_________x_______', resultJson.data);
          ORDERED_SHIFTS = orderShifts(
            resultJson.data.actors,
            resultJson.data.current,
          );
          console.log('{{{{{{{{{{{{{{{{{{{}}}}}}}}}}}', ORDERED_SHIFTS);
          setProjectData(resultJson.data);
          console.log(result);
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log('error---->', error);
    }
    // setLoaded(true);
  };

  const sendNextShift = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        mail: emailUser,
        project: projectName,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      await fetch(
        'https://shift-mate-crud.vercel.app/api/next_turn',
        requestOptions,
      )
        .then(response => response.text())
        .then(result => {
          console.log('---------sendNextShift---------');
          console.log('response.json', JSON.parse(result));
          const resultJson = JSON.parse(result);
          console.log('_________x_______', resultJson.data);
          console.log(result);
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log('error---->', error);
    }
    // setLoaded(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {projectData == null ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <Text style={styles.title}>{projectData.name}</Text>
            <View>
              <Text style={styles.lastChangeTitle}>
                Last Change:
                <Text style={styles.lastChangeDate}>
                  {new Date(
                    projectData.last_change._seconds * 1000,
                  ).toDateString()}
                </Text>
              </Text>
              <Text style={styles.current}>Current Assigned</Text>
              <Text style={styles.currentShift}>{curren_shift_user.title}</Text>
            </View>
            <Pressable>
              <Text
                style={styles.buttonDone}
                onPress={() => {
                  sendNextShift();
                }}>
                Done
              </Text>
            </Pressable>
            <View>
              <Text>Ordered List</Text>
              <FlatList
                removeClippedSubviews={false}
                data={ORDERED_SHIFTS}
                renderItem={({item}) => {
                  return <Item title={item.title} />;
                }}
              />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
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
});
export default DetailShiftScreen;
