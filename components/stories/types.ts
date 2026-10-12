export interface Story {
  id: string;
  title: string;
  organization?: string;
  date?: string;
  description: string;
  images: string[];
  videoUrl?: string;
}
