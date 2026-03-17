import React from 'react';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import BlogFilter from './BlogFilter';
import { blogPosts } from '@/lib/blogPosts';

export default function BlogPage() {
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

      {/* Posts */}
      <section className="section-container">
        <BlogFilter posts={blogPosts} />
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
