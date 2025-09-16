import { DeezerTrack } from './track.dto';

export interface DeezerSearchResponse {
  data: DeezerTrack[];
  total: number;
  next?: string;
  prev?: string;
}

export interface SearchParams {
  q: string;
  limit?: number;
  offset?: number;
  order?: 'RANKING' | 'TRACK_ASC' | 'TRACK_DESC' | 'ARTIST_ASC' | 'ARTIST_DESC' | 'ALBUM_ASC' | 'ALBUM_DESC' | 'RATING_ASC' | 'RATING_DESC' | 'DURATION_ASC' | 'DURATION_DESC';
}
