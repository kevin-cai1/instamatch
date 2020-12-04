import React from 'react';
import api from './api';
import {FontAwesome5, FontAwesome, SimpleLineIcons, MaterialIcons, Feather, AntDesign } from '@expo/vector-icons';
import {WingBlank, Modal, Provider, WhiteSpace, List, Flex, Button } from '@ant-design/react-native';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions, SafeAreaView, ScrollView} from 'react-native';
import Api from './api';
import notImplementedError from './helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screen = Dimensions.get("window");

const TagDetails = ({ route, navigation }) => {
  const tagName = route.params.tag;
  const [friends, setFriends] = React.useState([]);
  const [optionsVisible, setOptionsVisible] = React.useState(false);
  const api = new Api();
  let listener = null;

  const getUsername = async () => {
    try {
      return await AsyncStorage.getItem('@username')
    } catch(e) {
      console.log(e);
    }
  };

  const getFriends = () => {
    getUsername().then((username) => {
      api.getTagFriends(username, tagName)
        .then((result) => {
          if (result.result === 'success') {
            setFriends(result.friends);
          }
        });
    });
  };

  React.useEffect(() => {
    getFriends();
    listener = navigation.addListener('focus', () => {
      getFriends();
    });
  }, [navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={style.addButtonContainer}
          onPress={() => setOptionsVisible(!optionsVisible)}
          accessible={true}
          accessibilityLabel="Open Options Menu"
        >
          <SimpleLineIcons
            name="options"
            size={24}
            color="#1C3AA1"
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, optionsVisible]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={style.mainContainer}>
          <View style={style.titleContainer}>
            <WingBlank>
              <View style={[style.flexRow, style.profileLine]}>
                <Text style={style.title}>{tagName}</Text>
                <Feather
                  name="edit-2"
                  size={25}
                  color="#1C3AA1"
                  style={style.editIcon}
                  accessible={true}
                  accessibilityLabel="Edit Tag Name"
                  onPress={notImplementedError}
                />
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
                <AntDesign
                  name="plus"
                  size={30}
                  color="#1C3AA1"
                  accessible={true}
                  accessibilityLabel="Add Friend to Tag"
                  onPress={() => navigation.navigate('TagAddFriend', {
                  tag: tagName,
                })} />
              </View>
            </WingBlank>
            <List>
              {friends.map((friend, idx) => (
                <List.Item
                  key={idx}
                  onPress={() => navigation.navigate('FriendProfile', {
                    username: friend,
                  })}
                >
                  <Text style={style.tagNameText}>{friend}</Text>
                </List.Item>
              ))}
            </List>
          </View>
          <Provider>
            <Modal
              visible={optionsVisible}
              animationType="slide-down"
              onClose={() => setOptionsVisible(false)}
              style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
            >
              <View style={{ paddingHorizontal: 10, borderRadius: 13, backgroundColor: '#FFFFFF', marginVertical: 7, marginHorizontal: 5 }}>
                <List>
                  <List.Item>
                    <TouchableOpacity style={style.optionsItem} onPress={() => {
                      setOptionsVisible(false);
                      notImplementedError();
                    }}>
                      <MaterialIcons name="cancel" size={35} color="red" />
                      <Text style={style.optionsItemText}>Delete Tag</Text>
                    </TouchableOpacity>
                  </List.Item>
                </List>
              </View>
              <TouchableOpacity style={style.optionsCancel} onPress={() => setOptionsVisible(false)} >
                <Text style={style.optionsCancelText}>Cancel</Text>
              </TouchableOpacity>
            </Modal>
          </Provider>
        </View>
      </ScrollView>
    </SafeAreaView>
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