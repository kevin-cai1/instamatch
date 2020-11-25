import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, List} from '@ant-design/react-native';
import AddButtonMd from './Components/AddButtonMd';

const FriendsList = ({ navigation }) => {

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
      <AddButtonMd
        text="Add New Friend"
        onPressAction={() => navigation.navigate('SearchFriend')}
      />
        {usernameList.map((letterList, idx) => (
          <List key={idx} renderHeader={letterList.letter}>
            {letterList.friends.map((friend, idx) => (
              <List.Item key={idx}>
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
