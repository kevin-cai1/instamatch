import React from 'react';
import { StyleSheet, View, TextInput, Text, Dimensions, Keyboard } from 'react-native';
import { WingBlank, Button, InputItem } from '@ant-design/react-native';
import Toast from 'react-native-toast-message';
import { ACCENT_COLOR } from './Constants';
import api from './api';

const screen = Dimensions.get("window");

const ChangeDisplayName = () => {
  const username = "xX_charmander_Xx";
  const Api = new api();
  const [displayName, setDisplayName] = React.useState('');

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

  const handleSubmit = () => {
    
    Keyboard.dismiss();

  }

  return (
    <WingBlank style={styles.container} >
      <View style={styles.form} >
        <TextInput 
          style={styles.inputbox}
          value={displayName}
          placeholder="New display name"
          onChangeText={(text) => {setDisplayName(text)}}
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

export default ChangeDisplayName;
