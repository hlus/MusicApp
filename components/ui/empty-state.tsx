import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
import { IconSymbol, MaterialIconName } from "./icon-symbol";

interface EmptyStateProps {
  icon?: MaterialIconName;
  title: string;
  subtitle?: string;
}

export const EmptyState = ({ icon = "question-mark", title, subtitle }: EmptyStateProps) => (
  <View style={styles.container}>
    <IconSymbol name={icon} size={64} color="#ccc" />
    <ThemedText style={styles.title}>{title}</ThemedText>
    {subtitle && <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 22,
  },
});
