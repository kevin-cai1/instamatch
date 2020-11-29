import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import Settings from './Settings';
import NotificationSettings from './NotificationSettings';
import AccountSettings from './AccountSettings';

const Stack = createStackNavigator();

const SettingsNav = () => {
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default SettingsNav;