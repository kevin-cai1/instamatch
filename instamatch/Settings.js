import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WingBlank, List } from '@ant-design/react-native';
import { Ionicons } from '@expo/vector-icons';
import api from './api';
import { ACCENT_COLOR } from './Constants';

const Settings = ({ navigation }) => {
  const settings = ['Account', 'Notifications'];
  const Api = new api();

  return (
    <View style={style.container}>
      <List>
        <List.Item onPress={() => navigation.navigate('AccountSettings')}>
          <View style={style.nestedLabel}>
            <Text style={style.label}>
              Account
            </Text>
            <Ionicons style={style.arrowIcon} name="ios-arrow-forward" size={28} />
          </View>
        </List.Item>
        <List.Item onPress={() => navigation.navigate('NotificationSettings')}>
          <View style={style.nestedLabel}>
            <Text style={style.label}>
              Notifications 
            </Text>
            <Ionicons style={style.arrowIcon} name="ios-arrow-forward" size={28} />
          </View>
        </List.Item>
        <List.Item onPress={() => navigation.navigate('LandingPage')}>
          <View style={style.nestedLabel}>
            <Text style={style.label}>
              Landing Page 
            </Text>
            <Ionicons style={style.arrowIcon} name="ios-arrow-forward" size={28} />
          </View>
        </List.Item>
      </List>
      <List style={style.logout}>
        <List.Item onPress={() => console.log('handle logout')} >
          <Text style={style.logoutLabel}>
            Logout
          </Text>
        </List.Item>
      </List>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  logout: {
    paddingTop: 80,
  },
  logoutLabel: {
    color: ACCENT_COLOR,
    fontSize: 18,
  },
  nestedLabel:{
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    fontSize: 18,
  },
  arrowIcon: {
    position: 'absolute',
    right: 0,
    color: "#3C3C4380"
  }
});

export default Settings;
