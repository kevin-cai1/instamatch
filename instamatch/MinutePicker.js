import React, { useRef, useState } from "react";
import { View, Button, SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";
import ReactNativePickerModule from "react-native-picker-module";

const MinutePicker = ( {updateMin} ) => {
  const pickerRef = useRef()
  const [min, setMin] = useState("0 min");
  const mins = ['0 min', '5 min', '10 min', '15 min', '20 min', '25 min', '30 min', '35 min', '40 min', '45 min', '50 min', '55 min'];
  return (
    <View>
      <TouchableOpacity style={pickerStyles.row} onPress={() => pickerRef.current.show()}>
        <Text style={pickerStyles.rowValue}>
          {min}
        </Text>
      </TouchableOpacity>
      <ReactNativePickerModule
        pickerRef={pickerRef}
        value={min}
        title={"I'm free for..."}
        items={mins}
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
        onValueChange={min => {
          console.log("value: ", min)
          setMin(min)
          updateMin(min);
        }}
        ios={{ overlayColor: 'rgba(0,0,0,0.3)' }}
      />
    </View>
  )
}

const pickerStyles = StyleSheet.create({
  row: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    marginRight: 32,
    height: 40,
    width: 70,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10
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

export default MinutePicker;
