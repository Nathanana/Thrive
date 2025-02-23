import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import '../firebaseConfig.js'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const auth = getAuth();
  
  const handleLogin = async () => {
  
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('Login Successful', 'Welcome back!');
        router.replace('/main');
      } catch (error: any) {
        if (error?.code) {
          switch (error.code) {
            case 'auth/user-not-found':
              Alert.alert('Error', 'No user found with this email.');
              break;
            case 'auth/wrong-password':
              Alert.alert('Error', 'Incorrect password.');
              break;
            default:
              Alert.alert('Error', 'Login failed. Please try again.');
          }
        } else {
          Alert.alert('Error', 'An unexpected error occurred.');
        }
      }
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  return (
    <ImageBackground source={require('../assets/images/icon.png')} style={styles.background}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          placeholderTextColor="#555"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#555"
        />
        <TouchableOpacity style={styles.customButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <Text style={styles.link} onPress={() => router.push('/register')}>
            Create Account
          </Text>
          <Text style={styles.link} onPress={() => router.push('/forgot-password')}>
            Forgot Password?
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  customButton: {
    backgroundColor: '#131E3A',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    opacity: 0.85,
    marginBottom: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 70,
  },
  linksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
    borderRadius: 5,
    backgroundColor: 'white',
    opacity: 0.85,
  },
  link: {
    color: '#1C2951',
    marginHorizontal: 20,
    textAlign: 'center',
  },
});

export default Login;