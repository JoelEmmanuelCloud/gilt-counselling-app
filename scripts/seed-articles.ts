import mongoose from 'mongoose';
import { config } from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
config({ path: path.resolve(process.cwd(), '.env.local') });

import Article, { estimateReadTime } from '../lib/models/article';
import { blogPosts } from '../lib/blogPosts';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

async function seedArticles() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    let created = 0;
    let skipped = 0;

    for (const post of blogPosts) {
      const existing = await Article.findOne({ slug: post.slug });
      if (existing) {
        console.log(`Skipped (already exists): ${post.slug}`);
        skipped += 1;
        continue;
      }

      await Article.create({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        author: post.author,
        image: post.image,
        content: post.content,
        readTime: post.readTime || estimateReadTime(post.content),
        published: true,
        publishedAt: new Date(post.isoDate),
      });
      console.log(`Created: ${post.slug}`);
      created += 1;
    }

    console.log('\n========================================');
    console.log(`  ARTICLE SEED COMPLETE`);
    console.log(`  Created: ${created} | Skipped: ${skipped}`);
    console.log('========================================\n');

    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding articles:', error);
    process.exit(1);
  }
}

seedArticles();
