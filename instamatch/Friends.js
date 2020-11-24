import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Button, WhiteSpace, WingBlank } from '@ant-design/react-native';

const Friends = ({ navigation }) => {
 return (
   <>
    <Text>You have:</Text>
    <WingBlank>
      <Button
        type="primary"
        onPress={() => navigation.navigate('FriendsList')}
      >
        FriendsList
      </Button>
      <WhiteSpace />
    </WingBlank>
   </>
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
