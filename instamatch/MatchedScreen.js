import React, {useState} from 'react';
import * as Font from 'expo-font';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { List, Button, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { AntDesign } from '@expo/vector-icons';
import CountDown from 'react-native-countdown-component';
import api from './api';

const MatchedScreen = ( { navigation, route } ) => {
  const username = route.params.user;
  const hours = 1
  const minutes = 10
  console.log("params: " + JSON.stringify(route));
  console.log("end time: " + route.params.endTime);
  const getUsername = async () => {
    try {
      return await AsyncStorage.getItem('@username')
    } catch(e) {
      console.log(e);
    }
  };
  const Api = new api();

  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.list}>
        <Text style={homeStyles.rowVariable}>It's a match!</Text>
        <Text style={homeStyles.row}>{route.params.activity}</Text>
        <View style={homeStyles.buttonContainer}>
          <View
            style={{ borderWidth:1,
              borderColor:'#647C90',
              alignItems:'center',
              justifyContent:'center',
              width:210,
              height:100,
              backgroundColor:'#647C90',
              borderRadius:10,
            }}
            >
            <CountDown
              until={ route.params.endTime }
              size={20}
              onFinish={() => {
                handleCancelMatch();
              }}
              digitStyle={{backgroundColor: '#647C90'}}
              digitTxtStyle={{color: 'white', fontWeight: "400", fontSize: 24}}
              timeToShow={['H', 'M', 'S']}
              timeLabels={{m: null, s: null}}
              separatorStyle={{color: 'white', fontWeight: "400"}}
              showSeparator
            />
          </View>
        </View>
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
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    color: '#647C90',
    fontSize: 20,
  },
  rowVariable: {
    fontSize: 20,
    fontWeight: '600',
    color: '#647C90',
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
  },
  cancel: {
    color: 'white',
    fontSize: 16,
  }
});

export default MatchedScreen;
