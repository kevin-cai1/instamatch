import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Router from './Router';

const Stack = createStackNavigator();

const MainAppRoutes = () => {
  return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen 
          name="Router"
          component={Router}
        />
      </Stack.Navigator>
  );
}

export default MainAppRoutes;