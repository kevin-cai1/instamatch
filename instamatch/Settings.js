import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { WingBlank, List } from '@ant-design/react-native';
import { Ionicons } from '@expo/vector-icons';
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({ navigation }) => {
  const [displayName, setDisplayName] = React.useState('Display Name');
  const [name, setName] = React.useState('Profile');
  const [profilePic, setProfilePic] = React.useState('');
  let listener = null;
  const Api = new api();

  const getUsername = async () => {
    try {
      return await AsyncStorage.getItem('@username')
    } catch(e) {
      console.log(e);
    }
  };

  const loadData = () => {
    getUsername().then((username) => {
      Api.getUserDetails(username)
        .then((result) => {
          console.log(result);
          (result.name) && setDisplayName(result.name);
          (result.username) && setName(result.username);
          (result.profile_img) && setProfilePic(result.profile_img);
        });
    });    
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
    console.log('Done.')
  }

  const logout = () => {
    clearAll();
    console.log('log out');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Router'}],
    });
    navigation.navigate('LandingScreenNav');
  }

  React.useEffect(() => {
    loadData();
    listener = navigation.addListener('focus', () => {
      loadData();
    });
    
  }, []);

  return (
    <View style={style.container}>
      <List style={style.profile}>
        <List.Item onPress={() => navigation.navigate('Profile')}>
          <View style={style.profileItem}>
            <Image
              style={style.profileIcon}
              source={(profilePic) ? {uri: profilePic} : require('./assets/user.png')}
              
            />
            <View style={style.profileLabel}>
              <Text style={style.nameLabel}>
                {name}
              </Text>
              <Text style={style.nameSubLabel}>
                {displayName}
              </Text>
            </View>
            
            <Ionicons style={style.arrowIcon} name="ios-arrow-forward" size={28} />
          </View>
        </List.Item>
      </List>
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
      </List>
      <List style={style.logout}>
        <List.Item onPress={() => logout()} >
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
    color: '#1C3AA1',
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
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#1C3AA1",
    margin: 10,
    marginLeft: 0,
    marginRight: 20,
  },
  profile: {
    marginTop: 10,
    marginBottom: 30,
  },
  profileItem: {
    display: "flex",
    flexDirection: "row",
    textAlign: 'center',
    alignItems: 'center'
  },
  profileLabel: {
    textAlign: "center",
  },
  nameLabel: {
    fontSize: 24,
  },
  nameSubLabel: {
    fontSize: 14,
  }
});

export default Settings;
