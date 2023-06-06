import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function getUSerFromStorage() {
  try {
    const jsonValue = await AsyncStorage.getItem('@shiftMateAppUserData');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
}
