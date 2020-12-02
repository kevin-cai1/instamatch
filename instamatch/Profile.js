import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Button, Platform, TextInput, Dimensions } from 'react-native';
import { WingBlank, List, Modal, Provider } from '@ant-design/react-native';
import Toast from "react-native-toast-message";
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import api from './api';
import { ACCENT_COLOR } from './Constants';

const screen = Dimensions.get("window");

const Profile = () => {
  const [image, setImage] = React.useState(null);
  const [name, setName] = React.useState('');
  const [newName, setNewName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [newEmail, setNewEmail] = React.useState('');
  const [nameModalVisible, setNameModalVisible] = React.useState(false);
  const [emailModalVisible, setEmailModalVisible] = React.useState(false);
  const username = "Kevin07";
  const Api = new api();

  const changeName = () => {
    const body = JSON.stringify({
      "name": newName,
    });
    Api.changeUserDetails(username, body)
      .then(() => {
        Toast.show({
          text1: `Display name changed successfully`,
        });
        setName(newName);
        setNameModalVisible(false);
        setNewName('');
      });
  };

  const changeEmail = () => {
    const body = JSON.stringify({
      "email": newEmail,
    });
    Api.changeUserDetails(username, body)
      .then(() => {
        Toast.show({
          text1: `Email changed successfully`,
        });
        setEmail(newEmail);
        setEmailModalVisible(false);
        setNewEmail('');
      });
  };

  const changeProfilePic = (image) => {
    console.log('upload pic');
    const body = JSON.stringify({
      'profile_img': image,
    });
    Api.changeUserDetails(username, body)
      .then(() => {
        Toast.show({
          text1: 'Profile picture changed successfully'
        })
      })
  };

  React.useEffect(() => {
    Api.getUserDetails(username)
      .then((result) => {
        (result.email) && setEmail(result.email);
        (result.name) && setName(result.name);
        (result.profile_img) && setImage(result.profile_img);
      });
  }, []);

  const handleImage = () => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work');
        }
      }
    })();
    pickImage();
  };

  const compressImage = async (uri) => {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 200 } }],
      { compress: 0, format: ImageManipulator.SaveFormat.PNG, base64: true}
    );

    console.log(result);
    setImage(`data:image/png;base64,${result.base64}`);
    changeProfilePic(`data:image/png;base64,${result.base64}`);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result);
      compressImage(result.uri);
      console.log('test');
      
    }
  };

  return (
    <>
      <View style={style.container}>
        <View>
          <Image
            style={style.profileIcon}
            source={(image) ? {uri: image} : require('./assets/user.png')}
          />
          <TouchableOpacity
            onPress={() => handleImage()}
            style={style.editButton}
          >
            <MaterialIcons style={style.imageIcon} name="edit" size={40} />
          </TouchableOpacity>
        </View>
        <List style={style.profile}>
          <List.Item onPress={() => setNameModalVisible(true)}>
            <View style={style.profileLabel}>
              <Text style={style.nameLabel}>
                Name
              </Text>
              <Text style={style.nameSubLabel}>
                {name}
              </Text>
            </View>
            <MaterialIcons style={style.icon} name="edit" size={28} />
          </List.Item>
          <List.Item onPress={() => setEmailModalVisible(true)}>
            <View style={style.profileLabel}>
              <Text style={style.nameLabel}>
                Email
              </Text>
              <Text style={style.nameSubLabel}>
                {email}
              </Text>
            </View>
            <MaterialIcons style={style.icon} name="edit" size={28} />
          </List.Item>
        </List>
      </View>
      <Provider>
        <Modal
          title={<Text style={{ fontWeight: '700', fontSize: 20 }}>Change display name</Text>}
          transparent
          visible={nameModalVisible}
          footer={[
            { text: 'Cancel', onPress: () => setNameModalVisible(false) },
            { text: 'Change', onPress: () => changeName() },
          ]}
        >
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ textAlign: 'center', fontSize: 15, marginBottom: 10,}}>This is the name that other users will see when they match with you</Text>
            <TextInput
              style={{ height: 40, borderColor: '#cccccc', borderWidth: 1, borderRadius: 13, paddingHorizontal: 10, marginTop: 10,}}
              placeholder="Display Name..."
              onChangeText={(text) => setNewName(text)}
            />
          </View>
        </Modal>
      </Provider>
      <Provider>
        <Modal
          title={<Text style={{ fontWeight: '700', fontSize: 20 }}>Change email</Text>}
          transparent
          visible={emailModalVisible}
          footer={[
            { text: 'Cancel', onPress: () => setEmailModalVisible(false) },
            { text: 'Change', onPress: () => changeEmail() },
          ]}
        >
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ textAlign: 'center', fontSize: 15, marginBottom: 10,}}>This is the email address that will appear on your profile</Text>
            <TextInput
              style={{ height: 40, borderColor: '#cccccc', borderWidth: 1, borderRadius: 13, paddingHorizontal: 10, marginTop: 10,}}
              placeholder="Email..."
              onChangeText={(text) => setNewEmail(text)}
            />
          </View>
        </Modal>
      </Provider>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    height: screen.height,
  },
  profileIcon: {
    alignSelf: "center",
    width: 200,
    height: 200,
    borderRadius: 200,
    backgroundColor: ACCENT_COLOR,
    borderColor: '#fff',
    borderWidth: 4,
    margin: 20,
    marginLeft: 0,
    marginRight: 20,
  },
  profile: {
    backgroundColor: '#f2f2f2',
  },
  icon: {
    position: 'absolute',
    right: 0,
    color: "#3C3C4380"
  },
  editButton: {
    position: "absolute",
    bottom: 20,
    right: 110,
  },
  imageIcon: {
    borderRadius: 50,
    backgroundColor: '#CDCDCD',
    borderColor: '#fff',
    borderWidth: 1.5,
    padding: 5,
    color: "#000",
  },
  profileItem: {
    display: "flex",
    flexDirection: "row",
    textAlign: 'center',
    alignItems: 'center'
  },
  profileLabel: {
    textAlign: "center",
  },
  nameLabel: {
    fontSize: 18,
    fontWeight: "800",
  },
  nameSubLabel: {
    fontSize: 16,
  }
})

export default Profile;