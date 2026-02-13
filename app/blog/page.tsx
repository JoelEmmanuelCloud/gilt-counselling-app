'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Mental Health', 'Teen Development', 'Family', 'Parenting', 'Self-Care'];

  const blogPosts = [
    {
      title: 'Understanding Teen Anxiety: Signs and Support Strategies',
      excerpt: 'Learn to recognize the signs of anxiety in teenagers and discover practical ways to provide support and encouragement.',
      category: 'Teen Development',
      date: 'December 15, 2024',
      readTime: '5 min read',
      slug: 'understanding-teen-anxiety',
      image: '/images/blog/teen-anxiety.jpg',
    },
    {
      title: '5 Ways to Support Your Mental Health Daily',
      excerpt: 'Small, consistent practices that can make a big difference in your emotional wellbeing and resilience.',
      category: 'Mental Health',
      date: 'December 10, 2024',
      readTime: '4 min read',
      slug: 'support-mental-health-daily',
      image: '/images/blog/mental-health.jpg',
    },
    {
      title: 'Building Resilience in Young People',
      excerpt: 'How to help teens and youths develop the inner strength to navigate life\'s challenges with confidence.',
      category: 'Teen Development',
      date: 'December 5, 2024',
      readTime: '6 min read',
      slug: 'building-resilience-young-people',
      image: '/images/blog/resilience.jpg',
    },
    {
      title: 'Family Communication: Creating Safe Spaces for Difficult Conversations',
      excerpt: 'Practical tips for fostering open, honest dialogue within your family, even about tough topics.',
      category: 'Family',
      date: 'November 28, 2024',
      readTime: '5 min read',
      slug: 'family-communication-safe-spaces',
      image: '/images/blog/family-communication.jpg',
    },
    {
      title: 'When to Seek Professional Counselling: A Guide for Parents',
      excerpt: 'Understanding the signs that your child or teen might benefit from professional support.',
      category: 'Parenting',
      date: 'November 20, 2024',
      readTime: '7 min read',
      slug: 'when-to-seek-counselling',
      image: '/images/blog/counselling.jpg',
    },
    {
      title: 'Self-Care is Not Selfish: A Message for Caregivers',
      excerpt: 'Why taking care of yourself is essential to being able to care for others effectively.',
      category: 'Self-Care',
      date: 'November 15, 2024',
      readTime: '4 min read',
      slug: 'self-care-not-selfish',
      image: '/images/blog/self-care.jpg',
    },
  ];

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-warm-cream via-off-white to-warm-sand py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="heading-xl mb-6">
            Resources & Insights
          </h1>
          <p className="body-lg">
            Practical guidance, expert insights, and thoughtful perspectives on mental health,
            teen development, and family wellbeing.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="section-container">
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
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

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <Link key={index} href={`/blog/${post.slug}`} className="block group">
              <Card className="h-full hover:shadow-calm-lg transition-all duration-300">
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
                  <p className="text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <p className="text-sm text-gray-500">
                    {post.date}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container bg-warm-cream">
        <div className="max-w-3xl mx-auto text-center">
          <SectionHeading
            title="Need Personalized Support?"
            subtitle="These resources are helpful, but sometimes you need more than information—you need someone to walk alongside you."
            centered
          />
          <div className="mt-8">
            <Link href="/book-appointment">
              <Button variant="primary">
                Book a Counselling Session
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
