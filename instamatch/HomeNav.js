import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import Home from './Home';
import PendingScreen from './PendingScreen'
import MatchedScreen from './MatchedScreen'

const Stack = createStackNavigator();

const HomeNav = () => {
  return (
    <Stack.Navigator screenOptions={{ headerStatusBarHeight: 0, }}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen
          name="PendingScreen"
          component={PendingScreen}
          options={({navigation}) => ({
            title: 'Home'
          })}
        />
        <Stack.Screen
          name="MatchedScreen"
          component={MatchedScreen}
          options={({navigation}) => ({
            title: "It's a match!",
            headerLeft: () => (
              <TouchableOpacity
                style={ style.cancelSession }
                onPress={() => { navigation.replace("Home") }}
                accessible={true}
                accessibilityLabel="End Session"
              >
                <Text style={ style.cancelSessionText }>Leave</Text>
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
  );
};

const style = StyleSheet.create({
  cancelSession: {
    paddingLeft: 10,
    alignItems:'center',
    justifyContent:'center',
    display: 'flex',
    flexDirection: 'row'
  },
  cancelSessionText: {
    paddingLeft: 5,
    color: '#1C3AA1',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default HomeNav;
