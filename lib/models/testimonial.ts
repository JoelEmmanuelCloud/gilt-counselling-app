import mongoose, { Schema } from 'mongoose';

export type TestimonialCategory = 'client' | 'school' | 'community' | 'media';

export interface ISchoolQuote {
  text: string;
  role: string;
}

export interface ITestimonial {
  _id?: string;
  category: TestimonialCategory;
  published: boolean;
  order: number;
  quote?: string;
  name?: string;
  service?: string;
  date?: string;
  school?: string;
  quotes?: ISchoolQuote[];
  title?: string;
  organization?: string;
  description?: string;
  images?: string[];
  videoUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const SchoolQuoteSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, 'Quote text is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
  },
  { _id: false }
);

const TestimonialSchema = new Schema(
  {
    category: {
      type: String,
      enum: ['client', 'school', 'community', 'media'],
      required: [true, 'Category is required'],
      index: true,
    },
    published: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    quote: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    service: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
      trim: true,
    },
    school: {
      type: String,
      trim: true,
    },
    quotes: [SchoolQuoteSchema],
    title: {
      type: String,
      trim: true,
    },
    organization: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    images: [{ type: String }],
    videoUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

let Testimonial: any;
if (mongoose.models.Testimonial) {
  Testimonial = mongoose.models.Testimonial;
} else {
  Testimonial = mongoose.model('Testimonial', TestimonialSchema);
}

export default Testimonial;
