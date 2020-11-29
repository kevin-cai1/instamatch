import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import Home from './Home';

const Stack = createStackNavigator();

const HomeNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerStyle: { backgroundColor: '#f2f2f2', shadowColor: 'transparent' }, }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default HomeNav;
