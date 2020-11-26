import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, List} from '@ant-design/react-native';
import AddButtonMd from './Components/AddButtonMd';
import api from './api';

const FriendsList = ({ navigation }) => {
  const Api = new api();
  const username = 'charmaine';
  const [usernameList, setUsernameList] = React.useState([]);

  React.useEffect(() => {
    Api.getAllFriends(username)
      .then((result) => {
        if (result.friends) {
          const allFriends = result.friends.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase()
          )});
          const letterList = [];
          allFriends.map((user) => {
            const letterObj = letterList.find((obj) => obj.letter === user[0].toLowerCase());
            if (!letterObj) {
              const newLetterObj = {'letter': user[0].toLowerCase(), 'friends': [user]};
              letterList.push(newLetterObj);
            } else {
              letterObj.friends.push(user);
            }
          });
          setUsernameList(letterList);
        }
      });
  }, []);

  const addFriend = () => {
    console.log('add friend');
  };

  return (
    <View style={style.container}>
      { (usernameList.length === 0) && (
        <AddButtonMd
          text="Add New Friend"
          onPressAction={() => navigation.navigate('SearchFriend')}
        />
      )}
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
    justifyContent: 'center',
    paddingTop: 20,
  },
});

export default FriendsList;
