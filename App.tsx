/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
//import type {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
/*
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';*/
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Main from './components/Main';
import LoginScreen from './components/LoginScreen';
import LogoutScreen from './components/LogoutScreen';
import DetailShiftScreen from './components/DetailShiftScreen';
import NewShiftScreen from './components/NewShiftScreen';
import EditShiftScreen from './components/EditShiftScreen';
import SignUp from './components/SignupScreen';

import {RootStackParamList} from './types';
import {UserProvider} from './helpers/context';
import MenuTitle from './components/MenuTitle';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#333333',
    },
    footerContainer: {backgroundColor: '#333333'},
  });

  return (
    <>
      <UserProvider>
        <NavigationContainer>
          <View style={styles.container}>
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen
                name="Main"
                component={Main}
                options={{
                  headerTitle: () => <MenuTitle />,
                }}
              />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Logout" component={LogoutScreen} />
              <Stack.Screen name="Detail" component={DetailShiftScreen} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="NewShift" component={NewShiftScreen} />
              <Stack.Screen name="EditShift" component={EditShiftScreen} />
            </Stack.Navigator>
          </View>
        </NavigationContainer>
      </UserProvider>
    </>
  );
}

/*

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
/*
type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

*/
export default App;
