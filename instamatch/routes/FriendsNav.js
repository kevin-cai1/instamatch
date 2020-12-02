import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Friends from "../Friends";
import FriendsList from "../FriendsList";
import SearchFriend from "../SearchFriend";
import FriendProfile from '../FriendProfile';
import TagsList from '../TagsList';
import TagDetails from '../TagDetails';
import TagAddFriend from '../TagAddFriend';

const Stack = createStackNavigator();

const FriendsNav = () => {
  const [optionsState, setOptionsState] = React.useState(false);

  return (
      <Stack.Navigator>
        <Stack.Screen name="Friends" component={Friends} />
        <Stack.Screen
          name="FriendsList"
          component={FriendsList}
          options={({navigation}) => ({
            title: 'Friends List',
            headerRight: () => (
              <TouchableOpacity
                style={style.addButtonContainer}
                onPress={() => navigation.navigate('SearchFriend')}
              >
                <AntDesign name="plus" size={24} color="#1C3AA1" />
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingHorizontal: 10,}}
                onPress={() => { navigation.goBack() }}
              >
                <AntDesign name="left" size={24} color="#1C3AA1" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="SearchFriend"
          component={SearchFriend}
          options={({navigation}) => ({
            title: 'Friends - Add',
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingHorizontal: 10,}}
                onPress={() => { navigation.goBack() }}
              >
                <AntDesign name="left" size={24} color="#1C3AA1" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="FriendProfile"
          component={FriendProfile}
          options={({route, navigation}) => ({
            title: route.params.username,
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingHorizontal: 10,}}
                onPress={() => { navigation.goBack() }}
              >
                <AntDesign name="left" size={24} color="#1C3AA1" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="TagsList"
          component={TagsList}
          options={({route, navigation}) => ({
            title: 'Manage Tags',
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingHorizontal: 10,}}
                onPress={() => { navigation.goBack() }}
              >
                <AntDesign name="left" size={24} color="#1C3AA1" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="TagDetails"
          component={TagDetails}
          options={({navigation}) => ({
            title: '',
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingHorizontal: 10,}}
                onPress={() => { navigation.goBack() }}
              >
                <AntDesign name="left" size={24} color="#1C3AA1" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="TagAddFriend"
          component={TagAddFriend}
          options={({navigation}) => ({
            title: 'Add Friend to Tag',
            headerLeft: () => (
              <TouchableOpacity
                style={{ paddingHorizontal: 10,}}
                onPress={() => { navigation.goBack() }}
              >
                <AntDesign name="left" size={24} color="#1C3AA1" />
              </TouchableOpacity>
            ),
          })}
        />
    </Stack.Navigator>
  );
};

const style = StyleSheet.create({
  addButtonContainer: {
    paddingRight: 10,
  },
});

export default FriendsNav;