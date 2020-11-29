import React from 'react';
import { StyleSheet, Image, View, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { InputItem } from '@ant-design/react-native';
import InstaMatchLogo from './assets/InstaMatchLogo.png';
import { Formik } from 'formik';
import * as yup from 'yup';


export default InputBox
const ReviewSchema = yup.object({
  username: yup.string()
    .required()
    .min(5),
  password: yup.string()
    .required()
    .min(6)
})

const LoginScreen = () => {
 return (
   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image source={InstaMatchLogo} style={styles.logo}/>
        <Formik
          initialValues={{ username: '', password: ''}}
          onSubmit={(values, actions) => {
            actions.resetForm();
            console.log(values);
            Keyboard.dismiss();
          }}
        >
          {(props) => (
            <View>
              <InputItem 
                placeholder="Username" 
                styles={styles.inputBox}
                value={props.values.username}
                onChangeText={props.handleChange('username')}
              />
              <InputItem 
                placeholder="Password" 
                styles={styles.inputBox}
                type='password'
                value={props.values.password}
                onChangeText={props.handleChange('password')}
              />
              <Button title='Sign In' onPress={props.handleSubmit} style={styles.button}/>
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
 )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#F2F2F2',
  },
  inputbox: {
    borderWidth: 1,
    borderColor: '#1C3AA1',
    padding: 10,
    fontSize: 18,
    borderRadius: 6
  },
  logo: {
    height: 100
  },
  button: {
    color: '#1C3AA1',
    backgroundColor: '#1C3AA1'
  }
})
export default LoginScreen;
