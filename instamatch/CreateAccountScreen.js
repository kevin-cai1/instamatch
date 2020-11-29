import React from 'react';
import { StyleSheet, Image, View, TouchableWithoutFeedback, Keyboard, Text } from 'react-native';
import { InputItem, Button } from '@ant-design/react-native';
import InstaMatchLogo from './assets/InstaMatchLogo.png';
import { Formik } from 'formik';
import * as yup from 'yup';

const AccountDetailValidation = yup.object({
  username: yup.string()
    .required('Must input a username')
    .min(5, 'Username must be between 4-12 characters')
    .max(12, 'Username must be between 4-12 characters'),
  email: yup.string()
    .required('Must input an email address')
    .email('Must be a valid email'),
  password: yup.string()
    .required('Password must be between 6-12 characters')
    .min(6, 'Password must be between 6-12 characters')
    .max(12, 'Password must be between 6-12 characters'),
  confirmPassword: yup.string()
    .required('Password does not match')
    .oneOf([yup.ref('password')],'Password does not match')
})

const CreateAccountScreen = () => {
 return (
   <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={styles.container}>
      <View style={styles.container}>
        <Image source={InstaMatchLogo}/>
        <Formik
          initialValues={{ username: '', password: ''}}
          validationSchema={AccountDetailValidation}
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
      </View>
    </TouchableWithoutFeedback>
 )
};


const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: '#F2F2F2',
  },
  inputbox: {
    borderWidth: 5,
    borderColor: '#1C3AA1',
    backgroundColor: '#FFFFFF',
    padding: 10,
    fontSize: 18,
    borderRadius: 6
  },
  logo: {
    justifyContent: "center"
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
  }
})
export default CreateAccountScreen;
