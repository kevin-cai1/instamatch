import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import Home from './Home';
import PendingScreen from './PendingScreen'
import MatchedScreen from './MatchedScreen'

const Stack = createStackNavigator();

const HomeNav = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="PendingScreen"
          component={PendingScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="MatchedScreen"
          component={MatchedScreen}
          options={{ title: 'Home' }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default HomeNav;
