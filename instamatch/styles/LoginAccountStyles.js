import {StyleSheet} from 'react-native'

const loginAccountStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    margin: 20,
    marginTop: 30,
    alignItems: 'center'
  },
  form: {
    width: 300,
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingBottom: 24
  },
  inputBox: {
    height: 40,
    borderColor: '#647C90', 
    borderWidth: 1, 
    borderRadius: 13, 
    paddingHorizontal: 10, 
    fontSize: 18,
  },
  logo: {
    marginTop: 50,
    alignContent: 'center'
  },
  createAccountButton: {
    borderColor:'#1C3AA1',
    alignItems:'center',
    justifyContent:'center',
    width:200,
    height:44,
    backgroundColor:'#1C3AA1',
    borderRadius:24,
    alignSelf: 'flex-end',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: '#474e59',
    shadowOffset: { height: 3, width: 0 }   
  },
  loginButton: {
    borderColor:'#1C3AA1',
    alignItems:'center',
    justifyContent:'center',
    width:200,
    height:44,
    backgroundColor:'#1C3AA1',
    borderRadius:24,
    alignSelf: 'flex-end',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: '#474e59',
    shadowOffset: { height: 3, width: 0 }   
  },
  signInButton: {
    alignItems:'center',
    alignSelf:'center',
    justifyContent:'center',
    width:132,
    height:44,
    marginTop: 18,
    marginBottom: 30,
  },
  errorText: {
    color: 'crimson',
    marginBottom: 8,
    paddingTop: 8,
    fontSize: 16,
    textAlign: 'center'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFFFFF'
  },
  signInText: {
    color: '#1C3AA1',
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  font: {
    fontSize: 18,
    alignSelf: 'center',
  }
})

export default loginAccountStyles;