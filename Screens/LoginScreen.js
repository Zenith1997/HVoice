import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";


const LoginScreen = ({navigation}) => {
  const auth = getAuth();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = React.useState(null);

  onAuthStateChanged(auth, _user => {
    console.log('onAuthStateChanged', _user);
    setUser(_user);
    if(_user){
      navigation.navigate('Home');
    }
  });

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password).then(userCredentials => {
      const user = userCredentials.user;
      console.log('Registered with:', user.email);
    }).catch(e => {
      alert(e.message)
    });
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password).then(userCredentials => {
      const user = userCredentials.user;
      console.log('Logged in with:', user.email);
      navigation.navigate('Home');
    }).catch(e => {
      console.log(e)
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})
