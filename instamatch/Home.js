import React from 'react';
import * as Font from 'expo-font';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { List, Button, WhiteSpace } from '@ant-design/react-native';
import { AntDesign } from '@expo/vector-icons';

const Item = List.Item;
const Activities = [
  [
    {
      label: 'Gym',
      value: 'gym',
    },
    {
      label: 'Brunch',
      value: 'brunch',
    },
  ],
  [
    {
      label: 'Video Call',
      value: 'video call',
    },
    {
      label: 'Dinner',
      value: 'dinner',
    },
  ],
];

const Home = () => {
  return (
    <View style={homeStyles.container}>
      <View style={ homeStyles.header }>
        <Text style={ homeStyles.headerText }>Home</Text>
      </View>
      <List className="picker-list" renderHeader={'Session Details'}>
        <Item extra="1 hr (Default)" arrow="empty" onPress={() => {}}>
          <Text style={homeStyles.row}>I'm free for...</Text>
        </Item>
        <Item extra="Any Activity (Default)" arrow="empty" onPress={() => {}}>
          <Text style={homeStyles.row}>To do...</Text>
        </Item>
        <Item extra="All Friends (Default)" arrow="empty" onPress={() => {}}>
          <Text style={homeStyles.row}>With...</Text>
        </Item>
      </List>
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
    padding: 20,
    borderBottomWidth: 1.5,
    marginBottom: 60,
  },
  headerText: {
    fontSize: 24,
  },
  row: {
    color: '#647C90',
    fontSize: 20,
  },
  buttonContainer: {
    display: 'flex',
    paddingTop: 60,
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
