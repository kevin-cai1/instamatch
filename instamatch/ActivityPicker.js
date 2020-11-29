import React, { useRef, useState } from "react";
import { View, Button, SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";
import ReactNativePickerModule from "react-native-picker-module";

const ActivityPicker = () => {
  const pickerRef = useRef()
  const [value, setValue] = useState()
  const activities = ['Any Activity', 'Gym', 'Walk', 'Swim', 'Other Sport', 'Brunch', 'Dinner', 'Drinks', 'Video Call', 'Phone Call'];
  return (
    <View>
      <SafeAreaView style={pickerStyles.container}>
        <Text style={pickerStyles.rowTitle}>
          To do...
        </Text>
        <TouchableOpacity style={pickerStyles.row} onPress={() => pickerRef.current.show()}>
          <Text style={pickerStyles.rowValue}>
            {value}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <ReactNativePickerModule
        pickerRef={pickerRef}
        value={value}
        title={"To do..."}
        items={activities}
        titleStyle={{ color: "#8e8e93", fontSize: 20, fontWeight: '360' }}
        itemStyle={{ color: "black" }}
        selectedColor="black"
        confirmButtonEnabledTextStyle={{ color: "#147efb", fontWeight: '360', fontSize: 20 }}
        confirmButtonDisabledTextStyle={{ color: "#8e8e93", fontWeight: '360', fontSize: 20 }}
        cancelButtonTextStyle={{ color: "#147efb", fontWeight: '600', fontSize: 20 }}
        confirmButtonStyle={{
          backgroundColor: "rgba(255,255,255,1)",
        }}
        cancelButtonStyle={{
          backgroundColor: "rgba(255,255,255,1)",
        }}
        contentContainerStyle={{
          backgroundColor: "rgba(255,255,255,1)",
        }}
        onCancel={() => {
          console.log("Cancelled")
        }}
        onValueChange={value => {
          console.log("value: ", value)
          setValue(value)
        }}
        ios={{ overlayColor: 'rgba(0,0,0,0.3)' }}
      />
    </View>
  )
}

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

export default ActivityPicker;
