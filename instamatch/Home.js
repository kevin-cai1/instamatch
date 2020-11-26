import React from 'react';
import * as Font from 'expo-font';
import { Image, Text, View } from 'react-native';
import { List, Button, WhiteSpace } from '@ant-design/react-native';
import { AntDesign } from '@expo/vector-icons';

const Item = List.Item;
const Activities = [
  [
    {
      label: 'Gym',
      value: 'gym',
    },
    {
      label: 'Brunch',
      value: 'brunch',
    },
  ],
  [
    {
      label: 'Video Call',
      value: 'video call',
    },
    {
      label: 'Dinner',
      value: 'dinner',
    },
  ],
];

const Home = () => {
  return (
    <View>
      <View>
        <Text>Home</Text>
      </View>
      <List style={{ backgroundColor: 'white' }} className="picker-list" renderHeader={'Session Details'}>
        <Item arrow="empty" onPress={() => {}}>
          I'm free for...
        </Item>
        <Item extra="(Default) Any Activity" arrow="empty" onPress={() => {}}>
          To do...
        </Item>
        <Item extra="(Default) All Friends" arrow="empty" onPress={() => {}}>
          With...
        </Item>
      </List>
      <Button type="primary">Start Now!</Button>
    </View>);
};

export default Home;
