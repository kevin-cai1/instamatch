import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { List, Modal, Provider } from '@ant-design/react-native';
import { Ionicons } from '@expo/vector-icons';

import api from './api';

const screen = Dimensions.get("window");

const AccountSettings = ({ navigation }) => {
  const Api = new api();
  const username = "kevin";
  const [modalOpen, setModalOpen] = React.useState(false);

  const deleteAccount = () => {
    Api.deleteAccount(username)
      .then(() => {
        console.log('logout');
      });
  };

  const handleDeleteConfirm = () => {
    setModalOpen(true);
  };

  return (
    <View style={style.container}>
      <List>
        <List.Item onPress={() => navigation.navigate('ChangeDisplayName')}>
          <View style={style.nestedLabel}>
            <Text style={style.label}>
              Change display name
            </Text>
            <Ionicons style={style.arrowIcon} name="ios-arrow-forward" size={28} />
          </View>
        </List.Item>
        <List.Item onPress={() => navigation.navigate('ChangePassword')}>
          <View style={style.nestedLabel}>
            <Text style={style.label}>
              Change password
            </Text>
            <Ionicons style={style.arrowIcon} name="ios-arrow-forward" size={28} />
          </View>
        </List.Item>
      </List>
      <List style={style.delete}>
        <List.Item onPress={() => handleDeleteConfirm()}>
          <Text style={style.deleteLabel}>
            Delete Account
          </Text>
        </List.Item>
      </List>
      <Provider>
        <Modal
          title={<Text style={{ fontWeight: '700', fontSize: 20 }}>Confirm Delete</Text>}
          transparent
          onClose={() => setModalOpen(false)}
          maskClosable
          visible={modalOpen}
          footer={[
            { text: 'Cancel', onPress: () => setModalOpen(false) },
            { text: 'Yes', onPress: () => deleteAccount() },
          ]}
        >
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ textAlign: 'center', fontSize: 15, }}>Are you sure you want to delete your account?</Text>
          </View>
        </Modal>
      </Provider>
      
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: screen.height,
  },
  delete: {
    paddingTop: 50,
    color: '#ff0000',
  },
  deleteLabel: {
    color: '#ff0000',
    fontSize: 18,
  },
  nestedLabel:{
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    fontSize: 18,
  },
  arrowIcon: {
    position: 'absolute',
    right: 0,
    color: "#3C3C4380"
  }
});

export default AccountSettings;
