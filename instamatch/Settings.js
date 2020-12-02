import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { WingBlank, List } from '@ant-design/react-native';
import { Ionicons } from '@expo/vector-icons';
import api from './api';
import { ACCENT_COLOR } from './Constants';

const Settings = ({ navigation }) => {
  const username = "Kevin07";
  const [displayName, setDisplayName] = React.useState('Display Name');
  const [name, setName] = React.useState('Profile');
  const [profilePic, setProfilePic] = React.useState('');
  const Api = new api();

  React.useEffect(() => {
    Api.getUserDetails(username)
      .then((result) => {
        (result.name) && setDisplayName(result.name);
        (result.username) && setName(result.username);
        (result.profile_img) && setProfilePic(result.profile_img);
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
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#AB0053",
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
