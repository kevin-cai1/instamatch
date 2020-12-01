import React from 'react';
import { Text } from 'react-native';

const ChangePassword = () => {

  const changePassword = (password) => {
    const body = JSON.stringify({
      "password": password,
    });
    Api.changeUserDetails(username, body)
      .then(() => {
        Toast.show({
          text1: `Password changed successfully`,
        });
      });
  };
    

  return (
    <Text>
      Change password
    </Text>
  );
}

export default ChangePassword;
