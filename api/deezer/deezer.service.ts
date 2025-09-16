import { ApiError } from "./dto/error.dto";
import { DeezerSearchResponse, SearchParams } from "./dto/search.dto";

const DEEZER_BASE_URL = "https://api.deezer.com";

class DeezerService {
  private baseUrl: string;

  constructor(baseUrl: string = DEEZER_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
      const error: ApiError = {
        message: `HTTP error! status: ${response.status}`,
        status: response.status,
      };
      throw error;
    }

    try {
      return await response.json();
    } catch {
      const apiError: ApiError = {
        message: "Failed to parse JSON response",
        code: "JSON_PARSE_ERROR",
      };
      throw apiError;
    }
  };

  private buildSearchUrl = (params: SearchParams): string => {
    const searchParams = new URLSearchParams();
    searchParams.append("q", params.q);

    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.offset) searchParams.append("offset", params.offset.toString());
    if (params.order) searchParams.append("order", params.order);

    return `${this.baseUrl}/search?${searchParams.toString()}`;
  };

  searchTracks = async (params: SearchParams): Promise<DeezerSearchResponse> => {
    try {
      const url = this.buildSearchUrl(params);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return await this.handleResponse<DeezerSearchResponse>(response);
    } catch (error) {
      if (error instanceof Error) {
        const apiError: ApiError = {
          message: error.message,
          code: "NETWORK_ERROR",
        };
        throw apiError;
      }
      throw error;
    }
  };

  searchByArtist = async (artistName: string, limit: number = 25): Promise<DeezerSearchResponse> => {
    return this.searchTracks({
      q: `artist:"${artistName}"`,
      limit,
      order: "RANKING",
    });
  };

  searchByTrack = async (trackName: string, limit: number = 25): Promise<DeezerSearchResponse> => {
    return this.searchTracks({
      q: `track:"${trackName}"`,
      limit,
      order: "RANKING",
    });
  };

  searchByAlbum = async (albumName: string, limit: number = 25): Promise<DeezerSearchResponse> => {
    return this.searchTracks({
      q: `album:"${albumName}"`,
      limit,
      order: "RANKING",
    });
  };
}

export const deezerService = new DeezerService();
