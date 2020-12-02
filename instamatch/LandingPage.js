import React from 'react';
import { StyleSheet, View, Image, Text, Dimensions, Button, TouchableOpacity } from 'react-native';
import { Carousel } from '@ant-design/react-native';
import { ACCENT_COLOR } from './Constants';

const screen = Dimensions.get("screen");

const LandingPage = ({navigation}) => {
  
  return (
    <View style={{height: screen.height, backgroundColor: '#000'}}>
      <Carousel
        style={styles.gallery}
        dotActiveStyle={{backgroundColor: '#000'}}
        dotStyle={{backgroundColor: '#A8A8A8'}}
        selectedIndex={0}
        infinite
      >
        <View style={styles.item}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.logo}
              source= {require('./assets/InstaMatchLogo.png')}
            />
          </View>
          <View style={styles.caption} >
            <Text style={styles.text}>
              Spontaneously connect with your friends, when it suits you!
            </Text>
          </View>
        </View>
        <View style={styles.item2}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.logo}
              source= {require('./assets/InstaMatchLogo.png')}
            />
          </View>
          <View style={styles.caption}>
            <Text style={styles.text}>
              Apply filters and instantaneously search for other friends.
            </Text>
          </View>
        </View>
        <View style={styles.item3}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.logo}
              source= {require('./assets/InstaMatchLogo.png')}
            />
          </View>
          <View style={styles.caption}>
            <Text style={styles.text}>
              Manage your friends with tags!
              {"\n\n"}
              Match with the friends you want, when you want
            </Text>
          </View>
        </View>
      </Carousel>
      <View style={styles.buttonGroup}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateAccountScreen')}>
            <Text style={styles.buttonLabel}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer} >
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.buttonLabel1} >Login</Text>
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
    height: screen.height * 0.85,
    flexGrow: 1,
  },
  imageContainer: {
    height: screen.height * 0.6,
  },
  item: {
    backgroundColor: '#D3E5FF',
    height: screen.height,
  },
  item2: {
    backgroundColor: '#C1C8FF',
    height: screen.height,
  },
  item3: {
    backgroundColor: '#7BC4FA',
    height: screen.height,
  },
  caption:{
    margin: 20
  },
  text: {
    color: '#000',
    margin: 20,
    fontSize: 20,
  },
  logo: {
    marginTop: screen.height * 0.08,
    marginLeft: 10,
  },
  image: {
    
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333333",
    height: screen.height * 0.14
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: "#3F65E9",
    margin: 10,
    borderRadius: 30,
    height: screen.height * 0.06,
    alignItems: "center",
    textAlign: "center",
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: 20,
    color: '#ffffff'
  },
  buttonLabel1: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#ffffff'
  }
});

export default LandingPage;