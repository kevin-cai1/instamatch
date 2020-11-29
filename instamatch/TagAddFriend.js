import React from 'react';
import {StyleSheet, Text, View, Keyboard, TouchableOpacity} from 'react-native';
import { Button, WhiteSpace, WingBlank, List } from '@ant-design/react-native';
import { SearchBar } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import api from './api';

const TagAddFriend = ({ route, navigation }) => {

  const [searchInput, setSearchInput] = React.useState("");
  const Api = new api();
  const tagName = route.params.tag;
  const username = 'charmaine'; // change this
  const [friends, setFriends] = React.useState([]);

  React.useEffect(() => {
    Api.getAllFriends(username)
      .then((result) => {
        if (result.friends) {
          const allFriends = result.friends;
          setFriends(allFriends);
        }
      });
  }, []);

  // const handleAdd = (friend) => {
  //   const body = JSON.stringify({
  //     "friend_name": friend,
  //   });
  //
  //   Api.addFriend(username, body)
  //     .then((result) => {
  //       if (result.result) {
  //         Api.getFriendStatus(username, friend)
  //           .then((response) => {
  //             if (response.status === 'friends') {
  //               Toast.show({
  //                 text1: `You are now friends with ${friend}!`,
  //               });
  //             } else {
  //               Toast.show({
  //                 text1: `Friend request sent to ${friend}.`,
  //               });
  //             }
  //           });
  //       }
  //     });
  // };

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
        {friends.map((friend, idx) => (
          <List.Item key={idx} >
            <View style={style.listItem}>
              <Text style={style.itemText} >{friend}</Text>
              <TouchableOpacity style={style.addIcon} >
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
