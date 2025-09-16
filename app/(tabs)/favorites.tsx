import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ActivityIndicator, FlatList, ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DeezerTrack } from "@/api/deezer/dto/track.dto";
import { useArtistSearch } from "@/api/deezer/useDeezer.hook";
import { TrackCard } from "@/components/TrackCard";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";

const FavoritesScreen = () => {
  const insets = useSafeAreaInsets();
  const { isPending, error, data } = useArtistSearch("System of a Down", 25);
  const [isScrolled, setIsScrolled] = useState(false);

  if (isPending) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        <ThemedText style={styles.loadingText}>Loading favorites...</ThemedText>
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

  const favorites = data?.data || [];

  const handleTrackPress = (trackId: number, trackName: string) => {
    router.push({
      pathname: "/track-modal",
      params: {
        trackId: trackId.toString(),
        trackName: trackName,
      },
    });
  };

  const renderTrackRow = ({ item: track }: ListRenderItemInfo<DeezerTrack>) => (
    <TrackCard track={track} onPress={handleTrackPress} />
  );

  const keyExtractor = (item: DeezerTrack) => item.id.toString();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const isUpdatedScrolled = scrollY >= insets.top / 2;

    if (isScrolled !== isUpdatedScrolled) {
      setIsScrolled(isUpdatedScrolled);
    }
  };

  const EmptyState = () => (
    <ThemedView style={styles.emptyContainer}>
      <IconSymbol name="favorite" size={64} color="#ccc" />
      <ThemedText style={styles.emptyTitle}>No Favorites Yet</ThemedText>
      <ThemedText style={styles.emptySubtitle}>
        Start adding tracks to your favorites by tapping the heart icon on any track
      </ThemedText>
    </ThemedView>
  );

  const ListHeaderComponent = () => (
    <ThemedText style={styles.title}>
      My Favorites ({favorites.length})
    </ThemedText>
  );

  return (
    <>
      <StatusBar hidden={isScrolled} />
      <FlatList
        style={[styles.container, { paddingTop: insets.top }]}
        data={favorites}
        renderItem={renderTrackRow}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={EmptyState}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.7,
    lineHeight: 22,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
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
