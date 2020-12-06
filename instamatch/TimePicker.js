import React, { useRef, useState } from "react";
import { View, Button, SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";
import ReactNativePickerModule from "react-native-picker-module";
import MinutePicker from "./MinutePicker"

const TimePicker = ( {updateHr, updateMin} ) => {
  const pickerRef = useRef()
  const [hr, setHr] = useState("1 hr");
  const hours = ['0 hr', '1 hr', '2 hr', '3 hr', '4 hr', '5 hr', '6 hr', '7 hr', '8 hr', '9 hr', '10 hr', '11 hr', '12 hr', '13 hr', '14 hr', '15 hr', '16 hr', '17 hr', '18 hr', '19 hr', '20 hr', '21 hr', '22 hr', '23 hr'];
  return (
    <View>
      <SafeAreaView style={pickerStyles.container}>
        <Text style={pickerStyles.rowTitle}>
          I'm free for...
        </Text>
        <TouchableOpacity style={pickerStyles.row} onPress={() => pickerRef.current.show()}>
          <Text style={pickerStyles.rowValue}>
            {hr}
          </Text>
        </TouchableOpacity>
        <MinutePicker updateMin={ (value) => { updateMin(value) }} />
      </SafeAreaView>
      <ReactNativePickerModule
        pickerRef={pickerRef}
        value={hr}
        title={"I'm free for..."}
        items={hours}
        titleStyle={{ color: "#8e8e93", fontSize: 20, fontWeight: '400' }}
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
        onValueChange={hr => {
          console.log("value: ", hr);
          setHr(hr)
          updateHr(hr);
        }}
        ios={{ overlayColor: 'rgba(0,0,0,0.3)' }}
      />
    </View>
  )
}

const pickerStyles = StyleSheet.create({
  container: {
    marginLeft: 18,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20
  },
  row: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    marginRight: 10,
    height: 40,
    width: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 38
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

export default TimePicker;
