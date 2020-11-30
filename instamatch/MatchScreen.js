import React, {useState} from 'react';
import * as Font from 'expo-font';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { List, Button, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { AntDesign } from '@expo/vector-icons';

const MatchScreen = ( { navigation, route } ) => {
  const now = Date.now();
  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.list}>
        <Text style={homeStyles.row}>Looking for a friend in <Text style={homeStyles.rowVariable}>{route.params.friends}</Text></Text>
        <Text style={homeStyles.row}>to do <Text style={homeStyles.rowVariable}>{route.params.activity}</Text></Text>
        <View style={homeStyles.dotsContainer}>
          <Text>...</Text>
        </View>
        <View style={homeStyles.buttonContainer}>
          <View
            style={{ borderWidth:1,
              borderColor:'#647C90',
              alignItems:'center',
              justifyContent:'center',
              width:200,
              height:90,
              backgroundColor:'#647C90',
              borderRadius:10,
            }}
            >
            <Text style={homeStyles.cta}>{route.params.hours} {route.params.minutes}:00</Text>
          </View>
          <TouchableOpacity
            style={{ borderWidth:1,
              borderColor:'#1C3AA1',
              alignItems:'center',
              justifyContent:'center',
              width:108,
              height:44,
              backgroundColor:'#1C3AA1',
              borderRadius:24,
              marginTop:40
            }}
            onPress={() => navigation.replace('Home')}
          >
            <Text style={homeStyles.cancel}>Cancel</Text>
          </TouchableOpacity>
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
  dotsContainer: {
    display: 'flex',
    paddingTop: 84,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    display: 'flex',
    paddingTop: 84,
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

export default MatchScreen;
