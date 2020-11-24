import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Button, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { Entypo } from '@expo/vector-icons';

const FriendsList = () => {

  return (
    <View style={style.container}>
      <TouchableOpacity style={style.mdIconButton}>
        <Entypo name="circle-with-plus" size={55} color="#2C363F" backgroundColor="#E5BD47" />
        <Text>Add New Friend</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  mdIconButton: {
    alignItems: "center",
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    paddingTop: 10,
  }
});

export default FriendsList;
