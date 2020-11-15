import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Router from './Router';
import Home from './Home';
import { Route } from 'react-router'
import { AntDesign } from '@expo/vector-icons';

// declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <Router>
        <Route path="/Home" component={Home} />
      </Router>
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
