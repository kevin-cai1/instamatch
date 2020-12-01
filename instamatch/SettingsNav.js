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

const Stack = createStackNavigator();

const SettingsNav = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen 
          name="AccountSettings"
          component={AccountSettings}
          options={{ title: 'Account'}} 
        />
        <Stack.Screen 
          name="NotificationSettings"
          component={NotificationSettings}
          options={{ title: 'Notifications'}}
        />
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ title: 'Change Password'}}
        />
        <Stack.Screen
          name="ChangeDisplayName"
          component={ChangeDisplayName}
          options={{ title: 'Change Display Name'}}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default SettingsNav;