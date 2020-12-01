import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import Friends from "../Friends";
import FriendsList from "../FriendsList";
import SearchFriend from "../SearchFriend";
import FriendProfile from '../FriendProfile';
import TagsList from '../TagsList';

const Stack = createStackNavigator();

const FriendsNav = () => {
  const [optionsState, setOptionsState] = React.useState(false);

  return (
    <NavigationContainer independent={true}>
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
          })}
        />
        <Stack.Screen
          name="SearchFriend"
          component={SearchFriend}
          options={{ title: 'Friends - Add' }}
        />
        <Stack.Screen
          name="FriendProfile"
          component={FriendProfile}
          options={({route}) => ({
            title: route.params.username,
          })}
        />
        <Stack.Screen
          name="TagsList"
          component={TagsList}
          options={{
            title: 'Manage Tags'
          }}
        />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

const style = StyleSheet.create({
  addButtonContainer: {
    paddingRight: 10,
  },
});

export default FriendsNav;

