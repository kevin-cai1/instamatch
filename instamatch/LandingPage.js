import React from 'react';
import { StyleSheet, View, Image, Text, Dimensions, Button, TouchableOpacity } from 'react-native';
import { Carousel } from '@ant-design/react-native';
import { ACCENT_COLOR } from './Constants';

const screen = Dimensions.get("window");
const ratio = screen.width/875; // actual image width

const LandingPage = () => {
  
  return (
    <View>
      <Carousel
        style={styles.gallery}
        selectedIndex={0}
      >
        <View style={styles.item}>
          <Image
            style={styles.image}
            source= {require('./assets/gallery-img.png')}
          />
        </View>
        <View style={styles.item}>
          <Image
            style={styles.image}
            source= {require('./assets/gallery-img.png')}
          />
        </View>
        <View style={styles.item}>
          <Image
            style={styles.image}
            source= {require('./assets/gallery-img.png')}
          />
        </View>
      </Carousel>
      <View style={styles.buttonGroup}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => console.log("go to signup")}>
            <Text style={styles.buttonLabel}>Signup</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer} >
          <TouchableOpacity style={styles.button} onPress={() => console.log("go to login")}>
            <Text style={styles.buttonLabel} >Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gallery: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 1372 * ratio,
    flexGrow: 1,
  },
  item: {
    backgroundColor: '#ff0000',
  },
  image: {
    width: screen.width,
    height: 1372 * ratio, // actual image height
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    borderColor: '#000000',
    borderWidth: 2,
    backgroundColor: ACCENT_COLOR,
    height: screen.height - (1372 * ratio) - 107,
    alignItems: "center",
    textAlign: "center",
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: 20,
    color: '#ffffff'
  }
});

export default LandingPage;