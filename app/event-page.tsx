import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const footerImage = require('../assets/images/buildings.jpg'); // Adjust the path as needed

const EventPage = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Event Image with Downward Gradient */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://news.virginia.edu/sites/default/files/Header_Ryan_Marathon_SS.jpg' }} 
            style={styles.eventImage} 
            resizeMode="cover" 
          />
          <LinearGradient
            colors={['transparent', 'black']} // Gradient from transparent to black
            style={styles.gradientOverlay}
          />
        </View>

        {/* Event Title */}
        <Text style={styles.eventTitle}>Run with Jim Ryan</Text>

        {/* Event Description (Now right below the title) */}
        <Text style={styles.eventDescription}>by @JimRyan</Text>

        {/* Event Date & Time */}
        <Text style={styles.eventDate}>February 6th, 2025 at 7:00 AM</Text>

        {/* Buttons Container (Side by Side) */}
        <View style={styles.buttonContainer}>
          {/* RSVP Button */}
          <TouchableOpacity style={styles.button} onPress={() => alert('RSVP clicked')}>
            <Text style={styles.buttonText}>RSVP</Text>
          </TouchableOpacity>

          {/* Message Button */}
          <TouchableOpacity style={styles.button} onPress={() => alert('Message clicked')}>
            <Text style={styles.buttonText}>Message</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Image (Using Local File) */}
      <Image 
        source={footerImage}    // Using the imported local image
        style={styles.bottomImage} 
        resizeMode="cover" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 220,              // Ensure scrollable area above bottom image
  },
  imageContainer: {
    width: screenWidth, 
    height: 250,
  },
  eventImage: {
    width: screenWidth, 
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,        
    bottom: 0,     
  },
  eventTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',             
    fontFamily: 'monospace',
    paddingHorizontal: 10, 
  },
  eventDescription: {
    fontSize: 16,
    color: 'gray',               
    paddingHorizontal: 10,
    marginTop: 5,                
    marginBottom: 15,            
  },
  eventDate: {
    fontSize: 18,
    color: 'white',             
    paddingHorizontal: 10,
    marginBottom: 30,           
  },
  buttonContainer: {
    flexDirection: 'row',        
    justifyContent: 'space-between',
    paddingHorizontal: 10,       
  },
  button: {
    flex: 1,                      // Equal width for both buttons
    backgroundColor: '#000043',    // Blue background color
    paddingVertical: 12,
    marginHorizontal: 5,           // Space between buttons
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  bottomImage: {
    width: screenWidth,            // Full width
    height: 200,                   // Fixed height
    position: 'absolute',          // Position at the bottom
    bottom: 0,                     // Align to bottom
    zIndex: 10,                    // Above background but below other elements
  },
});

export default EventPage;
