import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ActivityIndicator, FlatList, ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DeezerTrack } from "@/api/deezer/dto/track.dto";
import { useArtistSearch } from "@/api/deezer/useDeezer.hook";
import { ThemedText } from "@/components/themed-text";
import { TrackCard } from "@/components/TrackCard";

const PlaylistScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { isPending, error, data } = useArtistSearch("System of a Down", 25);
  const [isScrolled, setIsScrolled] = useState(false);

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

  const ListHeaderComponent = () => <ThemedText style={styles.title}>System of a Down Tracks</ThemedText>;

  const handleTrackPress = (trackId: number, trackName: string) => {
    router.push({
      pathname: "/track-modal",
      params: {
        trackId: trackId.toString(),
        trackName: trackName,
      },
    });
  };

  const renderTrackRow = ({ item: track }: ListRenderItemInfo<DeezerTrack>) => <TrackCard track={track} onPress={handleTrackPress} />;

  const keyExtractor = (item: DeezerTrack) => item.id.toString();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const isUpdatedScrolled = scrollY >= insets.top / 2;

    if (isScrolled !== isUpdatedScrolled) {
      setIsScrolled(isUpdatedScrolled);
    }
  };

  return (
    <>
      <StatusBar hidden={isScrolled} />
      <FlatList
        style={[styles.container, { paddingTop: insets.top }]}
        data={data.data}
        renderItem={renderTrackRow}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
    </>
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
