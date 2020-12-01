import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccountScreen from "../CreateAccountScreen";
import LoginScreen from "../LoginScreen";
import LandingScreen from "../LandingScreen";
import Router from './Router';

const Stack = createStackNavigator();

const LandingScreenNav = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen 
          name="LandingScreen"
          component={LandingScreen}
        />
        <Stack.Screen 
          name="CreateAccountScreen"
          component={CreateAccountScreen}
        />
        <Stack.Screen 
          name="LoginScreen"
          component={LoginScreen}
        />
        <Stack.Screen 
          name="Router"
          component={Router}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default LandingScreenNav;