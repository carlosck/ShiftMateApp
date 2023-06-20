import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function GetUSerFromStorage(navigation: any) {
  try {
    const result = await AsyncStorage.getItem('@shiftMateAppUserData');
    console.log('GetUSerFromStorage');

    if (result) {
      return JSON.parse(result);
    } else {
      navigation.navigate('Login', {itemId: 1});
    }
    //jsonValue = result != null ? JSON.parse(result) : null;
    return result;
  } catch (e) {
    console.log('error en');
    console.log(e);
    // error reading value
  }
}
