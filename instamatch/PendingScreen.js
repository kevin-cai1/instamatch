import React, {useState} from 'react';
import * as Font from 'expo-font';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import CountDown from 'react-native-countdown-component';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";
import { stringify } from 'uuid';
import { abs } from 'react-native-reanimated';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const PendingScreen = ( { navigation, route } ) => {
  console.disableYellowBox = true;
  const {hours, minutes, activity, friends} = route.params;
  const timeLeft = 3600 * hours.split(' ')[0] + 60 * minutes.split(' ')[0];
  const [initialEndTime, setInitialEndTime] = useState(0);
  const [ellapsed, setEllapsed] = useState(0);
  const [optionVisible, setOptionsVisible] = React.useState(false);

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
      setEllapsed(ellapsed => ellapsed + 1)
      getUsername().then((user) => {
        console.log("restarting interval");
        Api.checkMatch(user).then((response) => {
          console.log("response: " + JSON.stringify(response));
          if (response.result == "success" && response.match !== null) {
            const match = response.match;
            console.log("match found");
            navigation.replace('MatchedScreen', { timeLeft: timeLeft, ellapsed: ellapsed, activity: activity, match: match, user: user });
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
          navigation.goBack('Home');
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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerLeft: () => (
        <TouchableOpacity
          style={homeStyles.cancelSession}
          onPress={() => {handleCancelMatch()}}
          accessible={true}
          accessibilityLabel="cancel"
        >
          <Text style={ homeStyles.cancelSessionText }>Cancel</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, optionVisible]);

  return (
    <ScrollView style={homeStyles.container}>
      <View style={homeStyles.list}>
        <Text style={homeStyles.row}>Looking for <Text style={homeStyles.rowVariable}>{friends}</Text></Text>
        <Text style={homeStyles.row}>to do <Text style={homeStyles.rowVariable}>{activity}</Text></Text>
        <View style={homeStyles.dotsContainer}>
        {
          <AnimatedEllipsis numberOfDots={3}
                  minOpacity={0.3}
                  animationDelay={400}
                  style={{
                    color: 'black',
                    fontSize: 72,
                    letterSpacing: -15,
                  }}
                  />
                }
        </View>
        <View style={homeStyles.buttonContainer}>
          <View
            style={{ borderWidth:1,
              borderColor:'#D3E5FF',
              alignItems:'center',
              justifyContent:'center',
              width:260,
              height:120,
              backgroundColor:'#D3E5FF',
              borderRadius:10,
            }}
            >

            <CountDown
              until={timeLeft}
              size={20}
              onFinish={() => {
                handleCancelMatch();
              }}
              digitStyle={{backgroundColor: '#D3E5FF'}}
              digitTxtStyle={{color: 'black', fontWeight: "400", fontSize: 32}}
              timeToShow={['H', 'M', 'S']}
              timeLabels={{m: null, s: null}}
              separatorStyle={{color: 'black', fontWeight: "400", fontSize: 32}}
              showSeparator
            />

          </View>
        </View>
      </View>
    </ScrollView>
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
    marginTop: 140,
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    color: 'black',
    fontSize: 21,
  },
  rowVariable: {
    fontSize: 21,
    fontWeight: '600',
    color: 'black',
  },
  dotsContainer: {
    display: 'flex',
    paddingTop: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    display: 'flex',
    paddingTop: 50,
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
  cancelSession: {
    paddingLeft: 10,
    alignItems:'center',
    justifyContent:'center',
    display: 'flex',
    flexDirection: 'row'
  },
  cancelSessionText: {
    paddingLeft: 5,
    color: '#1C3AA1',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default PendingScreen;
