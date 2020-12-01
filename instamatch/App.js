import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import LandingScreenNav from './routes/LandingScreenNav';


// declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
    <LandingScreenNav/>   
    <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
