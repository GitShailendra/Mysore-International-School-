import mongoose, { Schema, Model } from 'mongoose'
import { IEvent } from '@/types/event'

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: [true, 'Please provide event title'],
      trim: true,
    },
    date: {
      type: Date,
      // required: [true, 'Please provide event date'],
    },
    category: {
      type: String,
      required: [true, 'Please provide event category'],
      enum: ['Cultural', 'Sports', 'Academic', 'National', 'Festival', 'Competition'],
    },
    description: {
      type: String,
      required: [true, 'Please provide event description'],
      trim: true,
    },
    thumbnail: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    galleryImages: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    driveLink: {
      type: String,
      // required: [true, 'Please provide Google Drive link'],
    },
    photoCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published',
    },
  },
  {
    timestamps: true,
  }
)

// Calculate photo count before saving
eventSchema.pre('save', async function () {
  this.photoCount = this.galleryImages.length
})

// ✅ Delete cached model before creating new one
if (mongoose.models.Event) {
  delete mongoose.models.Event
}

const Event: Model<IEvent> = mongoose.model<IEvent>('Event', eventSchema)

export default Event
