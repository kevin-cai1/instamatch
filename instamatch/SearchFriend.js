import React from 'react';
import {StyleSheet, Text, View, Keyboard} from 'react-native';
import { Button, WhiteSpace, WingBlank, List } from '@ant-design/react-native';
import { SearchBar } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import api from './api';

const SearchFriend = () => {

  const [searchInput, setSearchInput] = React.useState("");
  const Api = new api();
  const username = 'charmaine'; // change this
  const [usernames, setUsernames] = React.useState([]);

  React.useEffect(() => {
    Api.searchUser(searchInput)
      .then((result) => setUsernames(result.users));
  }, [searchInput]);

  const handleAdd = (friend) => {
    const body = JSON.stringify({
      "friend_name": friend,
    });

    Api.addFriend(username, body)
      .then((result) => {
        if (result.result) {
          Api.getFriendStatus(username, friend)
            .then((response) => {
              if (response.status === 'friends') {
                Toast.show({
                  text1: `You are now friends with ${friend}!`,
                });
              } else {
                Toast.show({
                  text1: `Friend request sent to ${friend}.`,
                });
              }
            });
        }
      });
  };

  return (
    <>
      <SearchBar
        placeholder="Search user..."
        onChangeText={(text) => setSearchInput(text)}
        onClear={() => setUsernames([])}
        value={searchInput}
        lightTheme={true}
        round={true}
        containerStyle={style.container}
        inputContainerStyle={style.inputStyle}
      />
      <List>
        {usernames.map((friend, idx) => (
          <List.Item key={idx} >
            <View style={style.listItem}>
              <Text style={style.itemText} >{friend}</Text>
              <AntDesign name="pluscircleo" size={24} color="black" onPress={() => handleAdd(friend)}/>
            </View>
          </List.Item>
        ))}
      </List>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fcfcfc',
    paddingHorizontal: 20,
    marginBottom: 10,
    paddingVertical: 15,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 50,
  },
  itemText: {
    fontSize: 18,
    paddingTop: 15,
  },
  inputStyle: {
    height: 35,
  },
});

export default SearchFriend;
