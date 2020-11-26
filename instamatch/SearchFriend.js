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
    Api.addFriend(username, friend)
      .then((result) => {
        if (result.result) {
          Toast.show({
            text1: `Successfully added ${friend}`,
          });
        }
      });
  };

  return (
    <>
      <WingBlank>
        <SearchBar
          placeholder="Search user..."
          onChangeText={(text) => setSearchInput(text)}
          onClear={() => setUsernames([])}
          value={searchInput}
          lightTheme={true}
          round={true}
          containerStyle={style.container}
        />
      </WingBlank>
      <List>
        {usernames.map((friend, idx) => (
          <List.Item key={idx}>
            <View style={style.listItem}>
              <Text>{friend}</Text>
              <AntDesign name="pluscircleo" size={24} color="black" onPress={(friend) => handleAdd(friend)}/>
            </View>
          </List.Item>
        ))}
      </List>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: '#EAEAEB',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  }
});

export default SearchFriend;
