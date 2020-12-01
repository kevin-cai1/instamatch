import React, {useState} from 'react';
import * as Font from 'expo-font';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { List, Button, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { AntDesign } from '@expo/vector-icons';
import ActivityPicker from './ActivityPicker';
import FriendPicker from './FriendPicker';
import TimePicker from './TimePicker';

const Item = List.Item;

const Home = ( {navigation} ) => {
  const now = parseInt(Date.now()/1000);
  const [hr, setHr] = useState("1 hr");
  const [min, setMin] = useState("0 min");
  const [activity, setActivity] = useState("Any Activity");
  const [friends, setFriends] = useState("All Friends");
  const handleStartMatch = () => {
    const strHours = hr.split(' ');
    const hours = parseInt(strHours[0], 10);
    const strMins = min.split(' ');
    const minutes = parseInt(strMins[0], 10);
    const body = JSON.stringify({
      "activity": activity,
      "tag": friends
    });

    // Api.addFriend(username, body)
    //   .then((result) => {
    //     if (result.result) {
    //       Api.getFriendStatus(username, friend)
    //         .then((response) => {
    //           if (response.status === 'friends') {
    //             Toast.show({
    //               text1: `You are now friends with ${friend}!`,
    //             });
    //           } else {
    //             Toast.show({
    //               text1: `Friend request sent to ${friend}.`,
    //             });
    //           }
    //         });
    //     }
    //   });
  };
  return (
    <View style={homeStyles.container}>
      <View style={ homeStyles.list }>
        <TimePicker updateHr={ (value) => { setHr(value) }} updateMin={ (value) => { setMin(value) }}/>
        <ActivityPicker updateActivity={ (value) => { setActivity(value) }}/>
        <FriendPicker updateFriends={ (value) => { setFriends(value) }}/>
      </View>
      <View style={homeStyles.buttonContainer}>
        <TouchableOpacity
          style={{ borderWidth:1,
            borderColor:'#1C3AA1',
            alignItems:'center',
            justifyContent:'center',
            width:180,
            height:180,
            backgroundColor:'#1C3AA1',
            borderRadius:100,
            shadowOpacity: 0.5,
            shadowRadius: 4,
            shadowColor: '#474e59',
            shadowOffset: { height: 5, width: 0 },
          }}
          onPress={() => {
            handleStartMatch();
            navigation.replace('PendingScreen', { hours: hr, minutes: min, activity: activity, friends: friends })
            }
          }
          >
          <Text style={homeStyles.cta}>Start Now!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  header: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1.5,
  },
  headerText: {
    fontSize: 24,
  },
  list: {
    padding: 10,
    marginTop: 100,
  },
  row: {
    color: '#647C90',
    fontSize: 20,
  },
  buttonContainer: {
    display: 'flex',
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  bigButton: {
    backgroundColor: '#1C3AA1',
    borderColor: '#1C3AA1',
  },
  cta: {
    color: 'white',
    fontSize: 20,
  }
});

export default Home;
