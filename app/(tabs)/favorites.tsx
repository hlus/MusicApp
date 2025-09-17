import { useFocusEffect } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { FlatList, ListRenderItemInfo, NativeScrollEvent, NativeSyntheticEvent, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TrackFavoriteCard } from "@/components/TrackFavoriteCard";
import { ThemedText } from "@/components/themed-text";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { FavoriteTrack } from "@/db/favorite-tracks";
import { useFavorites } from "@/services/favorites/use-favorites.hook";

const FavoritesScreen = () => {
  const { getFavorites, deleteFromFavorites, isLoading, error } = useFavorites();
  const insets = useSafeAreaInsets();
  const [favorites, setFavorites] = useState<FavoriteTrack[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const updateFavorites = useCallback(async () => {
    const favorites = await getFavorites();
    setFavorites(favorites);
  }, []);

  const handleUnfavorite = async (track: FavoriteTrack) => {
    await deleteFromFavorites(track.id);
    updateFavorites();
  };

  useFocusEffect(
    useCallback(() => {
      updateFavorites();
    }, [])
  );

  if (isLoading) {
    return <LoadingState message="Loading favorites..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  const renderTrackRow = ({ item: track }: ListRenderItemInfo<FavoriteTrack>) => (
    <TrackFavoriteCard track={track} toggleUnfavorite={handleUnfavorite} />
  );

  const keyExtractor = (item: FavoriteTrack) => item.id.toString();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const isUpdatedScrolled = scrollY >= insets.top / 2;

    if (isScrolled !== isUpdatedScrolled) {
      setIsScrolled(isUpdatedScrolled);
    }
  };

  const EmptyFavoritesState = () => (
    <EmptyState 
      icon="favorite" 
      title="No Favorites Yet"
      subtitle="Start adding tracks to your favorites by tapping the heart icon on any track"
    />
  );

  const ListHeaderComponent = () => <ThemedText style={styles.title}>My Favorites ({favorites.length})</ThemedText>;

  return (
    <>
      <StatusBar hidden={isScrolled} />
      <FlatList
        style={[styles.container, { paddingTop: insets.top }]}
        data={favorites}
        renderItem={renderTrackRow}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={EmptyFavoritesState}
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
});
