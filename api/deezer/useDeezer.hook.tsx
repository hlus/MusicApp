import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { deezerService } from "./deezer.service";
import { ApiError } from "./dto/error.dto";
import { DeezerSearchResponse } from "./dto/search.dto";
import { TrackDetails } from "./dto/track-details.dto";

export const deezerQueryKeys = {
  all: ["deezer"] as const,
  searches: () => [...deezerQueryKeys.all, "search"] as const,
  artistSearch: (artistName: string, limit?: number) => [...deezerQueryKeys.searches(), "artist", artistName, limit] as const,
  trackById: (trackId: number) => [...deezerQueryKeys.all, "track", trackId] as const,
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

export const useTrackById = (trackId: number, options?: Omit<UseQueryOptions<TrackDetails, ApiError>, "queryKey" | "queryFn">) => {
  return useQuery({
    queryKey: deezerQueryKeys.trackById(trackId),
    queryFn: () => deezerService.getTrackById(trackId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled: !!trackId && trackId > 0,
    ...options,
  });
};
