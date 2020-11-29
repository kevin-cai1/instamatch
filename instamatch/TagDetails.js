import React from 'react';
import api from './api';
import {FontAwesome5, FontAwesome, SimpleLineIcons, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import {WingBlank, Modal, Provider, WhiteSpace, List, Flex, Button } from '@ant-design/react-native';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions} from 'react-native';
import Api from './api';

const screen = Dimensions.get("window");

const TagDetails = ({ route, navigation }) => {
  const username = 'charmaine'; // please change
  const tagName = route.params.tag;
  const [friends, setFriends] = React.useState([]);
  const api = new Api();

  React.useEffect(() => {
    api.getTagFriends(username, tagName)
      .then((result) => {
        if (result.result === 'success') {
          setFriends(result.friends);
        }
      });
  }, []);

  return (
    <View style={style.mainContainer}>
      <View style={style.titleContainer}>
        <WingBlank>
          <View style={[style.flexRow, style.profileLine]}>
            <Text style={style.title}>{tagName}</Text>
            <Feather name="edit-2" size={25} color="#1C3AA1" style={style.editIcon} />
          </View>
        </WingBlank>
      </View>
      <View style={style.tagsContainer}>
        <WingBlank>
          <View style={[style.flexRow, style.spaceApart]}>
            <View style={[style.flexRow]}>
              <FontAwesome5 name="user-friends" size={24} color="black" style={style.tagIcon} />
              <Text style={style.tagsText}>Friends</Text>
            </View>
            <AntDesign name="plus" size={30} color="#1C3AA1" onPress={() => navigation.navigate('TagAddFriend', {
              tag: tagName,
            })} />
          </View>
        </WingBlank>
        <List>
          {friends.map((friend, idx) => (
            <List.Item key={idx}>
              <Text style={style.tagNameText}>{friend}</Text>
            </List.Item>
          ))}
        </List>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  titleContainer: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    marginTop: 10,
    fontSize: 40,
    fontWeight: 'bold',
    width: screen.width / 2,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  spaceApart : {
    justifyContent: 'space-between',
  },
  profileLine: {
    justifyContent: 'space-between',
  },
  email: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: '400',
  },
  editIcon: {
    paddingTop: 25,
  },
  tagsContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },
  tagsText: {
    fontSize: 25,
    fontWeight: '400',
    marginBottom: 10,
  },
  tagIcon: {
    paddingTop: 3,
    marginRight: 9,
  },
  addButtonContainer: {
    paddingRight: 10,
  },
  mainContainer: {
    height: screen.height,
  },
  optionsItem: {
    height: 57,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  optionsItemText: {
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 5,
    paddingHorizontal: 10,
  },
  optionsCancel: {
    height: 57,
    paddingTop: 14,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 5,
  },
  optionsCancelText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#007ff9',
    fontWeight: '500',
  },
  tagNameText: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default TagDetails;