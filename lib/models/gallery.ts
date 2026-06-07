import mongoose, { Schema } from 'mongoose';

export interface IGalleryItem {
  _id?: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  order?: number;
  createdBy?: mongoose.Types.ObjectId | string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const GallerySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Image is required'],
    },
    category: {
      type: String,
      default: 'General',
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

let Gallery: any;
if (mongoose.models.Gallery) {
  Gallery = mongoose.models.Gallery;
} else {
  Gallery = mongoose.model('Gallery', GallerySchema);
}

export default Gallery;

export const getAllGalleryItems = async () => {
  return await Gallery.find().sort({ order: 1, createdAt: -1 });
};

export const getGalleryItemById = async (id: string) => {
  return await Gallery.findById(id);
};

export const createGalleryItem = async (data: Partial<IGalleryItem>) => {
  const item = new Gallery(data);
  return await item.save();
};

export const updateGalleryItem = async (id: string, updates: Partial<IGalleryItem>) => {
  return await Gallery.findByIdAndUpdate(id, updates, { new: true });
};

export const deleteGalleryItem = async (id: string) => {
  const result = await Gallery.findByIdAndDelete(id);
  return result !== null;
};
