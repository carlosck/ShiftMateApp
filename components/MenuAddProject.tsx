import React from 'react';
import {Pressable, Text} from 'react-native';

export default function MenuAddProject(navigation: any, emailUser: any) {
  const AddProjectClick: any = () => {
    navigation.navigate('NewShift', {});
  };

  return (
    <>
      <Pressable>
        <Text>Logout</Text>
      </Pressable>
      <Pressable>
        <Text
          onPress={() => {
            AddProjectClick(emailUser);
          }}>
          Add Project
        </Text>
      </Pressable>
    </>
  );
}
