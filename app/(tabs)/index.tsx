import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DeezerTrack } from "@/api/deezer/dto/track.dto";
import { useArtistSearch } from "@/api/deezer/useDeezer.hook";
import { ThemedText } from "@/components/themed-text";
import { TrackCard } from "@/components/TrackCard";

const PlaylistScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { isPending, error, data } = useArtistSearch("System of a Down", 25);

  if (isPending) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <ThemedText style={styles.loadingText}>Loading tracks...</ThemedText>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <ThemedText style={styles.errorText}>Error: {error.message}</ThemedText>
      </View>
    );
  }

  const renderTrackRow = (track: DeezerTrack) => <TrackCard key={track.id} track={track} />;

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
      <ThemedText style={styles.title}>System of a Down Tracks</ThemedText>
      {data.data.map(renderTrackRow)}
    </ScrollView>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
