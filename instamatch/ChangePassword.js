import React from 'react';
import { StyleSheet, View, TextInput, Text, Dimensions, Keyboard } from 'react-native';
import { WingBlank, Button, InputItem } from '@ant-design/react-native';
import Toast from 'react-native-toast-message';
import { ACCENT_COLOR } from './Constants';
import api from './api';

const screen = Dimensions.get("window");

const ChangePassword = ({ navigation }) => {
  const username = "xX_charmander_Xx";
  const Api = new api();
  const [password, setPassword] = React.useState('');
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

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
    navigation.goBack();
  };

  React.useEffect(() => {
    Api.getUserDetails(username)
      .then((result) => {
        console.log(result);
        (result.password) && setPassword(result.password);
      });
  }, []);

  const handleSubmit = () => {
    console.log(currentPassword);
    console.log(newPassword);
    console.log(confirmPassword);
    if (newPassword !== confirmPassword) {
      Toast.show({
        text1: `New passwords do not match`,
        type: 'error',
      });
    } else if (currentPassword !== password) {
      Toast.show({
        text1: `Current password is not valid`,
        type: 'error',
      });
    } else {
      changePassword(newPassword);
    }
    Keyboard.dismiss();

  }
    

  return (
    <WingBlank style={styles.container} >
      <View style={styles.form} >
        <TextInput 
          style={styles.inputbox}
          value={currentPassword}
          placeholder="Current Password"
          secureTextEntry={true}
          onChangeText={(text) => {setCurrentPassword(text)}}
        />
        <TextInput
          style={styles.inputbox}       
          value={newPassword}
          placeholder="New Password"
          secureTextEntry={true}
          onChangeText={(text) => {setNewPassword(text)}}
        />
        <TextInput 
          style={styles.inputbox}
          value={confirmPassword}
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={(text) => {setConfirmPassword(text)}}
        />

        <Button style={styles.button} onPress={() => handleSubmit()}>
          <Text style={styles.buttonLabel}>
            Confirm
          </Text>
        </Button>
      </View>
    </WingBlank>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: screen.height * 0.08,
    marginLeft: screen.width * 0.08,
    marginRight: screen.width * 0.08,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: '#F2F2F2',
  },
  inputbox: {
    borderWidth: 1,
    borderColor: ACCENT_COLOR,
    padding: 10,
    fontSize: 18,
    borderRadius: 10,
    height: 40,
    marginBottom: 40,
  },
  button: {
    color: ACCENT_COLOR,
    backgroundColor: ACCENT_COLOR,
    borderRadius: 30,
    width: screen.width * 0.4,
    alignSelf: "flex-end"
  },
  buttonLabel: {
    color: '#FFFFFF'
  }
});

export default ChangePassword;
