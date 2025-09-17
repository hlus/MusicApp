import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

interface LoadingStateProps {
  message?: string;
  size?: "small" | "large";
}

export const LoadingState = ({ message = "Loading...", size = "large" }: LoadingStateProps) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} />
    <ThemedText style={styles.text}>{message}</ThemedText>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    marginTop: 8,
    fontSize: 16,
  },
});
