import React, { useState } from 'react';
import { Text, Image, View, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import InstaMatchLogo from './assets/InstaMatchLogo.js';
import { Formik } from 'formik';
import * as yup from 'yup';
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginAccountStyles from './styles/LoginAccountStyles';
import Toast from "react-native-toast-message";
import notImplementedError from './helper';
import Spinner from 'react-native-loading-spinner-overlay';

const LoginValidation = yup.object({
  username: yup.string()
    .required('Please enter in your username'),
    //.min(5, 'Username must be between 4-12 characters')
    //.max(12, 'Username must be between 4-12 characters'),
  password: yup.string()
    .required('Please enter in your password'),
    //.min(6, 'Password must be between 6-12 characters')
    //.max(12, 'Password must be between 6-12 characters'),
})

const storeData = async (username) => {
  try {
    await AsyncStorage.setItem('@username', username)
  } catch (e) {
    console.log("LoginScreen.js: Line 21: " + e);
  }
}

const LoginScreen = ({navigation}) => {
  const Api = new api();
  const [isSpinning, setIsSpinning] = useState(false);

  const loginFunction = (accountDetails) => {
    setIsSpinning(true);
    Api.login(JSON.stringify(accountDetails)).then((response) => {
      console.log("response status: " + response.status);
      console.log("response: " + JSON.stringify(response));
      setIsSpinning(false);
      if (response.result === "success") {
        storeData(accountDetails.username);
        navigation.navigate('MainAppRoutes', { screen: 'Router' });
      } else {
        Toast.show({
          text1: `Username or password is in incorrect`,
          type: 'error'
        });
      }
    })
  }

 return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={loginAccountStyles.container}>
      <Spinner
        visible={isSpinning}
        textContent={'Loading...'}
        textStyle={{color:'#FFFFFF'}}
      />
      <View style={loginAccountStyles.logo}>
        <InstaMatchLogo/>
      </View>
      <Formik
        initialValues={{ username: '', email: '', password: '', confirmPassword: ''}}
        validationSchema={LoginValidation}
        onSubmit={(values, actions) => {
          actions.resetForm();
          console.log(values);
          Keyboard.dismiss();
          loginFunction(values);
        }}
        style={loginAccountStyles.form}
      >
        {(props) => (
          <View style={loginAccountStyles.form}>
            <TextInput 
              placeholder="Username" 
              style={loginAccountStyles.inputBox}
              value={props.values.username}
              onChangeText={props.handleChange('username')}
              placeholderTextColor='#647C90'
            />
            <Text style={loginAccountStyles.errorText}>{props.touched.username && props.errors.username}</Text>
            <TextInput 
              placeholder="Password" 
              style={loginAccountStyles.inputBox}
              value={props.values.password}
              onChangeText={props.handleChange('password')}
              placeholderTextColor='#647C90'
              secureTextEntry={true}
            />
            <Text style={loginAccountStyles.errorText}>{props.touched.password && props.errors.password}</Text>
            <TouchableOpacity onPress={props.handleSubmit} style={loginAccountStyles.createAccountButton}>
              <Text style={loginAccountStyles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => notImplementedError()} style={{alignSelf: 'flex-end', paddingTop: 36}}>
              <Text style={{fontSize: 18, textDecorationLine: 'underline', color: '#1C3AA1'}}>Forgot login details?</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <View>
        <Text style={loginAccountStyles.font}>Don't have an account yet?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateAccountScreen')} style={loginAccountStyles.signInButton}>
          <Text style={loginAccountStyles.signInText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableWithoutFeedback>
 )
};

export default LoginScreen;