import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Button, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Constants from "expo-constants";

const Friends = ({ navigation }) => {

  const [totalFriends, setTotalFriends] = React.useState(0);
  const [totalTags, setTotalTags] = React.useState(0);
  const { manifest } = Constants;

  React.useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    };
    const uri = 'https://instamatch-api.herokuapp.com/';
    console.log(uri);
    fetch(`${uri}/friends/charmaine/all`, options)
      .then((result) => console.log(JSON.stringify(result.json())))
        .catch(function(e) {
          console.log(e);
          throw e;
        });
  }, []);

  return (
   <View style={friends.container}>
    <WingBlank>
      <Button
        style={[friends.button, friends.primaryButton]}
        onPress={() => navigation.navigate('FriendsList')}
      >
        <View style={friends.buttonContent}>
          <FontAwesome5 name="user-friends" size={50} color="rgba(255, 255, 255, 0.85)" />
          <Text style={[friends.buttonText, friends.friendText]}>{`${totalFriends} Friends`}</Text>
          <Ionicons name="ios-arrow-forward" size={50} color="rgba(255, 255, 255, 0.5)" />
        </View>
      </Button>
      <WhiteSpace style={friends.whitespace} />
      <Button
        style={[friends.button, friends.secondaryButton]}
      >
        <View style={friends.buttonContent}>
          <FontAwesome5 style={friends.tagIcon} name="tags" size={50} color="rgba(255, 255, 255, 0.85)" />
          <Text style={friends.buttonText}>{`${totalTags} Friend Tags`}</Text>
          <Ionicons style={friends.arrowIcon} name="ios-arrow-forward" size={50} color="rgba(255, 255, 255, 0.5)" />
        </View>
      </Button>
    </WingBlank>
   </View>
 );
};

const friends = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#F2F2F2',
  },
  buttonContent: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
  },
  button: {
    height: 120,
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 33,
    width: 160,
    textAlign: 'center',
    marginLeft: 13,
    marginRight: 13,
  },
  whitespace: {
    margin: 40,
  },
  tagIcon: {
    paddingTop: 12,
  },
  arrowIcon: {
    paddingTop: 10,
  },
  primaryButton: {
    backgroundColor: '#1C3AA1',
  },
  secondaryButton: {
    backgroundColor: '#0C1843',
  },
  friendText: {
    paddingTop: 5,
  },
});

export default Friends;
