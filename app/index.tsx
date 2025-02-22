import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';

const Login = ({ navigation }: { navigation: any }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // You can replace this with real authentication logic
    if (username === 'user' && password === 'password') {
      // Store the login status in AsyncStorage
      await AsyncStorage.setItem('isLoggedIn', 'true');
      navigation.replace('main'); // Navigate to the main screen
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Link href="/main" asChild>
        <Button title="Login" />
      </Link>
      <Link href="/void">
            <Text>Create Account</Text>
      </Link>
      <Link href="/void">
            <Text>Forgot Password</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
  },
});

export default Login;
