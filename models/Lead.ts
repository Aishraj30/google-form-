import mongoose, { Document, Schema } from 'mongoose';

export interface ILead extends Document {
  name: string;
  phone: string;
  email: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email'],
  },
  source: {
    type: String,
    required: [true, 'Source is required'],
    trim: true,
    default: 'website',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
