import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, TextInput, Dimensions} from 'react-native';
import {Button, List, Modal, Provider, WingBlank} from '@ant-design/react-native';
import AddButtonMd from './Components/AddButtonMd';
import api from './api';
import {AntDesign} from "@expo/vector-icons";
import Toast from "react-native-toast-message";

const window = Dimensions.get("window");

const TagsList = ({ navigation }) => {
  const Api = new api();
  const username = 'charmaine'; // change this
  const [tagList, setTagList] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [newTag, setNewTag] = React.useState("");
  const [tagAdded, setTagAdded] = React.useState("");
  const [resultsFetched, setResultsFetched] = React.useState(false);

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
          setResultsFetched(true);
        }
      });
  }, [tagAdded]);

  return (
    <>
      <View style={style.container}>
        { (resultsFetched) && (tagList.length === 0) && (
          <WingBlank>
            <Text style={{textAlign: 'center', fontSize: 25, fontWeight: '500', marginTop: window.height/6, marginBottom: 10,}}>Add Some Tags</Text>
            <Text style={{textAlign: 'center', fontSize: 15, marginBottom: 20, }}>Tags help you categorise friends into different categories, e.g. close friends, gym buddies. </Text>
            <Text style={{textAlign: 'center', fontSize: 15, marginBottom: 20, }}>You can choose to only be visible to them when creating an activity session.</Text>
            <Button style={{backgroundColor: '#1C3AA1', borderRadius: 25 }} onPress={() => setModalVisible(true)}>
              <Text style={{color: '#FFFFFF', fontWeight: '500', fontSize: 20 }}>
                Add Tag
              </Text>
            </Button>
          </WingBlank>
        )}
        {tagList.map((letterList, idx) => (
          <List key={idx} renderHeader={letterList.letter}>
            {letterList.tags.map((tag, idx) => (
              <List.Item
                key={idx}
                onPress={() => navigation.navigate('TagDetails', {
                  tag: tag,
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
