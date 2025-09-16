import axios, { AxiosError } from "axios";

import { ApiError } from "./dto/error.dto";
import { DeezerSearchResponse, SearchParams } from "./dto/search.dto";

const DEEZER_BASE_URL = "https://api.deezer.com";

class DeezerService {
  private axiosInstance;

  constructor(baseUrl: string = DEEZER_BASE_URL) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  private handleError = (error: AxiosError): ApiError => {
    if (error.response) {
      return {
        message: `HTTP error! status: ${error.response.status}`,
        status: error.response.status,
      };
    } else if (error.request) {
      return {
        message: "Network error - no response received",
        code: "NETWORK_ERROR",
      };
    } else {
      return {
        message: error.message || "An unexpected error occurred",
        code: "UNKNOWN_ERROR",
      };
    }
  };

  searchTracks = async (params: SearchParams): Promise<DeezerSearchResponse> => {
    try {
      const response = await this.axiosInstance.get("/search", { params: { ...params, order: "RANKING" } });
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  };

  searchByArtist = async (artistName: string, limit: number = 25): Promise<DeezerSearchResponse> => {
    return this.searchTracks({ q: `artist:"${artistName}"`, limit });
  };

  searchByTrack = async (trackName: string, limit: number = 25): Promise<DeezerSearchResponse> => {
    return this.searchTracks({ q: `track:"${trackName}"`, limit });
  };

  searchByAlbum = async (albumName: string, limit: number = 25): Promise<DeezerSearchResponse> => {
    return this.searchTracks({ q: `album:"${albumName}"`, limit });
  };
}

export const deezerService = new DeezerService();
