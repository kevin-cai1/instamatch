import React, { useRef, useState } from "react";
import { View, Button, SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";
import ReactNativePickerModule from "react-native-picker-module";
import api from './api';

const FriendPicker = () => {
  const username='johnk13'
  const pickerRef = useRef()
  const [value, setValue] = useState("All Friends (Default)")
  const Api = new api();
  const [tagsList, setTagsList] = React.useState([]);
  React.useEffect(() => {
    Api.getAllTags(username)
      .then((result) => {
        console.log(result);
        (result.tags) && setTagsList(result.tags);
      });
  }, []);

  return (
    <View>
      <SafeAreaView style={pickerStyles.container}>
        <Text style={pickerStyles.rowTitle}>
          With...
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
        title={"With..."}
        items={tagsList}
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
        onValueChange={value => {
          console.log("value: ", value)
          setValue(value)
        }}
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
    marginBottom: 24,
    marginLeft: 18
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
    marginLeft: 90
  },
  rowTitle: {
    color: '#647C90',
    fontSize: 20,
  },
  rowValue: {
    color: '#647C90',
    fontSize: 14,
    fontWeight: '600',
    paddingLeft: 10,
  },
});

export default FriendPicker;
