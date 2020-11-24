import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { List } from '@ant-design/react-native';
import AddButtonMd from './Components/AddButtonMd';

const FriendsList = () => {

  const usernameList = [
    {
      'letter': 'a',
      'friends': ['Alex123', 'andy00'],
    },
    {
      'letter': 'k',
      'friends': ['Kevin07', 'KitKath'],
    }
  ];

  const addFriend = () => {
    console.log('add friend');
  };

  return (
    <View style={style.container}>
      <AddButtonMd text="Add New Friend" onPressAction={addFriend} />
        {usernameList.map((letterList) => (
          <List renderHeader={letterList.letter}>
            {letterList.friends.map((friend) => (
              <List.Item>
                {friend}
              </List.Item>
            ))}
          </List>
        ))}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
});

export default FriendsList;
