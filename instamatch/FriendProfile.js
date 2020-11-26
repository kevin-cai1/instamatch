import React from 'react';
import api from './api';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import {WingBlank} from '@ant-design/react-native';
import {StyleSheet, View, Text } from 'react-native';

const FriendProfile = ({ route, navigation }) => {
  const username = route.params.username;
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const Api = new api();

  React.useEffect(() => {
    Api.getUserDetails(username)
      .then((result) => {
        if (result.result === 'success') {
          setFullName(result.name);
          setEmail(result.email);
        }
      });
  }, []);

  return (
    <View>
      <View style={style.profileContainer}>
        <WingBlank>
          <FontAwesome name="user-circle" size={90} color="black" />
          <View style={[style.flexRow, style.profileLine]}>
            <Text style={style.fullName}>{fullName}</Text>
            <FontAwesome5 name="facebook-messenger" size={35} color="#0078FF" style={style.messageIcon}/>
          </View>
          <Text style={style.email}>{email}</Text>
        </WingBlank>
      </View>
      <View style={style.tagsContainer}>
        <WingBlank>
          <View style={[style.flexRow]}>
            <FontAwesome5 name="tags" size={20} color="black" style={style.tagIcon} />
            <Text style={style.tagsText}>Tags</Text>
          </View>
        </WingBlank>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  profileContainer: {
    backgroundColor: '#FFFFFF',
    paddingTop: 30,
    paddingBottom: 20,
  },
  fullName: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  profileLine: {
    justifyContent: 'space-between',
  },
  email: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: '400',
  },
  messageIcon: {
    paddingTop: 9,
  },
  tagsContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },
  tagsText: {
    fontSize: 25,
    fontWeight: '400',
  },
  tagIcon: {
    paddingTop: 9,
    marginRight: 5,
  },
});

export default FriendProfile;