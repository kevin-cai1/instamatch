import React from 'react';
import { StyleSheet, View, Image, Text, Dimensions, Button, TouchableOpacity } from 'react-native';
import { Carousel } from '@ant-design/react-native';
import { ACCENT_COLOR } from './Constants';

const screen = Dimensions.get("window");
const ratio = screen.width/803; // actual image width

const LandingPage = ({navigation}) => {
  
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
          <View style={styles.caption} >
            <Text style={styles.text}>
            A great app for instantly finding friends who are free!
          </Text>
          </View>
        </View>
        <View style={styles.item}>
          <Image
            style={styles.image}
            source= {require('./assets/gallery-img.png')}
          />
          <View style={styles.caption}>
            <Text style={styles.text}>
              Second image caption
            </Text>
          </View>
        </View>
        <View style={styles.item}>
          <Image
            style={styles.image}
            source= {require('./assets/gallery-img.png')}
          />
          <View style={styles.caption}>
            <Text style={styles.text}>
              Third image caption
            </Text>
          </View>
        </View>
      </Carousel>
      <View style={styles.buttonGroup}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateAccountScreen')}>
            <Text style={styles.buttonLabel}>Signup</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer} >
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
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
    height: screen.height - 200,
    flexGrow: 1,
  },
  item: {
    backgroundColor: '#3A3A3A',
  },
  caption:{
    backgroundColor: '#3A3A3A',
    height: 200,
  },
  text: {
    color: '#ffffff',
    margin: 20,
    fontSize: 18,
  },
  image: {
    width: screen.width,
    height: 1082 * ratio, // actual image height
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
    height: 100,
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