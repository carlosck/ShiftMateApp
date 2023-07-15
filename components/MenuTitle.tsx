import React from 'react';
import {Text, StyleSheet} from 'react-native';

export default function MenuTitle() {
  return <Text style={styles.title}>Home</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#35d0ba',
  },
});
