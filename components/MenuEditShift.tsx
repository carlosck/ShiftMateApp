import React from 'react';
import {Pressable, Text} from 'react-native';

export default function MenuEditShift({navigation, projectSlug}: any) {
  const EditShiftClick: any = () => {
    navigation.navigate('EditShift', {projectSlug: projectSlug});
  };

  return (
    <>
      <Pressable>
        <Text
          onPress={() => {
            EditShiftClick(projectSlug);
          }}>
          Edit
        </Text>
      </Pressable>
    </>
  );
}
