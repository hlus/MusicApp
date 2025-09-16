import { DeezerTrack } from "@/api/deezer/dto/track.dto";
import { favoriteTracks } from "@/db/favorite-tracks";
import { useDB } from "@/db/useDB.hook";
import { eq } from "drizzle-orm";
import { useState } from "react";

export const useFavorites = () => {
  const { drizzleDb } = useDB();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFavorites = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const favorites = await drizzleDb.select().from(favoriteTracks);

      return favorites;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get favorites");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavorites = async (track: DeezerTrack) => {
    try {
      setIsLoading(true);
      setError(null);

      const favoriteTrackData = {
        id: track.id,
        title: track.title,
        albumImageUrl: track.album.cover_medium,
        albumName: track.album.title,
        duration: track.duration,
      };

      await drizzleDb.insert(favoriteTracks).values(favoriteTrackData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add track to favorites");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFromFavorites = async (trackId: number) => {
    try {
      setIsLoading(true);
      setError(null);

      await drizzleDb.delete(favoriteTracks).where(eq(favoriteTracks.id, trackId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete track from favorites");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getFavorites,
    addToFavorites,
    deleteFromFavorites,
    isLoading,
    error,
  };
};
