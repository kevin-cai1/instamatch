import React, {useState} from 'react';
import * as Font from 'expo-font';
import { StyleSheet, Image, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { List, Button, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import CountDown from 'react-native-countdown-component';
import api from './api';

const MatchedScreen = ( { navigation, route } ) => {
  const Api = new api();
  const username = route.params.user;
  const match = route.params.match;
  const [friendImg, setFriendImage] = useState(false);
  const [img, setImage] = useState(false);
  console.log("params: " + JSON.stringify(route));
  const getUsername = async () => {
    try {
      return await AsyncStorage.getItem('@username')
    } catch(e) {
      console.log(e);
    }
  };
  const convertToMinutes = (timeString) => {
    return 3600 * parseInt(timeString.split(':')[0]) + 60 * parseInt(timeString.split(':')[1]) + parseInt(timeString.split(':')[2]);
  }
  const getFriendImg = () => {
    Api.getUserDetails(match)
      .then((result) => {
        if (result.result === 'success') {
          (result.profile_img) && setFriendImage(result.profile_img);
        }
      });
  };
  const getImg = () => {
    Api.getUserDetails(username)
      .then((result) => {
        if (result.result === 'success') {
          (result.profile_img) && setImage(result.profile_img);
        }
      });
  };

  const handleMessageAlert = () => {
    Alert.alert(
      "Coming soon...",
      "Messaging feature not available yet.",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: true }
    );
  };

  React.useEffect(() => {
    getFriendImg();
    getImg();
  });

  const initialTimeLeft = route.params.timeLeft;
  const timeEllapsed = route.params.ellapsed;
  console.log("timeLeft: ", initialTimeLeft);
  console.log("timeEllapsed: ", timeEllapsed);
  return (
    <View style={homeStyles.container}>
      <ScrollView>
        <View style={homeStyles.list}>
          <Text style={homeStyles.row}>{route.params.activity}</Text>
          <View style={homeStyles.profileContainer}>
              <View style={homeStyles.profile1}>
                <Image
                  style={homeStyles.image}
                  source={(img) ? {uri: img} : require('./assets/user.png')}
                />
                <Text style={homeStyles.name1}>{username}</Text>
              </View>
              <View style={homeStyles.profile2}>
                <Image
                  style={homeStyles.image}
                  source={(friendImg) ? {uri: friendImg} : require('./assets/user.png')}
                />
                <Text style={homeStyles.name2}>{match}</Text>
              </View>
          </View>
          <View style={homeStyles.buttonContainer}>
            <View
              style={{ borderWidth:1,
                borderColor:'#D3E5FF',
                alignItems:'center',
                justifyContent:'center',
                width:260,
                height:110,
                backgroundColor:'#D3E5FF',
                borderRadius:10,
              }}
              >
              <Text style={homeStyles.timeLeft}>Time Left</Text>
              <CountDown
                until={ initialTimeLeft - timeEllapsed }
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
          <TouchableOpacity
            style={{ borderWidth:1,
              borderColor:'#1C3AA1',
              alignItems:'center',
              justifyContent:'flex-start',
              display: 'flex',
              flexDirection: 'row',
              width:340,
              height:60,
              backgroundColor:'#1C3AA1',
              borderRadius:32,
              marginTop:80,
              shadowOpacity: 0.5,
              shadowRadius: 3,
              shadowColor: '#474e59',
              shadowOffset: { height: 3, width: 0 }
            }}
            onPress={() => {
              handleMessageAlert();
            }}
          >
            <FontAwesome name="comments" color="white" style={{fontSize: 48, paddingLeft: 30, paddingRight: 20}} />
            <Text style={{color: 'white', fontWeight: "400", fontSize: 24, paddingLeft: 25}}>Message</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
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
    marginTop: 60,
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    color: 'black',
    fontSize: 24,
    fontWeight: "600"
  },
  rowVariable: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
    marginBottom: 60,
  },
  buttonContainer: {
    display: 'flex',
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  timeLeft: {
    color: 'black',
    fontSize: 16,
    paddingBottom: 5,
    fontWeight: "600"
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
  },
  profileContainer: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 40
  },
  profile1: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    paddingRight:24,
    width: 140,
    height: 140,
  },
  profile2: {
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    paddingLeft:24,
    width: 140,
    height: 140,
  },
  name1: {
    paddingTop: 10,
    color: 'black',
    fontSize: 16,
    fontWeight: "500"
  },
  name2: {
    paddingTop: 10,
    color: 'black',
    fontSize: 16,
    fontWeight: "500"
  },
  image: {
    width: 128,
    height: 128,
    borderRadius: 100,
    backgroundColor: '#1C3AA1'
  }
});

export default MatchedScreen;
