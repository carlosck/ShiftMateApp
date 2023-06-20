import StyleSheet from 'react-native';
export default class ListStyles {
  static getStyle() {
    return StyleSheet.create({
      container: {
        flex: 1,
      },
      item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
      },
    });
  }
}
