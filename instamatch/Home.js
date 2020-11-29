import React from 'react';
import * as Font from 'expo-font';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { List, Button, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { AntDesign } from '@expo/vector-icons';
import ActivityPicker from './ActivityPicker';
import FriendPicker from './FriendPicker';
import TimePicker from './TimePicker';

const Item = List.Item;

const Home = () => {
  return (
    <View style={homeStyles.container}>
      <WingBlank style={ homeStyles.header }>
        <Text style={ homeStyles.headerText }>Home</Text>
      </WingBlank>
      <View style={ homeStyles.list }>
        <TimePicker/>
        <ActivityPicker/>
        <FriendPicker/>
      </View>
      <View style={homeStyles.buttonContainer}>
        <TouchableOpacity
          style={{ borderWidth:1,
            borderColor:'#1C3AA1',
            alignItems:'center',
            justifyContent:'center',
            width:172,
            height:172,
            backgroundColor:'#1C3AA1',
            borderRadius:100,
          }}
          >
          <Text style={homeStyles.cta}>Start Now!</Text>
        </TouchableOpacity>
      </View>
    </View>);
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
    marginBottom: 100,
  },
  headerText: {
    fontSize: 24,
  },
  list: {
    padding: 10,
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
