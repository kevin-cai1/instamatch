import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import Settings from './Settings';
import NotificationSettings from './NotificationSettings';
import AccountSettings from './AccountSettings';
import ChangeDisplayName from './ChangeDisplayName';
import ChangePassword from './ChangePassword';
import LandingPage from './LandingPage';
import Profile from './Profile';
import {TouchableOpacity} from "react-native";

const Stack = createStackNavigator();

const SettingsNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen 
        name="AccountSettings"
        component={AccountSettings}
        options={({navigation}) => ({
            title: 'Account',
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingHorizontal: 10,}}
                onPress={() => { navigation.goBack() }}
              >
                  <AntDesign name="left" size={24} color="#1C3AA1" />
              </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen 
        name="NotificationSettings"
        component={NotificationSettings}
        options={({navigation}) => ({
            title: 'Notifications',
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingHorizontal: 10,}}
                onPress={() => { navigation.goBack() }}
              >
                  <AntDesign name="left" size={24} color="#1C3AA1" />
              </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
        name="LandingPage"
        component={LandingPage}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={({navigation}) => ({
            title: 'Change Password',
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingHorizontal: 10,}}
                onPress={() => { navigation.goBack() }}
              >
                  <AntDesign name="left" size={24} color="#1C3AA1" />
              </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
        name="ChangeDisplayName"
        component={ChangeDisplayName}
        options={({navigation}) => ({
            title: 'Change Display Name',
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingHorizontal: 10,}}
                onPress={() => { navigation.goBack() }}
              >
                  <AntDesign name="left" size={24} color="#1C3AA1" />
              </TouchableOpacity>
            ),
        })}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({navigation}) => ({
            title: '',
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingHorizontal: 10,}}
                onPress={() => { navigation.goBack() }}
              >
                  <AntDesign name="left" size={24} color="#1C3AA1" />
              </TouchableOpacity>
            ),
        })}
      />
    </Stack.Navigator>
  );
};

export default SettingsNav;