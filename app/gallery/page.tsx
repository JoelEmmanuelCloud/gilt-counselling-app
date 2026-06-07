import type { Metadata } from 'next';
import connectDB from '@/lib/mongodb';
import { getAllGalleryItems } from '@/lib/models/gallery';
import GalleryGrid, { GalleryItem } from './GalleryGrid';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'A look at the moments, outreach, events, and people behind Gilt Counselling Consult.',
  alternates: {
    canonical: '/gallery',
  },
};

async function getItems(): Promise<GalleryItem[]> {
  try {
    await connectDB();
    const docs = await getAllGalleryItems();
    return docs.map((doc: any) => ({
      _id: doc._id.toString(),
      title: doc.title,
      description: doc.description || '',
      imageUrl: doc.imageUrl,
      category: doc.category || 'General',
    }));
  } catch (error) {
    console.error('Failed to load gallery:', error);
    return [];
  }
}

export default async function GalleryPage() {
  const items = await getItems();

  return (
    <div className="min-h-screen bg-off-white">
      <section className="bg-gradient-to-br from-warm-cream via-off-white to-warm-sand py-10 sm:py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="heading-xl mb-6">Gallery</h1>
          <p className="body-lg">
            A glimpse into our work—outreach, events, workshops, and the people who
            make Gilt Counselling Consult what it is.
          </p>
        </div>
      </section>

      <section className="section-container">
        <div className="max-w-7xl mx-auto">
          <GalleryGrid items={items} />
        </div>
      </section>
    </div>
  );
}
