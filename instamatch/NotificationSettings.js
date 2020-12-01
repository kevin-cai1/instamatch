import React from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import { WingBlank, List } from '@ant-design/react-native';
import api from './api';
import { ACCENT_COLOR } from './Constants';

const NotificationSettings = ({ navigation }) => {
  const Api = new api();
  const [notification, setNotification] = React.useState(false);
  const [match, setMatch] = React.useState(false);
  const [activity, setActivity] = React.useState(false);

  return (
    <View style={style.container}>
      <List>
        <List.Item
          extra={
            <Switch
              trackColor={{ false: '#787770', true: ACCENT_COLOR }}
              thumbColor="#fefeff"
              onValueChange={(value) => setNotification(value)}
              value={notification}
            />
          }
          onClick={() => {}}>
          Notifications
        </List.Item>
      </List>
      <List style={style.notificationSubheadings}>
        <List.Item
          extra={
            <Switch
              trackColor={{ false: '#787770', true: ACCENT_COLOR }}
              thumbColor="#fefeff"
              onValueChange={(value) => setMatch(value)}
              value={match}
              disabled={!notification}
            />
          }
          onClick={() => {}}>
          Match Alerts
        </List.Item>
        <List.Item
          extra={
            <Switch
              trackColor={{ false: '#787770', true: ACCENT_COLOR }}
              thumbColor="#fefeff"
              onValueChange={(value) => setActivity(value)}
              value={activity}
              disabled={!notification}
            />
          }
          onClick={() => {}}>
          Activity Recommendations
        </List.Item>
      </List>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  notificationSubheadings: {
    marginTop: 20,
  }
});

export default NotificationSettings;
