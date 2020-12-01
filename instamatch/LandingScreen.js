import React from 'react';
import { StyleSheet, Image, View, TouchableWithoutFeedback, Keyboard, Text, TextInput } from 'react-native';
import { InputItem, Button } from '@ant-design/react-native';

const LandingScreen = ({ navigation }) => {
  return (
    <View style={landing.container}>
      <Text>A great app for instantly finding friends who are free!</Text>
      <Text>Tell us how long you're free for an get matched to other available friends.</Text>
      <Button
            style={[landing.button, landing.secondaryButton]}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <View style={landing.buttonContent}>
              <Text style={landing.buttonText}>Login</Text>
            </View>
      </Button>
      <Button
            style={[landing.button, landing.secondaryButton]}
            onPress={() => navigation.navigate('CreateAccountScreen')}
          >
            <View style={landing.buttonContent}>
              <Text style={landing.buttonText}>Sign Up</Text>
            </View>
      </Button>
    </View>
  )
}

const landing = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#F2F2F2',
  },
  buttonContent: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
  },
  button: {
    height: 120,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 33,
    width: 160,
    textAlign: 'center',
    marginLeft: 13,
    marginRight: 13,
  },
  whitespace: {
    margin: 40,
  },
  primaryButton: {
    backgroundColor: '#1C3AA1',
  },
  secondaryButton: {
    backgroundColor: '#0C1843',
  },
  friendText: {
    paddingTop: 5,
  },
});


export default LandingScreen;