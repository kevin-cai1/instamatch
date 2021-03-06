import React from 'react';
import {StyleSheet, Text, View, Keyboard, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import { Button, WhiteSpace, WingBlank, List } from '@ant-design/react-native';
import { SearchBar } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from './api';

const SearchFriend = () => {

  const [searchInput, setSearchInput] = React.useState("");
  const Api = new api();
  const [username, setUsername] = React.useState("");
  const [usernames, setUsernames] = React.useState([]);

  const getUsername = async () => {
    try {
      return await AsyncStorage.getItem('@username')
    } catch(e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    Api.searchUser(searchInput)
      .then((result) => setUsernames(result.users));
  }, [searchInput]);

  React.useEffect(() => {
    getUsername().then((result) => setUsername(result));
  }, []);

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
    <SafeAreaView>
      <ScrollView>
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
                <TouchableOpacity
                  style={style.addIcon}
                  accessible={true}
                  accessibilityLabel={`add ${friend} as a friend`}
                  onPress={() => handleAdd(friend)}
                >
                  <AntDesign name="pluscircleo" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </List.Item>
          ))}
        </List>
      </ScrollView>
    </SafeAreaView>
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
  addIcon: {
    paddingTop: 13,
    paddingRight: 8,
  },
});

export default SearchFriend;
