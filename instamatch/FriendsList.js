import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {Button, List, WingBlank} from '@ant-design/react-native';
import AddButtonMd from './Components/AddButtonMd';
import api from './api';

const window = Dimensions.get("window");

const FriendsList = ({ navigation }) => {
  const Api = new api();
  const username = 'charmaine'; // change this
  const [usernameList, setUsernameList] = React.useState([]);
  const [resultsFetched, setResultsFetched] = React.useState(false);

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
          setResultsFetched(true);
        }
      });
  }, []);

  return (
    <View style={style.container}>
      { (resultsFetched) && (usernameList.length === 0) && (
        <WingBlank>
          <Text style={{textAlign: 'center', fontSize: 25, fontWeight: '500', marginTop: window.height/5, marginBottom: 10,}}>Find Your Friends</Text>
          <Text style={{textAlign: 'center', fontSize: 18, marginBottom: 20, }}>Add friends so you can match with them when you're free!</Text>
          <Button style={{backgroundColor: '#1C3AA1', borderRadius: 25}} onPress={() => navigation.navigate('SearchFriend')}>
            <Text style={{color: '#FFFFFF', fontWeight: '500', fontSize: 20 }}>
              Search Friends
            </Text>
          </Button>
        </WingBlank>
      )}
      {usernameList.map((letterList, idx) => (
        <List key={idx} renderHeader={letterList.letter}>
          {letterList.friends.map((friend, idx) => (
            <List.Item
              key={idx}
              onPress={() => navigation.navigate('FriendProfile', {
                username: friend,
              })}
            >
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
