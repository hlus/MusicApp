import React from "react";
import { Image, StyleSheet, View } from "react-native";

import { DeezerTrack } from "@/api/deezer/dto/track.dto";
import { ThemedText } from "@/components/themed-text";

interface TrackCardProps {
  track: DeezerTrack;
}

export const TrackCard: React.FC<TrackCardProps> = ({ track }) => (
  <View style={styles.trackItem}>
    <Image source={{ uri: track.album.cover_big }} style={styles.albumCover} resizeMode="cover" />
    <View style={styles.trackInfo}>
      <ThemedText style={styles.trackTitle}>{track.title}</ThemedText>
      <ThemedText style={styles.trackAlbum}>Album: {track.album.title}</ThemedText>
      <ThemedText style={styles.trackDuration}>
        Duration: {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, "0")}
      </ThemedText>
    </View>
  </View>
);

const styles = StyleSheet.create({
  trackItem: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  albumCover: {
    width: 85,
    height: 85,
    borderRadius: 8,
    marginRight: 12,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  trackAlbum: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  trackDuration: {
    fontSize: 12,
    color: "#888",
  },
});
