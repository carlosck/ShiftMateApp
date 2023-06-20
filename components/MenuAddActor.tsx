import React from 'react';
import {Pressable, Text} from 'react-native';

export default function MenuAddActor(navigation: any, emailUser: any) {
  const AddActorClick: any = () => {
    navigation.navigate('NewActor', {});
  };

  return (
    <>
      <Pressable>
        <Text>Logout</Text>
      </Pressable>
      <Pressable>
        <Text
          onPress={() => {
            AddActorClick(emailUser);
          }}>
          Add Project
        </Text>
      </Pressable>
    </>
  );
}
