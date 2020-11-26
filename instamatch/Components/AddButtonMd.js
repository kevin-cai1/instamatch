import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const AddButtonMd = ({text, onPressAction}) => {

  return (
    <>
      <TouchableOpacity
        style={style.mdIconButton}
        onPress={onPressAction}
      >
        <AntDesign
          name="pluscircle"
          size={50}
          color="#2C363F"
          backgroundColor = '#E5BD47'
          style={style.mdIcon}
        />
        <Text>{text}</Text>
      </TouchableOpacity>
    </>
  );
};

const style = StyleSheet.create({
  mdIconButton: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  mdIcon: {
    paddingBottom: 10,
  }
});

export default AddButtonMd;
