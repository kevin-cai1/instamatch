import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, TextInput} from 'react-native';
import {Button, List, Modal, Provider} from '@ant-design/react-native';
import AddButtonMd from './Components/AddButtonMd';
import api from './api';
import {AntDesign} from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const TagsList = ({ navigation }) => {
  const Api = new api();
  const username = 'charmaine'; // change this
  const [tagList, setTagList] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [newTag, setNewTag] = React.useState("");
  const [tagAdded, setTagAdded] = React.useState("");

  const handleAddTag = () => {
    setModalVisible(false);
    const body = JSON.stringify({
      "tag_name": newTag,
    });
    Api.addTag(username, body)
      .then(() => {
        Toast.show({
          text1: `Added ${newTag} tag`,
        });
        setTagAdded(newTag);
        setNewTag("");
      })
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={style.addButtonContainer}
          onPress={ () => setModalVisible(true) }
        >
          <AntDesign name="plus" size={24} color="#1C3AA1" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, modalVisible]);

  React.useEffect(() => {
    Api.getAllTags(username)
      .then((result) => {
        if (result.tags) {
          const allTags = result.tags.sort(function (a, b) {
            return a.toLowerCase().localeCompare(b.toLowerCase()
            )});
          const letterList = [];
          allTags.map((tag) => {
            const letterObj = letterList.find((obj) => obj.letter === tag[0].toLowerCase());
            if (!letterObj) {
              const newLetterObj = {'letter': tag[0].toLowerCase(), 'tags': [tag]};
              letterList.push(newLetterObj);
            } else {
              letterObj.tags.push(tag);
            }
          });
          setTagList(letterList);
        }
      });
  }, [tagAdded]);

  return (
    <>
      <View style={style.container}>
        { (tagList.length === 0) && (
          <AddButtonMd
            text="Add New Tag"
            onPressAction={() => navigation.navigate('SearchFriend')}
          />
        )}
        {tagList.map((letterList, idx) => (
          <List key={idx} renderHeader={letterList.letter}>
            {letterList.tags.map((tag, idx) => (
              <List.Item
                key={idx}
                onPress={() => navigation.navigate('FriendProfile', {
                  username: tag,
                })}
              >
                {tag}
              </List.Item>
            ))}
          </List>
        ))}
      </View>
      <Provider>
        <Modal
          title={<Text style={{ fontWeight: '700', fontSize: 20 }}>Add New Tag</Text>}
          transparent
          visible={modalVisible}
          footer={[
            { text: 'Cancel', onPress: () => setModalVisible(false) },
            { text: 'Add', onPress: handleAddTag },
          ]}
        >
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ textAlign: 'center', fontSize: 15, marginBottom: 10,}}>Add a new tag to label your friends</Text>
            <TextInput
              style={{ height: 40, borderColor: '#cccccc', borderWidth: 1, borderRadius: 13, paddingHorizontal: 10, marginTop: 10,}}
              placeholder="New Tag..."
              onChangeText={text => setNewTag(text)}
            />
          </View>
        </Modal>
      </Provider>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: 20,
  },
  addButtonContainer: {
    paddingRight: 10,
  },
});

export default TagsList;
