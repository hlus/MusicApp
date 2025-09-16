import { FC, useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { DeezerTrack } from "@/api/deezer/dto/track.dto";
import { ThemedText } from "@/components/themed-text";
import { IconSymbol } from "@/components/ui/icon-symbol";

interface TrackCardProps {
  track: DeezerTrack;
  onPress?: (trackId: number, trackName: string) => void;
  isFavorite?: boolean;
  onFavoriteToggle?: (track: DeezerTrack, isFavorite: boolean) => void;
}

export const TrackCard: FC<TrackCardProps> = ({ track, onPress, isFavorite = false, onFavoriteToggle }) => {
  const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite);

  useEffect(() => {
    setLocalIsFavorite(isFavorite);
  }, [isFavorite]);

  const handleFavoritePress = () => {
    if (onFavoriteToggle) {
      onFavoriteToggle(track, !localIsFavorite);
    }

    setLocalIsFavorite(!localIsFavorite);
  };

  const favoriteStatus = onFavoriteToggle ? isFavorite : localIsFavorite;

  return (
    <TouchableOpacity style={styles.trackItem} onPress={() => onPress?.(track.id, track.title)} activeOpacity={0.7}>
      <Image source={{ uri: track.album.cover_big }} style={styles.albumCover} resizeMode="cover" />
      <View style={styles.trackInfo}>
        <ThemedText style={styles.trackTitle}>{track.title}</ThemedText>
        <ThemedText style={styles.trackAlbum}>Album: {track.album.title}</ThemedText>
        <ThemedText style={styles.trackDuration}>
          Duration: {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, "0")}
        </ThemedText>
      </View>
      <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress} activeOpacity={0.7}>
        <IconSymbol name={favoriteStatus ? "favorite" : "favorite-outline"} size={24} color={favoriteStatus ? "#ff6b6b" : "#ccc"} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

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
  favoriteButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
