import mongoose, { Schema, Document } from 'mongoose'

export interface INewsEvent extends Document {
  type: 'news' | 'event'
  title: string
  excerpt: string
  fullContent: string
  imageUrl: string
  date: Date
  time?: string
  location?: string
  status: 'draft' | 'published'
  createdAt: Date
  updatedAt: Date
}

const NewsEventSchema: Schema = new Schema({
  type: {
    type: String,
    enum: ['news', 'event'],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    trim: true
  },
  fullContent: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    trim: true
  },
  location: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  }
}, {
  timestamps: true
})

export default mongoose.models.NewsEvent || mongoose.model<INewsEvent>('NewsEvent', NewsEventSchema)
