import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Button, WhiteSpace, WingBlank } from '@ant-design/react-native';

const Friends = ({ navigation }) => {
 return (
   <View>
    <View style={friends.header}>
     <Text style={friends.title}>Friends</Text>
    </View>
    <Text>You have:</Text>
    <Button
      type="primary"
      onPress={() => navigation.navigate('FriendsList')}
    >
      FriendsList
    </Button>
    <WhiteSpace />
   </View>
 );
};

const friends = StyleSheet.create({
 header: {
  borderBottomColor: 'black',
  borderBottomWidth: 1,
  height: 50,
 },
 title: {
  textAlign: 'center',
  fontSize: 30,
  paddingTop: 10,
 }
});

export default Friends;
