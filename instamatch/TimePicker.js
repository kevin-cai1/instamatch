import React, { useState } from "react";
import { Button, View, SafeAreaView, TouchableOpacity, StyleSheet, Text } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TimePicker = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
  };

  return (
    <View>
      <SafeAreaView style={pickerStyles.container}>
        <Text style={pickerStyles.rowTitle}>
          I'm free for...
        </Text>
        <TouchableOpacity style={pickerStyles.row} onPress={showDatePicker}>
          <Text style={pickerStyles.rowValue}>
            1 Hour
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        locale="en_GB"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        headerTextIOS="I'm free for..."
      />
    </View>
  );
};

const pickerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20
  },
  row: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#647C90',
    marginRight: 32,
    height: 40,
    width: 160,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 40
  },
  rowTitle: {
    color: '#647C90',
    fontSize: 20,
  },
  rowValue: {
    color: '#647C90',
    fontSize: 16,
    fontWeight: '600',
    paddingLeft: 10,
  },
});

export default TimePicker;
