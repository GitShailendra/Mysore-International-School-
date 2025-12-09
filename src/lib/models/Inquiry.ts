import mongoose, { Schema, Model } from 'mongoose';

export interface IInquiry {
  _id: string;
  studentName: string;
  parentName: string;
  email?: string;
  phone: string;
  occupation: string;
  category: 'Admission' | 'Inquiry' | 'Visit' | 'Other';
  message?: string;
  remarks: string;
  status: 'New' | 'Contacted' | 'Not Responding' | 'Follow Up' | 'Enrolled' | 'Rejected';
  source: 'Website' | 'Facebook' | 'Instagram' | 'Newspaper' | 'Friends/Family' | 'Google Search' | 'Other';
  createdAt: Date;
  updatedAt: Date;
}

const inquirySchema = new Schema<IInquiry>(
  {
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },
    parentName: {
      type: String,
      required: [true, 'Parent name is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    occupation: {
      type: String,
      required: [true, 'Occupation is required'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Admission', 'Inquiry', 'Visit', 'Other'],
      default: 'Admission',
    },
    message: {
      type: String,
      trim: true,
    },
    remarks: {
      type: String,
      default: 'No remarks',
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Not Responding', 'Follow Up', 'Enrolled', 'Rejected'],
      default: 'New',
    },
    source: {
      type: String,
      enum: ['Website', 'Facebook', 'Instagram', 'Newspaper', 'Friends/Family', 'Google Search', 'Other'],
      default: 'Website',
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
inquirySchema.index({ status: 1, createdAt: -1 });
inquirySchema.index({ phone: 1 });
inquirySchema.index({ email: 1 });

// Clear existing model if it exists
if (mongoose.models.Inquiry) {
  delete mongoose.models.Inquiry;
}

const Inquiry: Model<IInquiry> = mongoose.model<IInquiry>('Inquiry', inquirySchema);

export default Inquiry;
