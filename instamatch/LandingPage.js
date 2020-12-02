import React from 'react';
import { StyleSheet, View, Image, Text, Dimensions, Button, TouchableOpacity } from 'react-native';
import { Carousel } from '@ant-design/react-native';
import { ACCENT_COLOR } from './Constants';
import { ServerContainer } from '@react-navigation/native';

const screen = Dimensions.get("screen");
const ratio = screen.width/803; // actual image width

const LandingPage = ({navigation}) => {
  
  return (
    <View>
      <Carousel
        style={styles.gallery}
        selectedIndex={0}
      >
        <View style={styles.item}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source= {require('./assets/InstaMatchLogo.png')}
            />
          </View>
          <View style={styles.caption} >
            <Text style={styles.text}>
            Spontaneously connect with your friends, when it suits you!
          </Text>
          </View>
        </View>
        <View style={styles.item, styles.item2}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source= {require('./assets/InstaMatchLogo.png')}
            />
          </View>
          <View style={styles.caption}>
            <Text style={styles.text}>
              Apply filters and instantaneously search for other friends.
            </Text>
          </View>
        </View>
        <View style={styles.item, styles.item3}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source= {require('./assets/InstaMatchLogo.png')}
            />
          </View>
          <View style={styles.caption}>
            <Text style={styles.text}>
              Manage your friends with tags!
            </Text>
            <Text style={styles.text} >
              Match with the friends you want, when you want
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
    height: screen.height * 0.9,
    flexGrow: 1,
  },
  imageContainer: {
    height: screen.height * 0.7,
  },
  item: {
    backgroundColor: '#D3E5FF',
    height: screen.height,
  },
  item2: {
    backgroundColor: '#EF767A',
  },
  item3: {
    backgroundColor: '#65b891',
  },
  caption:{
    backgroundColor: '#3A3A3A',
    height: screen.height * 0.2,
  },
  text: {
    color: '#ffffff',
    margin: 20,
    fontSize: 20,
  },
  image: {
    marginTop: screen.height * 0.08,
    marginLeft: 10
    /* width: screen.width,
    height: 1082 * ratio, // actual image height */
    
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
    height: screen.height * 0.1,
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