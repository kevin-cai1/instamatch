import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import * as routes from './routes/index';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  console.disableYellowBox = true;
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="LandingScreenNav" component={routes.LandingScreenNav}/>
        <Stack.Screen name="MainAppRoutes" component={routes.MainAppRoutes}/>
      </Stack.Navigator>
    </NavigationContainer>
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
