import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Friends from "./Friends";
import FriendsList from "./FriendsList";

const Stack = createStackNavigator();

const FriendsNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Friends" component={Friends} />
        <Stack.Screen name="FriendsList" component={FriendsList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default FriendsNav;

