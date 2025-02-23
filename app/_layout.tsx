import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      <Stack.Screen name="main" options={{ headerShown: false }} />
      <Stack.Screen name="event-page" options={{ title: "Event Page", headerBackTitle: 'Home', headerTintColor: "#131E3A" }} />
      <Stack.Screen name="add-event" options={{ title: "Add Event", headerBackTitle: 'Home', headerTintColor: "#131E3A" }} />
      <Stack.Screen name="void" />
    </Stack>
  );
}