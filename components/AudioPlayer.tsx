import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import TrackPlayer, { State, usePlaybackState, useProgress } from "react-native-track-player";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface SimplePlayerProps {
  previewUrl: string;
  trackTitle: string;
  artistName: string;
  albumCover?: string;
}

export const AudioPlayer: React.FC<SimplePlayerProps> = ({ previewUrl, trackTitle, artistName, albumCover }) => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const progress = useProgress();
  const playbackState = usePlaybackState();

  useEffect(() => {
    setIsPlayerReady(true);

    return () => {
      TrackPlayer.reset();
    };
  }, []);

  useEffect(() => {
    if (playbackState.state === State.Playing) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [playbackState.state]);

  const handlePlayPause = async () => {
    if (!isPlayerReady || !previewUrl) return;

    try {
      if (isPlaying) {
        await TrackPlayer.pause();
      } else {
        const track = {
          url: previewUrl,
          title: trackTitle,
          artist: artistName,
          artwork: albumCover,
          duration: 30,
        };

        await TrackPlayer.reset();
        await TrackPlayer.add(track);
        await TrackPlayer.play();
      }
    } catch (error) {
      console.error("Playback error:", error);
      Alert.alert("Error", "Failed to play track");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isPlayerReady || !previewUrl) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.unavailableText}>Preview not available</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.playerHeader}>
        <ThemedText type="subtitle" style={styles.playerTitle}>
          Preview Player
        </ThemedText>
      </View>

      <View style={styles.trackInfo}>
        <ThemedText style={styles.trackTitle} numberOfLines={1}>
          {trackTitle}
        </ThemedText>
        <ThemedText style={styles.artistName} numberOfLines={1}>
          {artistName}
        </ThemedText>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(progress.position / progress.duration) * 100}%` }]} />
        </View>
        <View style={styles.timeContainer}>
          <ThemedText style={styles.timeText}>{formatTime(progress.position)}</ThemedText>
          <ThemedText style={styles.timeText}>{formatTime(progress.duration)}</ThemedText>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause} disabled={!isPlayerReady}>
          <IconSymbol name={isPlaying ? "pause" : "play-arrow"} size={32} color="white" />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 12,
  },
  playerHeader: {
    marginBottom: 15,
  },
  playerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  trackInfo: {
    marginBottom: 20,
    alignItems: "center",
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  artistName: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 2,
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#007AFF",
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 12,
    color: "#666",
  },
  controls: {
    alignItems: "center",
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  unavailableText: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
  },
});
