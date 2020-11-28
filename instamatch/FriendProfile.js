import React from 'react';
import api from './api';
import {FontAwesome5, FontAwesome, SimpleLineIcons, MaterialIcons} from '@expo/vector-icons';
import {WingBlank, Modal, Provider, WhiteSpace, List, Flex } from '@ant-design/react-native';
import {StyleSheet, View, Text, TouchableOpacity, Dimensions} from 'react-native';

const screen = Dimensions.get("window");

const FriendProfile = ({ route, navigation }) => {
  const username = route.params.username;
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [optionVisible, setOptionsVisible] = React.useState(false);

  const Api = new api();

  React.useEffect(() => {
    Api.getUserDetails(username)
      .then((result) => {
        if (result.result === 'success') {
          setFullName(result.name);
          setEmail(result.email);
        }
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
    <View style={style.mainContainer}>
      <View style={style.profileContainer}>
        <WingBlank>
          <FontAwesome name="user-circle" size={90} color="black" />
          <View style={[style.flexRow, style.profileLine]}>
            <Text style={style.fullName}>{fullName}</Text>
            <FontAwesome5 name="facebook-messenger" size={35} color="#0078FF" style={style.messageIcon}/>
          </View>
          <Text style={style.email}>{email}</Text>
        </WingBlank>
      </View>
      <View style={style.tagsContainer}>
        <WingBlank>
          <View style={[style.flexRow]}>
            <FontAwesome5 name="tags" size={20} color="black" style={style.tagIcon} />
            <Text style={style.tagsText}>Tags</Text>
          </View>
        </WingBlank>
      </View>
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
                <TouchableOpacity style={style.optionsItem}>
                  <MaterialIcons name="cancel" size={35} color="red" />
                  <Text style={style.optionsItemText}>Remove</Text>
                </TouchableOpacity>
              </List.Item>
              <List.Item>
                <TouchableOpacity style={style.optionsItem}>
                  <MaterialIcons name="block" size={32} color="red" />
                  <Text style={[style.optionsItemText, {paddingHorizontal: 20}]}>Block</Text>
                </TouchableOpacity>
              </List.Item>
            </List>
          </View>
          <TouchableOpacity style={style.optionsCancel}>
            <Text style={style.optionsCancelText}>Cancel</Text>
          </TouchableOpacity>
        </Modal>
      </Provider>
    </View>
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
});

export default FriendProfile;