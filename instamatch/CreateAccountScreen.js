import React, { useState } from 'react';
import { StyleSheet, Image, View, TouchableWithoutFeedback, Keyboard, Text, TextInput } from 'react-native';
import { InputItem, Button } from '@ant-design/react-native';
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
              <InputItem 
                placeholder="Username" 
                styles={styles.testBox}
                value={props.values.username}
                onChangeText={props.handleChange('username')}
              />
              <Text style={styles.errorText}>{props.touched.username && props.errors.username}</Text>
             <InputItem 
                placeholder="Email" 
                styles={styles.inputBox}
                type='email'
                value={props.values.email}
                onChangeText={props.handleChange('email')}
              />
              <Text style={styles.errorText}>{props.touched.email && props.errors.email}</Text>
              <InputItem 
                placeholder="Password" 
                styles={styles.inputBox}
                type='password'
                value={props.values.password}
                onChangeText={props.handleChange('password')}
              />
              <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>
              <InputItem 
                placeholder="Confirm Password" 
                styles={styles.inputBox}
                type='password'
                value={props.values.confirmPassword}
                onChangeText={props.handleChange('confirmPassword')}
              />
              <Text style={styles.errorText}>{props.touched.confirmPassword && props.errors.confirmPassword}</Text>
              <Button onPress={props.handleSubmit} type="primary" style={styles.button}>Create Account</Button>
            </View>
          )}
        </Formik>
        <View>
          <Text>Already have an account?</Text>
          <Button onPress={() => navigation.navigate('LoginScreen')}>Sign In</Button>
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
  },
  form: {
    width: 300,
    flex: 1,
    alignSelf: 'center'
  },
  inputBox: {
    height: 40,
    borderColor: '#cccccc', 
    borderWidth: 1, 
    borderRadius: 13, 
    paddingHorizontal: 10, 
    marginTop: 10
  },
  logo: {
    alignSelf: "center"
  },
  button: {
    backgroundColor: "#1C3AA1",
    alignSelf: "flex-end"    
  },
  errorText: {
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 6,
    fontSize: 16,
    textAlign: 'center'
  },
  testBox: {
    borderWidth: 1,
    borderColor: 'crimson',
    padding: 10,
    fontSize: 18,
    borderRadius: 10,
    height: 40,
    marginBottom: 40,
  },
})
export default CreateAccountScreen;
