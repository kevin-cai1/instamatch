import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Router from './Router';
import Home from './Home';
import { Route } from 'react-router'
import Toast from 'react-native-toast-message';

// declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <Router>
        <Route path="/Home" component={Home} />
      </Router>
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
