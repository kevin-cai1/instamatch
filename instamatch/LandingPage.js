import React from 'react';
import { StyleSheet, View, Image, Text, Dimensions, Button, TouchableOpacity } from 'react-native';
import { Carousel } from '@ant-design/react-native';
import { ACCENT_COLOR } from './Constants';
import { AntDesign } from '@expo/vector-icons';
import InstaMatchLogo from './assets/InstaMatchLogo.js';

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
          <View style={styles.logo}>
            <InstaMatchLogo/>
          </View>
            <View style={styles.graphics}>
              <Image
                style={styles.home1}
                source= {require('./assets/home.png')}
              />
              <View style={{}} >
                <AntDesign style={{transform: [{rotate: '90deg'}], marginTop: 100}} name="wifi" size={100} color="#2404E7" />
              </View>  
              <Image
                style={styles.home1}
                source= {require('./assets/home.png')}
              />
            </View>
          </View>
          <View style={styles.caption} >
            <Text style={styles.heading}>
              Welcome to InstaMatch!
            </Text>
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
            <View style={styles.graphics2}>
              <Image
                style={styles.home2}
                source= {require('./assets/home.png')}
              />
            </View>
          </View>
          <View style={styles.caption}>
            <Text style={styles.heading}>
              Match up
            </Text>
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
            <View style={styles.graphics3}>
              <Image
                style={styles.tag}
                source= {require('./assets/tag2.png')}
              />  
              <Image
                style={styles.tag}
                source= {require('./assets/tag1.png')}
              />
            </View>
          </View>
          <View style={styles.caption}>
            <Text style={styles.heading}>
              Friend Tags
            </Text>
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
    alignContent: "center",
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
    margin: 20,
    marginLeft: 30,
  },
  text: {
    color: '#000',
    fontSize: 20,
  },
  logo: {
    marginTop: screen.height * 0.08,
    marginLeft: 10,
  },
  image: {
    
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
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
    backgroundColor: "#2D4DC0",
    borderWidth: 1,
    borderColor: '#fff',
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
  },
  graphics: {
    paddingTop: 40,
    margin: 10,
    width: screen.width * 0.4,
    height: screen.height * 0.5,
    display: "flex",
    flexDirection: "row",
  },
  graphics2: {
    width: screen.width * 0.4,
    height: screen.height * 0.5,
    display: "flex",
    margin: 10,
  },
  graphics3: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  home1: {
    resizeMode: "contain",
    width: screen.width * 0.35,
    height: screen.height * 0.3,
  },
  home2: {
    resizeMode: "contain",
    height: screen.height * 0.45
  },
  tag: {
    width: screen.width * 0.8,
    resizeMode: "contain",
    height: 100,
    marginTop: 30
  }
});

export default LandingPage;