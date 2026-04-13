'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import type { BlogPost } from '@/lib/blogPosts';

const CATEGORIES = ['All', 'Mental Health', 'Teen Development', 'Family', 'Parenting', 'Self-Care'];

export default function BlogFilter({ posts }: { posts: BlogPost[] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts =
    selectedCategory === 'All'
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  return (
    <>
      {}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-soft-gold text-white shadow-calm'
                : 'bg-white text-gray-700 hover:bg-warm-cream'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
            <Card className="h-full hover:shadow-calm-lg transition-all duration-300">
              {post.image && (
                <div className="relative w-full h-[200px] mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={60}
                    loading="lazy"
                  />
                </div>
              )}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="px-3 py-1 bg-warm-sand rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="heading-sm group-hover:text-soft-gold transition-colors duration-200">
                  {post.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">{post.excerpt}</p>
                <p className="text-sm text-gray-500">{post.date}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
