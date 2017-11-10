
export interface MediaItem {
  itemId: string
  type: 'photo' | 'video'
  src: string

  thumbUrl?: string
  publishedAt?: Date
  title?: string
  description?: string
  localizedTitle?: string
  localizedDescription?: string
}
