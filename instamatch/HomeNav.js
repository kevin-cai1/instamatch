import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import Home from './Home';
import MatchScreen from './MatchScreen'

const Stack = createStackNavigator();

const HomeNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerStyle: { backgroundColor: '#f2f2f2', shadowColor: 'transparent' }, }} />
        <Stack.Screen
          name="MatchScreen"
          component={MatchScreen}
          options={{ title: 'Home', headerStyle: { backgroundColor: '#f2f2f2', shadowColor: 'transparent' }, }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default HomeNav;
