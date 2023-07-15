/* eslint-disable react-hooks/exhaustive-deps */
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

import MenuEditShift from './MenuEditShift';
import GetUSerFromStorage from '../helpers/getUSerDataFromStorage';
import DBManager from '../helpers/dbManager';

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
  const [currentShift, setCurrentShift] = useState(0);
  const [currentActor, setCurrentActor] = useState('');
  const [actors, setActors] = useState([]);
  const [orderedShifts, setOrderedShifts] = useState<
    ArrayLike<any> | null | undefined
  >([]);

  const [isLoading, setIsLoading] = useState(false);
  const options = {
    // eslint-disable-next-line react/no-unstable-nested-components
    headerRight: () => (
      <>
        <MenuEditShift navigation={navigation} projectSlug={projectSlug} />
      </>
    ),
  };

  const orderShifts = () => {
    console.log('---------------------------------orderShifts--------------');

    let shifts_indexed: Shift[] = [];

    actors.map((item, index) => {
      shifts_indexed.push({
        id: index + 1,
        title: item,
        shift: index,
      });
    });

    let index = shifts_indexed.findIndex(
      (element: Shift) => element.shift === currentShift,
    );

    console.log('index', index);
    console.log('shifts_indexed', shifts_indexed);

    let prev: Shift[] | null = null;
    let next = null;
    if (index === 0) {
      prev = [];
      next = shifts_indexed.slice(1);
    } else {
      prev = shifts_indexed.slice(0, index);
      next = shifts_indexed.slice(index + 1);
    }
    console.log('prev,', prev);
    console.log('next,', next);

    setCurrentActor(actors[currentShift]);
    setOrderedShifts([...next, ...prev]);
  };

  const {projectSlug} = route.params;

  async function getData() {
    const data = await GetUSerFromStorage(navigation);
    console.log('data........', data);
    setEmailUser(data.user.email);
  }
  useEffect(() => {
    console.log('--------DetailShiftScreen---------');
    getData();
    navigation.setOptions(options);
  }, []);
  useEffect(() => {
    if (projectData !== undefined) {
      setActors(projectData.actors);
    }
  }, [projectData]);

  useEffect(() => {
    if (emailUser) {
      getDetailData();
    }
  }, [emailUser]);

  useEffect(() => {
    if (actors.length !== 0) {
      orderShifts();
    }
  }, [currentShift]);

  useEffect(() => {
    if (actors.length !== 0) {
      orderShifts();
    }
  }, [actors]);

  async function getDetailData() {
    if (emailUser) {
      getDetailProject();
    }
  }

  const getDetailProject = async () => {
    var raw = JSON.stringify({
      mail: emailUser,
      project: projectSlug,
    });

    const db = new DBManager();
    const data = await db.getData('get_project', raw);
    const resultJson = JSON.parse(data);
    console.log('resultJson', resultJson.data);
    setCurrentShift(resultJson.data.current);
    setProjectData(resultJson.data);
  };

  const sendNextShift = async () => {
    var raw = JSON.stringify({
      mail: emailUser,
      project: projectSlug,
    });
    const db = new DBManager();
    const data = await db.getData('next_turn', raw);
    const resultJson = JSON.parse(data);
    console.log('resultJson', resultJson.data);
    setIsLoading(false);
    setCurrentShift(resultJson.data.newShift);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {projectData === undefined ? (
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
            </View>
            {isLoading ? (
              <ActivityIndicator size="large" />
            ) : (
              <Pressable>
                <Text
                  style={styles.buttonDone}
                  onPress={() => {
                    sendNextShift();
                  }}>
                  Next
                </Text>
              </Pressable>
            )}
            <Text style={styles.currentShift}>{currentActor}</Text>
            <View>
              <FlatList
                removeClippedSubviews={false}
                data={orderedShifts}
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
    marginBottom: 5,
    textAlign: 'center',
    color: '#35d0ba',
  },
  item: {
    padding: 4,
    marginVertical: 4,
    marginHorizontal: 4,
    borderRadius: 10,
    overflow: 'hidden',
    background: 'transparent',
  },
  itemTitle: {
    fontSize: 30,
    textAlign: 'center',
    color: '#393e46',
    fontWeight: '600',
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
    color: '#35d0ba',
    fontWeight: 'bold',
  },
  buttonDone: {
    backgroundColor: '#393e46',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    color: '#fefed5',
    borderRadius: 15,
    textAlign: 'center',
  },
  lastChangeTitle: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
    color: '#555',
  },
  lastChangeDate: {
    paddingLeft: '10px',
    fontSize: 12,
    marginBottom: 0,
    textAlign: 'center',
    color: '#393e46',
    fontWeight: '600',
  },
});
export default DetailShiftScreen;
