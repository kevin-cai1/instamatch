import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Button, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { useHistory } from 'react-router';

const FriendsList = () => {

  return (
    <View>
      <WingBlank>
        <Button icon="PlusCircleOutlined />">hi</Button><WhiteSpace />
      </WingBlank>
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

export default FriendsList;
