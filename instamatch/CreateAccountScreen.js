import React, { useState } from 'react';
import { Image, View, TouchableWithoutFeedback, Keyboard, Text, TextInput, TouchableOpacity } from 'react-native';
import InstaMatchLogo from './assets/InstaMatchLogo.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as yup from 'yup';
import api from './api';
import Toast from "react-native-toast-message";
import loginAccountStyles from './styles/LoginAccountStyles';
import Spinner from 'react-native-loading-spinner-overlay';

const storeData = async (username) => {
  try {
    await AsyncStorage.setItem('@username', username)
  } catch (e) {
    console.log("CreateAccountScreen.js: Line 13: " + e);
  }
}

const AccountDetailValidation = yup.object({
  username: yup.string()
    .required('Please enter a username'),
    //.min(5, 'Username must be between 4-12 characters')
    //.max(12, 'Username must be between 4-12 characters'),
  displayName: yup.string()
    .required('Please enter a display name'),
    //.min(5, 'Username must be between 4-12 characters')
    //.max(12, 'Username must be between 4-12 characters'),
  email: yup.string()
    .required('Please enter a valid email address')
    .email('Please enter a valid email address'),
  password: yup.string()
    .required('Password must be between 6-12 characters'),
    //.min(6, 'Password must be between 6-12 characters')
    //.max(12, 'Password must be between 6-12 characters'),
  confirmPassword: yup.string()
    .required('Password does not match')
    .oneOf([yup.ref('password')],'Password does not match')
})

const CreateAccountScreen = ({navigation}) => {
  const Api = new api();
  const [isSpinning, setIsSpinning] = useState(false);

  const createAccountFunction = (accountDetails) => {
    setIsSpinning(true);
    const accJSON = {
      "username": accountDetails.username,
      "email": accountDetails.email,
      "password": accountDetails.password,
      "name": accountDetails.displayName
    }
    Api.signUp(JSON.stringify(accJSON)).then((response) => {
      console.log("response status: " + response.status);
      console.log("response: " + JSON.stringify(response));
      setIsSpinning(false);
      if (response.result === "success") {
        storeData(accountDetails.username);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Router'}],
        });
        navigation.navigate('MainAppRoutes', { screen: 'Router' });
      } else {
        Toast.show({
          text1: `User '${accountDetails.username}' already exists`,
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
          initialValues={{ username: '', displayName: '', email: '', password: '', confirmPassword: ''}}
          validationSchema={AccountDetailValidation}
          onSubmit={(values, actions) => {
            actions.resetForm();
            console.log(values);
            Keyboard.dismiss();
            createAccountFunction(values);
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
                placeholder="Display Name" 
                style={loginAccountStyles.inputBox}
                value={props.values.displayName}
                onChangeText={props.handleChange('displayName')}
                placeholderTextColor='#647C90'
              />
              <Text style={loginAccountStyles.errorText}>{props.touched.displayName && props.errors.displayName}</Text>
             <TextInput 
                placeholder="Email" 
                style={loginAccountStyles.inputBox}
                type='email'
                value={props.values.email}
                onChangeText={props.handleChange('email')}
                placeholderTextColor='#647C90'
              />
              <Text style={loginAccountStyles.errorText}>{props.touched.email && props.errors.email}</Text>
              <TextInput 
                placeholder="Password" 
                style={loginAccountStyles.inputBox}
                type='password'
                value={props.values.password}
                onChangeText={props.handleChange('password')}
                placeholderTextColor='#647C90'
                secureTextEntry={true}
              />
              <Text style={loginAccountStyles.errorText}>{props.touched.password && props.errors.password}</Text>
              <TextInput 
                placeholder="Confirm Password" 
                style={loginAccountStyles.inputBox}
                type='password'
                value={props.values.confirmPassword}
                onChangeText={props.handleChange('confirmPassword')}
                placeholderTextColor='#647C90'
                secureTextEntry={true}
              />
              <Text style={loginAccountStyles.errorText}>{props.touched.confirmPassword && props.errors.confirmPassword}</Text>
              <TouchableOpacity onPress={props.handleSubmit} style={loginAccountStyles.createAccountButton}>
                <Text style={loginAccountStyles.buttonText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <View>
          <Text style={loginAccountStyles.font}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={loginAccountStyles.signInButton}>
          <Text style={loginAccountStyles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
 )
};
export default CreateAccountScreen;
