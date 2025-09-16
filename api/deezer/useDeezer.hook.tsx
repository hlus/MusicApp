import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { deezerService } from "./deezer.service";
import { ApiError } from "./dto/error.dto";
import { DeezerSearchResponse, SearchParams } from "./dto/search.dto";

export const deezerQueryKeys = {
  all: ["deezer"] as const,
  searches: () => [...deezerQueryKeys.all, "search"] as const,
  search: (params: SearchParams) => [...deezerQueryKeys.searches(), params] as const,
  artistSearch: (artistName: string, limit?: number) => [...deezerQueryKeys.searches(), "artist", artistName, limit] as const,
  trackSearch: (trackName: string, limit?: number) => [...deezerQueryKeys.searches(), "track", trackName, limit] as const,
  albumSearch: (albumName: string, limit?: number) => [...deezerQueryKeys.searches(), "album", albumName, limit] as const,
};

export const useDeezerSearch = (params: SearchParams, options?: Omit<UseQueryOptions<DeezerSearchResponse, ApiError>, "queryKey" | "queryFn">) => {
  return useQuery({
    queryKey: deezerQueryKeys.search(params),
    queryFn: () => deezerService.searchTracks(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options,
  });
};

export const useArtistSearch = (
  artistName: string,
  limit: number = 25,
  options?: Omit<UseQueryOptions<DeezerSearchResponse, ApiError>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: deezerQueryKeys.artistSearch(artistName, limit),
    queryFn: () => deezerService.searchByArtist(artistName, limit),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !!artistName.trim(),
    ...options,
  });
};

export const useTrackSearch = (
  trackName: string,
  limit: number = 25,
  options?: Omit<UseQueryOptions<DeezerSearchResponse, ApiError>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: deezerQueryKeys.trackSearch(trackName, limit),
    queryFn: () => deezerService.searchByTrack(trackName, limit),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !!trackName.trim(),
    ...options,
  });
};

export const useAlbumSearch = (
  albumName: string,
  limit: number = 25,
  options?: Omit<UseQueryOptions<DeezerSearchResponse, ApiError>, "queryKey" | "queryFn">
) => {
  return useQuery({
    queryKey: deezerQueryKeys.albumSearch(albumName, limit),
    queryFn: () => deezerService.searchByAlbum(albumName, limit),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !!albumName.trim(),
    ...options,
  });
};
