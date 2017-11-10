import { MediaItem } from './MediaItem';

export interface MediaAlbum {
  albumId: string
  name: string
  description: string
  data: MediaItem[]
}
