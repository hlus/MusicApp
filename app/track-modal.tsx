import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, Linking, ScrollView, StyleSheet, View } from "react-native";

import { useTrackById } from "@/api/deezer/useDeezer.hook";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();
const openLink = (url: string) => Linking.openURL(url);
const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const TrackModal = () => {
  const { trackId } = useLocalSearchParams<{ trackId: string; trackName: string }>();
  const { data: trackDetails, isLoading, error, isError } = useTrackById(parseInt(trackId || "0"));

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" />
        <ThemedText style={styles.loadingText}>Loading track details...</ThemedText>
      </ThemedView>
    );
  }

  if (isError) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">Error</ThemedText>
        <ThemedText style={styles.errorText}>{error?.message || "Failed to fetch track details"}</ThemedText>
        <ThemedText style={styles.trackId}>Track ID: {trackId}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.container}>
        {trackDetails && (
          <>
            <View style={styles.header}>
              <Image source={{ uri: trackDetails.album?.cover_big }} style={styles.albumCover} />
              <View style={styles.headerInfo}>
                <ThemedText type="title" style={styles.trackTitle}>
                  {trackDetails.title}
                </ThemedText>
                <ThemedText style={styles.artistName}>{trackDetails.artist?.name}</ThemedText>
                <ThemedText style={styles.albumName}>{trackDetails.album?.title}</ThemedText>
              </View>
            </View>

            <View style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Track Information
              </ThemedText>
              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Duration:</ThemedText>
                <ThemedText style={styles.infoValue}>{formatDuration(trackDetails.duration)}</ThemedText>
              </View>
              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Position:</ThemedText>
                <ThemedText style={styles.infoValue}>
                  {trackDetails.track_position} of {trackDetails.disk_number}
                </ThemedText>
              </View>
              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Release Date:</ThemedText>
                <ThemedText style={styles.infoValue}>{formatDate(trackDetails.release_date)}</ThemedText>
              </View>
              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>ISRC:</ThemedText>
                <ThemedText style={styles.infoValue}>{trackDetails.isrc}</ThemedText>
              </View>
              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Rank:</ThemedText>
                <ThemedText style={styles.infoValue}>{trackDetails.rank.toLocaleString()}</ThemedText>
              </View>
            </View>

            <View style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Audio Details
              </ThemedText>
              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>BPM:</ThemedText>
                <ThemedText style={styles.infoValue}>{trackDetails.bpm || "N/A"}</ThemedText>
              </View>
              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Gain:</ThemedText>
                <ThemedText style={styles.infoValue}>{trackDetails.gain} dB</ThemedText>
              </View>
              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Explicit:</ThemedText>
                <ThemedText style={styles.infoValue}>{trackDetails.explicit_lyrics ? "Yes" : "No"}</ThemedText>
              </View>
            </View>

            <View style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Album Information
              </ThemedText>
              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Album Release:</ThemedText>
                <ThemedText style={styles.infoValue}>{formatDate(trackDetails.album?.release_date || "")}</ThemedText>
              </View>
              <View style={styles.infoRow}>
                <ThemedText style={styles.infoLabel}>Album ID:</ThemedText>
                <ThemedText style={styles.infoValue}>{trackDetails.album?.id}</ThemedText>
              </View>
            </View>

            {trackDetails.contributors && trackDetails.contributors.length > 0 && (
              <View style={styles.section}>
                <ThemedText type="subtitle" style={styles.sectionTitle}>
                  Contributors
                </ThemedText>
                {trackDetails.contributors.map((contributor, index) => (
                  <View key={index} style={styles.contributorRow}>
                    <ThemedText style={styles.contributorName}>{contributor.name}</ThemedText>
                    <ThemedText style={styles.contributorRole}>{contributor.role}</ThemedText>
                  </View>
                ))}
              </View>
            )}

            <View style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Links
              </ThemedText>
              <ThemedText style={styles.link} onPress={() => openLink(trackDetails.link)}>
                View on Deezer
              </ThemedText>
              <ThemedText style={styles.link} onPress={() => openLink(trackDetails.artist?.link || "")}>
                Artist Profile
              </ThemedText>
              <ThemedText style={styles.link} onPress={() => openLink(trackDetails.album?.link || "")}>
                Album Page
              </ThemedText>
              {trackDetails.preview && (
                <ThemedText style={styles.link} onPress={() => openLink(trackDetails.preview)}>
                  Preview Track
                </ThemedText>
              )}
            </View>

            <View style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Availability
              </ThemedText>
              <ThemedText style={styles.infoValue}>Available in {trackDetails.available_countries?.length || 0} countries</ThemedText>
            </View>
          </>
        )}
      </ThemedView>
    </ScrollView>
  );
};

export default TrackModal;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "center",
  },
  albumCover: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 20,
  },
  headerInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  artistName: {
    fontSize: 18,
    marginBottom: 4,
    color: "#666",
  },
  albumName: {
    fontSize: 16,
    color: "#888",
  },
  section: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    flex: 1,
    textAlign: "right",
  },
  contributorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  contributorName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  contributorRole: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
  link: {
    fontSize: 14,
    color: "#007AFF",
    textDecorationLine: "underline",
    marginVertical: 4,
  },
  trackId: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});
