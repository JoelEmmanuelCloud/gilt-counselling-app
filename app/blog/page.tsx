import React from 'react';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import BlogFilter from './BlogFilter';
import { blogPosts } from '@/lib/blogPosts';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-off-white">

      <section className="panel-gold py-14 sm:py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow mb-4">Resources</p>
          <h1 className="heading-xl max-w-3xl mb-6">
            Resources & Insights
          </h1>
          <p className="body-lg max-w-2xl text-gray-900/85">
            Practical guidance, expert insights, and thoughtful perspectives on mental health,
            teen development, and family wellbeing.
          </p>
        </div>
      </section>

      <section className="section-container">
        <BlogFilter posts={blogPosts} />
      </section>

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
