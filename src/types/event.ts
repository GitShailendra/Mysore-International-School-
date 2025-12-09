export interface IEvent {
  _id: string
  title: string
  date: Date
  category: 'Cultural' | 'Sports' | 'Academic' | 'National' | 'Festival' | 'Competition'
  description: string
  thumbnail: {
    public_id: string
    url: string
  }
  galleryImages: Array<{
    public_id: string
    url: string
  }>
  driveLink: string
  photoCount: number
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

export interface EventResponse {
  id: string
  title: string
  date: string
  category: string
  description: string
  thumbnail: {
    public_id: string
    url: string
  }
  galleryImages: Array<{
    public_id: string
    url: string
  }>
  driveLink: string
  photoCount: number
  status: string
  createdAt: string
  updatedAt: string
}

export interface CreateEventData {
  title: string
  date: string
  category: string
  description: string
  driveLink: string
}

export interface UpdateEventData {
  title?: string
  date?: string
  category?: string
  description?: string
  driveLink?: string
}
