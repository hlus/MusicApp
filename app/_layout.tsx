import "@expo/metro-runtime";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import TrackPlayer from "react-native-track-player";

import { queryClient } from "@/api/config/queryClient";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};
const RootLayout: React.FC = () => {
  const colorScheme = useColorScheme();

  useEffect(() => {
    const setupTrackPlayer = async () => {
      try {
        await TrackPlayer.setupPlayer();
      } catch (error) {
        console.error("Failed to setup TrackPlayer:", error);
      }
    };

    setupTrackPlayer();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="track-modal"
            options={({ route }) => ({
              presentation: "modal",
              title: (route.params as { trackName?: string })?.trackName || "Track Details",
            })}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
