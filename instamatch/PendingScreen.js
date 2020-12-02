import React, {useState} from 'react';
import * as Font from 'expo-font';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { List, Button, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { AntDesign } from '@expo/vector-icons';
import CountDown from 'react-native-countdown-component';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import api from './api';

console.disableYellowBox = true;
const PendingScreen = ( { navigation, route } ) => {
  const now = Date.now();
  const strHours = route.params.hours.split(' ');
  const hours = parseInt(strHours[0], 10);
  const strMins = route.params.minutes.split(' ');
  const minutes = parseInt(strMins[0], 10);
  const username = "miran";
  const Api = new api();

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     Api.checkMatch(username)
  //       .then((response) => {
  //
  //       })
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  const handleCancelMatch = () => {
    Api.deleteFromMatchQueue(username)
      .then((response) => {
        if(response.result == "success") {
          console.log("success deleting");
          navigation.replace('Home');
        } else {
          Toast.show({
            text1: "We couldn't remove you from queue.",
            type: "error",
          })
        }
      });
    Api.checkMatchQueue()
      .then((checkResponse) => {
        console.log("QUEUE LOOKS LIKE", checkResponse.users);
      });
  };
  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.list}>
        <Text style={homeStyles.row}>Looking for a friend in <Text style={homeStyles.rowVariable}>{route.params.friends}</Text></Text>
        <Text style={homeStyles.row}>to do <Text style={homeStyles.rowVariable}>{route.params.activity}</Text></Text>
        <View style={homeStyles.dotsContainer}>
          <AnimatedEllipsis numberOfDots={3}
                  minOpacity={0.3}
                  animationDelay={400}
                  style={{
                    color: '#647C90',
                    fontSize: 72,
                    letterSpacing: -15,
                  }}
                  />
        </View>
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
              until={ 60 * (60 * hours + minutes) }
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
          <TouchableOpacity
            style={{ borderWidth:1,
              borderColor:'#1C3AA1',
              alignItems:'center',
              justifyContent:'center',
              width:108,
              height:44,
              backgroundColor:'#1C3AA1',
              borderRadius:24,
              marginTop:144,
              shadowOpacity: 0.5,
              shadowRadius: 3,
              shadowColor: '#474e59',
              shadowOffset: { height: 3, width: 0 }
            }}
            onPress={() => {
              handleCancelMatch();
            }}
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
    paddingTop: 0,
    justifyContent: "center",
    alignItems: "center",
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

export default PendingScreen;
