import React from 'react';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateAccountScreen from "../CreateAccountScreen";
import LoginScreen from "../LoginScreen";
import LandingPage from "../LandingPage";
import Router from './Router';

const Stack = createStackNavigator();

const LandingScreenNav = () => {
  return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen 
          name="LandingPage"
          component={LandingPage}
        />
        <Stack.Screen 
          name="CreateAccountScreen"
          component={CreateAccountScreen}
          options={{
            animationEnabled: false,
          }}
        />
        <Stack.Screen 
          name="LoginScreen"
          component={LoginScreen}
          options={{
            animationEnabled: false,
          }}
        />
      </Stack.Navigator>
  );
}

export default LandingScreenNav;