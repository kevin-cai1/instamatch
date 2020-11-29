import React from 'react';
import { Text } from 'react-native';

const ChangeDisplayName = () => {

  const changeName = (name) => {
    const body = JSON.stringify({
      "name": name,
    });
    Api.changeUserDetails(username, body)
      .then(() => {
        Toast.show({
          text1: `Display name changed successfully`,
        });
      });
  };

  return (
    <Text>
      Change name
    </Text>
  );
}

export default ChangeDisplayName;
