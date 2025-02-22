import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="event-page" />
      <Stack.Screen name="add-event" />
      <Stack.Screen name="void" />
    </Stack>
  );
}