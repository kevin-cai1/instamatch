import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, List} from '@ant-design/react-native';
import AddButtonMd from './Components/AddButtonMd';
import api from './api';

const TagsList = ({navigation}) => {
  const Api = new api();
  const [tagList, setTagList] = React.useState(['uni mates', 'gym buddies', 'close friends']);

  return (
    <View style={style.container}>
      <List>
        {tagList.map((tag, idx) => (
          <List.Item
            key={idx}
          >
            {tag}
          </List.Item>
        ))}
      </List>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingTop: 20,
  }
})

export default TagsList;
