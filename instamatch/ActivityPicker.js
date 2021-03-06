import React, { useRef, useState } from "react";
import { View, Button, SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";
import ReactNativePickerModule from "react-native-picker-module";

const ActivityPicker = ( {updateActivity} ) => {
  const pickerRef = useRef()
  const [value, setValue] = useState("Any Activity");
  const activities = ['Any Activity', 'Brunch', 'Dinner', 'Drinks', 'Gym', 'Other Sport', 'Phone Call', 'Swim', 'Video Call', 'Walk'];
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
        titleStyle={{ color: "black", fontSize: 20, fontWeight: '400' }}
        itemStyle={{ color: "black" }}
        selectedColor="black"
        confirmButtonEnabledTextStyle={{ color: "#147efb", fontWeight: '400', fontSize: 20 }}
        confirmButtonDisabledTextStyle={{ color: "#8e8e93", fontWeight: '400', fontSize: 20 }}
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
          updateActivity(value)
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
    marginLeft: 18
  },
  row: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    marginRight: 32,
    height: 40,
    width: 160,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 83
  },
  rowTitle: {
    color: 'black',
    fontSize: 20,
  },
  rowValue: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
    paddingLeft: 10,
  },
});

export default ActivityPicker;
