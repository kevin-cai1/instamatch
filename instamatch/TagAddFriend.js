import React from 'react';
import {StyleSheet, Text, View, Keyboard, TouchableOpacity} from 'react-native';
import { Button, WhiteSpace, WingBlank, List } from '@ant-design/react-native';
import { SearchBar } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from './api';

const TagAddFriend = ({ route, navigation }) => {

  const [searchInput, setSearchInput] = React.useState("");
  const Api = new api();
  const tagName = route.params.tag;
  const [username, setUsername] = React.useState("");
  const [friends, setFriends] = React.useState([]);
  const [filteredList, setFilteredList] = React.useState([]);

  const getUsername = async () => {
    try {
      return await AsyncStorage.getItem('@username')
    } catch(e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    getUsername().then((result) => setUsername(result));
  }, []);

  React.useEffect(() => {
    getUsername().then((user) => {
      Api.getAllFriends(user)
        .then((result) => {
          if (result.friends) {
            const allFriends = result.friends;
            setFriends(allFriends);
            setFilteredList(allFriends);
          }
        });
    });
  }, []);

  React.useEffect(() => {
    const friendsFiltered = [];
    friends.map((friend) => {
      if (friend.toLowerCase().includes(searchInput.toLowerCase())) {
        friendsFiltered.push(friend);
      }
    });
    setFilteredList(friendsFiltered);
  }, [searchInput]);

  const handleAdd = (friend) => {
    const body = JSON.stringify({
      "tag_name": tagName,
      "friend": friend,
    });

    Api.addFriendToTag(username, body)
      .then(() => {
        Toast.show({
          text1: `Added ${friend} to ${tagName}`,
        });
      });
  };

  return (
    <>
      <SearchBar
        placeholder="Search friend..."
        onChangeText={(text) => setSearchInput(text)}
        onClear={() => setSearchInput("")}
        value={searchInput}
        lightTheme={true}
        round={true}
        containerStyle={style.container}
        inputContainerStyle={style.inputStyle}
      />
      <List>
        {filteredList.map((friend, idx) => (
          <List.Item key={idx} >
            <View style={style.listItem}>
              <Text style={style.itemText} >{friend}</Text>
              <TouchableOpacity style={style.addIcon} onPress={() => handleAdd(friend)}>
                <AntDesign name="pluscircleo" size={24} color="black" />
              </TouchableOpacity>
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
  addIcon: {
    paddingTop: 13,
    paddingRight: 8,
  },
});

export default TagAddFriend;
