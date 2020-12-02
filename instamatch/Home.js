import React, {useState} from 'react';
import * as Font from 'expo-font';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { List, Button, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { AntDesign } from '@expo/vector-icons';
import ActivityPicker from './ActivityPicker';
import FriendPicker from './FriendPicker';
import TimePicker from './TimePicker';
import api from './api';
import Toast from 'react-native-toast-message';
const Item = List.Item;
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ( {navigation} ) => {
  const now = parseInt(Date.now()/1000);
  const Api = new api();
  const [hr, setHr] = useState("1 hr");
  const [res, setRes] = useState("not set");
  const [min, setMin] = useState("0 min");
  const [activity, setActivity] = useState("Any Activity");
  const [friends, setFriends] = useState("All Friends");
  const [username, setUsername] = useState("");
  const getUsername = async () => {
    try {
      return await AsyncStorage.getItem('@username')
    } catch(e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    getUsername().then((result) => setUsername(result));
  }, []);
  const handleStartMatch = () => {
    const body = JSON.stringify({
      "activity": activity,
      "tag": friends
    });
    Api.addToMatchQueue(username, body)
      .then((response) => {
        if(response.result == "success") {
          console.log("success");
          navigation.replace('PendingScreen', { hours: hr, minutes: min, activity: activity, friends: friends });
        } else {
          Toast.show({
            text1: "Sorry 😔 We encountered a problem while adding you to match queue. Try again later.",
            type: "error",
          })
        }
      });
    Api.checkMatchQueue()
      .then((checkResponse) => {
        console.log(checkResponse.users);
      });
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
