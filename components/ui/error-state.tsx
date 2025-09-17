import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <View style={styles.container}>
    <ThemedText style={styles.text}>Error: {message}</ThemedText>
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
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
