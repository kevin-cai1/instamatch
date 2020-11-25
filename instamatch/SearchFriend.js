import React from 'react';
import {StyleSheet, Text, View, Keyboard} from 'react-native';
import { Button, WhiteSpace, WingBlank, List } from '@ant-design/react-native';
import { SearchBar } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';

const SearchFriend = () => {

  const [searchInput, setSearchInput] = React.useState("");

  const usernames = ['tim00', 'Timothee'];

  React.useEffect(() => {
    console.log(searchInput);
  }, [searchInput]);

  return (
    <>
      <WingBlank>
        <SearchBar
          placeholder="Username"
          onChangeText={(text) => setSearchInput(text)}
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
              <AntDesign name="pluscircleo" size={24} color="black" />
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
