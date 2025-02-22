import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      <Stack.Screen name="main" options={{ headerShown: true }} />
      <Stack.Screen name="event-page" options={{ title: "Event Page" }} />
      <Stack.Screen name="add-event" options={{ title: "Add Event" }} />
      <Stack.Screen name="void" />
    </Stack>
  );
}