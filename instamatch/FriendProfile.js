import React from 'react';
import api from './api';
import {FontAwesome5, FontAwesome, SimpleLineIcons, MaterialIcons} from '@expo/vector-icons';
import {WingBlank, Modal, Provider, WhiteSpace, List, Flex, Button } from '@ant-design/react-native';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, Image} from 'react-native';
import notImplementedError from './helper';
import Toast from "react-native-toast-message";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCENT_COLOR} from "./Constants";

const screen = Dimensions.get("window");

const FriendProfile = ({ route, navigation }) => {
  const friendUsername = route.params.username;
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState(null);
  const [tags, setTags] = React.useState([]);
  const [optionVisible, setOptionsVisible] = React.useState(false);
  const [blockModalVisible, setBlockModalVisible] = React.useState(false);
  const [removeModalVisible, setRemoveModalVisible] = React.useState(false);
  let listener = null;

  const Api = new api();

  const getUsername = async () => {
    try {
      return await AsyncStorage.getItem('@username')
    } catch(e) {
      console.log(e);
    }
  };

  const handleRemoveModal = () => {
    setOptionsVisible(false);
    setRemoveModalVisible(true);
  };

  const handleBlockModal = () => {
    setOptionsVisible(false);
    setBlockModalVisible(true);
  };

  const handleDeleteFriend = () => {
    const body = JSON.stringify({
      "friend_name": friendUsername
    });
    Api.deleteFriend(username, body)
      .then(() => {
        Toast.show({
          text1: `You have unfriended ${friendUsername}`,
        });
        navigation.goBack();
      });
  };

  const getTagData = () => {
    getUsername().then((user) => {
      Api.getAllTags(user)
        .then((result) => {
          const newTags = [];
          result.tags.map((tag) => {
            Api.getTagFriends(user, tag)
              .then((response) => {
                if (response.friends.includes(friendUsername)) {
                  newTags.push(tag);
                  setTags([newTags]);
                }
              });
          })
        });
      setUsername(user);
    });
  };

  const getFriendData = () => {
    Api.getUserDetails(friendUsername)
      .then((result) => {
        if (result.result === 'success') {
          setFullName(result.name);
          setEmail(result.email);
          (result.profile_img) && setImageUrl(result.profile_img);
        }
      });
  };

  React.useEffect(() => {
    getFriendData();
    getTagData();
    listener = navigation.addListener('focus', () => {
      getFriendData();
      getTagData();
    });
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={style.addButtonContainer}
          onPress={() => setOptionsVisible(!optionVisible)}
        >
          <SimpleLineIcons
            name="options"
            size={24}
            color="#1C3AA1"
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, optionVisible]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={style.mainContainer}>
          <View style={style.profileContainer}>
            <WingBlank>
              <Image
                style={style.profileIcon}
                source={(imageUrl) ? {uri: imageUrl} : require('./assets/user.png')}
              />
              {/*<FontAwesome name="user-circle" size={90} color="black" />*/}
              <View style={[style.flexRow, style.profileLine]}>
                <Text style={style.fullName}>{fullName}</Text>
                <TouchableOpacity onPress={notImplementedError}>
                  <FontAwesome5 name="facebook-messenger" size={35} color="#0078FF" style={style.messageIcon} />
                </TouchableOpacity>
              </View>
              <Text style={style.email}>{email}</Text>
            </WingBlank>
          </View>
          {(tags.length > 0) && (
            <View style={style.tagsContainer}>
              <WingBlank>
                <View style={[style.flexRow]}>
                  <FontAwesome5 name="tags" size={20} color="black" style={style.tagIcon} />
                  <Text style={style.tagsText}>Tags</Text>
                </View>
              </WingBlank>
              <List>
                {tags.map((tag, idx) => (
                  <List.Item
                    key={idx}
                    onPress={() => navigation.navigate('TagDetails', {
                      tag: tag,
                    })}
                  >
                    <Text style={style.tagNameText}>{tag}</Text>
                  </List.Item>
                ))}
              </List>
            </View>
          )}
          <Provider>
            <Modal
              visible={optionVisible}
              animationType="slide-down"
              onClose={() => setOptionsVisible(false)}
              style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
            >
              <View style={{ paddingHorizontal: 10, borderRadius: 13, backgroundColor: '#FFFFFF', marginVertical: 7, marginHorizontal: 5 }}>
                <List>
                  <List.Item>
                    <TouchableOpacity style={style.optionsItem} onPress={handleRemoveModal}>
                      <MaterialIcons name="cancel" size={35} color="red" />
                      <Text style={style.optionsItemText}>Remove</Text>
                    </TouchableOpacity>
                  </List.Item>
                  <List.Item>
                    <TouchableOpacity style={style.optionsItem} onPress={handleBlockModal}>
                      <MaterialIcons name="block" size={32} color="red" />
                      <Text style={[style.optionsItemText, {paddingHorizontal: 20}]}>Block</Text>
                    </TouchableOpacity>
                  </List.Item>
                </List>
              </View>
              <TouchableOpacity style={style.optionsCancel} onPress={() => setOptionsVisible(false)} >
                <Text style={style.optionsCancelText}>Cancel</Text>
              </TouchableOpacity>
            </Modal>
            <Modal
              title={<Text style={{ fontWeight: '700', fontSize: 20 }}>{`Remove ${friendUsername}`}</Text>}
              transparent
              onClose={() => setRemoveModalVisible(false)}
              maskClosable
              visible={removeModalVisible}
              footer={[
                { text: 'Cancel', onPress: () => setRemoveModalVisible(false) },
                { text: 'Yes', onPress: () => {
                    setRemoveModalVisible(false);
                    handleDeleteFriend();
                  } },
              ]}
            >
              <View style={{ paddingVertical: 20 }}>
                <Text style={{ textAlign: 'center', fontSize: 15, }}>{`Are you sure you want to remove ${friendUsername} from your friends?`}</Text>
              </View>
            </Modal>
            <Modal
              title={<Text style={{ fontWeight: '700', fontSize: 20 }}>{`Block ${friendUsername}`}</Text>}
              transparent
              onClose={() => setBlockModalVisible(false)}
              maskClosable
              visible={blockModalVisible}
              footer={[
                { text: 'Cancel', onPress: () => setBlockModalVisible(false) },
                { text: 'Yes', onPress: () => {
                    setBlockModalVisible(false);
                    notImplementedError();
                  } },
              ]}
            >
              <View style={{ paddingVertical: 20 }}>
                <Text style={{ textAlign: 'center', fontSize: 15, }}>{`Are you sure you want to block ${friendUsername}? This will remove them from your friends and block them from adding you in the future.`}</Text>
              </View>
            </Modal>
          </Provider>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  profileContainer: {
    backgroundColor: '#FFFFFF',
    paddingTop: 30,
    paddingBottom: 20,
  },
  fullName: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  profileLine: {
    justifyContent: 'space-between',
  },
  email: {
    fontSize: 18,
    marginTop: 8,
    fontWeight: '400',
  },
  messageIcon: {
    paddingTop: 9,
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
    paddingTop: 9,
    marginRight: 5,
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
  profileIcon: {
    alignSelf: "flex-start",
    width: 120,
    height: 120,
    borderRadius: 200,
    backgroundColor: ACCENT_COLOR,
    marginLeft: 0,
    marginRight: 20,
  },
});

export default FriendProfile;