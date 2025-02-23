import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleResetPassword = () => {
    if (email) {
      Alert.alert('Password Reset Sent', `A reset link has been sent to ${email}`);
      router.replace('/');
    } else {
      Alert.alert('Error', 'Please enter your email');
    }
  };

  return (
    <ImageBackground source={require('../assets/images/icon.png')} style={styles.background}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#555"
        />
        <TouchableOpacity style={styles.customButton} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <Text style={styles.link} onPress={() => router.push('/')}>
            Back to Login
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

export default ForgotPassword;
