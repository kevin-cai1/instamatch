import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { List } from '@ant-design/react-native';
import { Ionicons } from '@expo/vector-icons';
import api from './api';

const AccountSettings = ({ navigation }) => {
  const Api = new api();

  
  return (
    <View style={style.container}>
      <List>
        <List.Item onPress={() => {console.log('go to change name')}}>
          <View style={style.nestedLabel}>
            <Text style={style.label}>
              Change display name
            </Text>
            <Ionicons style={style.arrowIcon} name="ios-arrow-forward" size={28} />
          </View>
        </List.Item>
        <List.Item onPress={() => {console.log('go to change pw')}}>
          <View style={style.nestedLabel}>
            <Text style={style.label}>
              Change password
            </Text>
            <Ionicons style={style.arrowIcon} name="ios-arrow-forward" size={28} />
          </View>
        </List.Item>
      </List>
      <List style={style.delete}>
        <List.Item onPress={() => console.log('DELETE ACCOUNT')}>
          <Text style={style.deleteLabel}>
            Delete Account
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
  delete: {
    paddingTop: 50,
    color: '#ff0000',
  },
  deleteLabel: {
    color: '#ff0000',
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

export default AccountSettings;
