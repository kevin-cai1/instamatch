import React, {useState} from 'react';
import * as Font from 'expo-font';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CountDown from 'react-native-countdown-component';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";
import { stringify } from 'uuid';
import { abs } from 'react-native-reanimated';

const PendingScreen = ( { navigation, route } ) => {
  const {hours, minutes, activity, friends} = route.params;
  const timeLeft = 3600 * hours.split(' ')[0] + 60 * minutes.split(' ')[0];
  const [initialEndTime, setInitialEndTime] = useState(0);

  const Api = new api();

  const getUsername = async () => {
    try {
      return await AsyncStorage.getItem('@username')
    } catch(e) {
      console.log("error in getting username from async: " + e);
    }
  };

  const convertToMinutes = (timeString) => {
    return 3600 * parseInt(timeString.split(':')[0]) + 60 * parseInt(timeString.split(':')[1]) + parseInt(timeString.split(':')[2]);
  }

  const getAbs = (val1, val2) => {
    return Math.abs(val1 - val2);
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      getUsername().then((user) => {
        console.log("restarting interval");
        Api.checkMatch(user).then((response) => {
          console.log("response: " + JSON.stringify(response));
          if (response.result == "success" && response.match !== null) {
            console.log("match found");
            navigation.replace('MatchedScreen', { endTime: convertToMinutes(response.endTime), activity: activity, friends: friends, user: user });
          } else {
            console.log("still searching. user is: " + user + ".");
            console.log("initial end time: " + initialEndTime);
          }
        })
      })
    }, 1000)
    return () => clearInterval(interval);
  })

  const handleCancelMatch = () => {
    console.log("hour: " + hours + " min: " + minutes + " activity: " + activity + " tag: " + friends);
    console.log("time left: " + timeLeft + " activity: " + activity + " tag: " + friends);
    console.log("hour: " + timeLeft/60 + " min: " + timeLeft%60 + " activity: " + activity + " tag: " + friends);
    getUsername().then((user => {
      console.log("user is: " + user);
      Api.deleteFromMatchQueue(user).then((response) => {
        if (response.result == "success") {
          console.log(user + " is deleted from match queue");
          navigation.replace('Home');
        } else {
          Toast.show({
            text1: `Sorry! Please try cancelling again`,
            type: 'error'
          });
        }
        console.log("response for cancelMatch: " + JSON.stringify(response));
      })
    }))
  };
  return (
    <View style={homeStyles.container}>
      <View style={homeStyles.list}>
        <Text style={homeStyles.row}>Looking for a friend in <Text style={homeStyles.rowVariable}>{friends}</Text></Text>
        <Text style={homeStyles.row}>to do <Text style={homeStyles.rowVariable}>{activity}</Text></Text>
        <View style={homeStyles.dotsContainer}>
        {/*
          <AnimatedEllipsis numberOfDots={3}
                  minOpacity={0.3}
                  animationDelay={400}
                  style={{
                    color: '#647C90',
                    fontSize: 72,
                    letterSpacing: -15,
                  }}
                  />
                */}
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
              until={timeLeft}
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
