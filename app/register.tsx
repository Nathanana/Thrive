import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import '../firebaseConfig';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const auth = getAuth();
  const db = getFirestore();

  const handleRegister = async () => {
    if (email && password && username) {  
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
          username: username,
          email: email,
        });
  
        Alert.alert('Registration Successful', 'You can now log in!');
        router.replace('/');
      } catch (error: any) {
        if (error?.code) {
          switch (error.code) {
            case 'auth/email-already-in-use':
              Alert.alert('Error', 'This email is already in use.');
              break;
            case 'auth/weak-password':
              Alert.alert('Error', 'Password should be at least 6 characters.');
              break;
            default:
              Alert.alert('Error', 'Registration failed. Please try again.');
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
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#555"
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
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
        <TouchableOpacity style={styles.customButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <Text style={styles.link} onPress={() => router.push('/')}>
            Already have an account? Login
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
    fontFamily: 'monospace',
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

export default Register;
