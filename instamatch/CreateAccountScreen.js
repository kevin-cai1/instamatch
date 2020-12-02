import React, { useState } from 'react';
import { StyleSheet, Image, View, TouchableWithoutFeedback, Keyboard, Text, TextInput, TouchableOpacity } from 'react-native';
import InstaMatchLogo from './assets/InstaMatchLogo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as yup from 'yup';
import api from './api';
import Toast from "react-native-toast-message";

const storeData = async (username) => {
  try {
    await AsyncStorage.setItem('@username', username)
  } catch (e) {
    console.log("CreateAccountScreen.js: Line 13: " + e);
  }
}

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@username')
    if (value !== null) {
      console.log("username stored: " + value)
    }
  } catch (e) {
    console.log("CreateAccountScreen.js: Line 24: " + e);
  }
}

const AccountDetailValidation = yup.object({
  username: yup.string()
    .required('Must input a username'),
    //.min(5, 'Username must be between 4-12 characters')
    //.max(12, 'Username must be between 4-12 characters'),
  email: yup.string()
    .required('Please enter a valid email address'),
    //.email('Please enter a valid email address'),
  password: yup.string()
    .required('Password must be between 6-12 characters'),
    //.min(6, 'Password must be between 6-12 characters')
    //.max(12, 'Password must be between 6-12 characters'),
  confirmPassword: yup.string()
    .required('Password does not match')
    //.oneOf([yup.ref('password')],'Password does not match')
})

const CreateAccountScreen = ({navigation}) => {
  const Api = new api();
  const createAccountFunction = (accountDetails) => {
    const accJSON = {
      "username": accountDetails.username,
      "email": accountDetails.email,
      "password": accountDetails.password,
      "name": "steve"
    }
    Api.signUp(JSON.stringify(accJSON)).then((response) => {
      console.log("response status: " + response.status);
      console.log("response: " + JSON.stringify(response));
      if (response.result === "success") {
        storeData(accountDetails.username);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Router'}],
        });
        navigation.navigate('Router');
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
      <View style={styles.container}>
        <Image source={InstaMatchLogo} style={styles.logo}/>
        <Formik
          initialValues={{ username: '', email: '', password: '', confirmPassword: ''}}
          validationSchema={AccountDetailValidation}
          onSubmit={(values, actions) => {
            actions.resetForm();
            console.log(values);
            Keyboard.dismiss();
            createAccountFunction(values);
          }}
          style={styles.form}
        >
          {(props) => (
            <View style={styles.form}>
              <TextInput 
                placeholder="Username" 
                style={styles.inputBox}
                value={props.values.username}
                onChangeText={props.handleChange('username')}
                placeholderTextColor='#647C90'
              />
              <Text style={styles.errorText}>{props.touched.username && props.errors.username}</Text>
             <TextInput 
                placeholder="Email" 
                style={styles.inputBox}
                type='email'
                value={props.values.email}
                onChangeText={props.handleChange('email')}
                placeholderTextColor='#647C90'
              />
              <Text style={styles.errorText}>{props.touched.email && props.errors.email}</Text>
              <TextInput 
                placeholder="Password" 
                style={styles.inputBox}
                type='password'
                value={props.values.password}
                onChangeText={props.handleChange('password')}
                placeholderTextColor='#647C90'
              />
              <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>
              <TextInput 
                placeholder="Confirm Password" 
                style={styles.inputBox}
                type='password'
                value={props.values.confirmPassword}
                onChangeText={props.handleChange('confirmPassword')}
                placeholderTextColor='#647C90'
              />
              <Text style={styles.errorText}>{props.touched.confirmPassword && props.errors.confirmPassword}</Text>
              <TouchableOpacity onPress={props.handleSubmit} style={styles.createAccountButton}>
                <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <View>
          <Text style={styles.font}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.signInButton}>
          <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
 )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    margin: 20,
    marginTop: 30,
    alignItems: 'center'
  },
  form: {
    width: 300,
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  inputBox: {
    height: 40,
    borderColor: '#647C90', 
    borderWidth: 1, 
    borderRadius: 13, 
    paddingHorizontal: 10, 
    marginTop: 10,
    fontSize: 18,
  },
  logo: {
    marginTop: 50,
    alignContent: 'center'
  },
  createAccountButton: {
    borderColor:'#1C3AA1',
    alignItems:'center',
    justifyContent:'center',
    width:200,
    height:44,
    backgroundColor:'#1C3AA1',
    borderRadius:24,
    alignSelf: 'flex-end',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: '#474e59',
    shadowOffset: { height: 3, width: 0 }   
  },
  signInButton: {
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    width:132,
    height:44,
    marginTop: 18,
    marginBottom: 30,
  },
  errorText: {
    color: 'crimson',
    marginBottom: 10,
    marginTop: 6,
    fontSize: 16,
    textAlign: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFFFFF'
  },
  signInText: {
    color: '#1C3AA1',
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  font: {
    fontSize: 18,
    alignSelf: 'center',
  }
})
export default CreateAccountScreen;
