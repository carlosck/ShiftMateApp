import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';

type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

type MainProps = {
  navigation: MainScreenNavigationProp;
};

export default async function GetUSerFromStorage({navigation}: MainProps) {
  try {
    const result = await AsyncStorage.getItem('@shiftMateAppUserData');
    console.log('GetUSerFromStorage');
    // console.log('result', result);
    if (result !== null) {
      return result != null ? JSON.parse(result) : null;
    } else {
      navigation.navigate('Login', {itemId: 1});
    }
    //jsonValue = result != null ? JSON.parse(result) : null;
    return result;
  } catch (e) {
    // error reading value
  }
}
