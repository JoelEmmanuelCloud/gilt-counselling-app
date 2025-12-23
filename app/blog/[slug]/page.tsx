'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Sample blog post data (in a real app, this would come from a CMS or database)
  const blogPosts: Record<string, any> = {
    'understanding-teen-anxiety': {
      title: 'Understanding Teen Anxiety: Signs and Support Strategies',
      category: 'Teen Development',
      date: 'December 15, 2024',
      readTime: '5 min read',
      author: 'Dr. Sarah Johnson',
      content: `
        <p class="body-lg mb-6">Anxiety in teenagers is more common than many parents realize. The teenage years bring significant changes—physical, emotional, and social—that can trigger feelings of worry and stress.</p>

        <h2 class="heading-sm mt-8 mb-4">Recognizing the Signs</h2>
        <p class="body-md mb-4">Teen anxiety can manifest in various ways:</p>
        <ul class="list-disc list-inside space-y-2 mb-6 text-gray-700">
          <li>Excessive worry about school, friendships, or the future</li>
          <li>Physical symptoms like headaches, stomach aches, or fatigue</li>
          <li>Avoidance of social situations or activities they once enjoyed</li>
          <li>Difficulty concentrating or sleeping</li>
          <li>Irritability or mood swings</li>
        </ul>

        <h2 class="heading-sm mt-8 mb-4">How to Provide Support</h2>
        <p class="body-md mb-4">As a parent or caregiver, you can make a significant difference:</p>

        <h3 class="font-heading font-semibold text-lg mt-6 mb-3">1. Create a Safe Space for Conversation</h3>
        <p class="body-md mb-4">Let your teen know that it's okay to talk about their worries without fear of judgment. Sometimes just listening without trying to "fix" everything can be incredibly powerful.</p>

        <h3 class="font-heading font-semibold text-lg mt-6 mb-3">2. Validate Their Feelings</h3>
        <p class="body-md mb-4">Avoid dismissing their concerns as "just teenage drama." Their feelings are real and deserve to be acknowledged, even if the situation seems minor from an adult perspective.</p>

        <h3 class="font-heading font-semibold text-lg mt-6 mb-3">3. Encourage Healthy Coping Strategies</h3>
        <p class="body-md mb-4">Help them discover what works for them—whether it's exercise, creative expression, journaling, or spending time in nature. Different strategies work for different people.</p>

        <h3 class="font-heading font-semibold text-lg mt-6 mb-3">4. Model Good Self-Care</h3>
        <p class="body-md mb-4">Teens learn by watching. Show them how you manage your own stress in healthy ways.</p>

        <h3 class="font-heading font-semibold text-lg mt-6 mb-3">5. Know When to Seek Professional Help</h3>
        <p class="body-md mb-6">If anxiety is interfering with daily life, school performance, or relationships, it may be time to consult a professional counselor who specializes in adolescent mental health.</p>

        <h2 class="heading-sm mt-8 mb-4">You're Not Alone</h2>
        <p class="body-md mb-4">Many families navigate teen anxiety, and support is available. Professional counseling can provide your teen with tools to manage anxiety effectively and build resilience for the future.</p>

        <p class="body-md">Remember: seeking help is a sign of strength, not weakness. It shows your teen that taking care of mental health is just as important as physical health.</p>
      `,
    },
    'support-mental-health-daily': {
      title: '5 Ways to Support Your Mental Health Daily',
      category: 'Mental Health',
      date: 'December 10, 2024',
      readTime: '4 min read',
      author: 'Dr. Michael Chen',
      content: `
        <p class="body-lg mb-6">Mental health isn't just about addressing problems when they arise—it's about building daily practices that strengthen your emotional resilience and wellbeing.</p>

        <h2 class="heading-sm mt-8 mb-4">1. Start with Morning Intentions</h2>
        <p class="body-md mb-6">Before checking your phone or diving into the day's demands, take five minutes to set an intention. What do you want to bring to today? How do you want to show up for yourself and others?</p>

        <h2 class="heading-sm mt-8 mb-4">2. Move Your Body</h2>
        <p class="body-md mb-6">Physical activity isn't just good for your body—it's essential for mental health. Even a 10-minute walk can shift your mood and clear your mind. Find movement that feels good to you, not punishing.</p>

        <h2 class="heading-sm mt-8 mb-4">3. Practice Gratitude</h2>
        <p class="body-md mb-6">Taking a moment each day to acknowledge what you're grateful for can shift your perspective and reduce stress. Write down three things, share them with someone, or simply pause to appreciate them.</p>

        <h2 class="heading-sm mt-8 mb-4">4. Set Boundaries with Technology</h2>
        <p class="body-md mb-6">Constant connectivity can be exhausting. Designate tech-free times, especially before bed. Your mental space needs protection from the endless scroll of information and comparison.</p>

        <h2 class="heading-sm mt-8 mb-4">5. Connect with Others</h2>
        <p class="body-md mb-6">Meaningful connection is vital for mental health. Reach out to someone you care about—a quick text, a phone call, or meeting for coffee. We're not meant to navigate life alone.</p>

        <p class="body-md mt-8">These practices won't eliminate life's challenges, but they can help you face them from a place of greater strength and stability. Start small—even one of these practices can make a difference.</p>
      `,
    },
    'building-resilience-young-people': {
      title: 'Building Resilience in Young People',
      category: 'Teen Development',
      date: 'December 5, 2024',
      readTime: '6 min read',
      author: 'Dr. Sarah Johnson',
      content: `
        <p class="body-lg mb-6">Resilience—the ability to bounce back from setbacks—isn't something you either have or don't have. It's a skill that can be learned and strengthened over time.</p>

        <h2 class="heading-sm mt-8 mb-4">What is Resilience?</h2>
        <p class="body-md mb-6">Resilience doesn't mean avoiding difficulties or never feeling overwhelmed. It means developing the inner resources to navigate challenges, learn from them, and emerge stronger.</p>

        <h2 class="heading-sm mt-8 mb-4">How to Foster Resilience</h2>

        <h3 class="font-heading font-semibold text-lg mt-6 mb-3">Encourage Problem-Solving</h3>
        <p class="body-md mb-4">When young people face challenges, resist the urge to immediately solve the problem for them. Instead, guide them through the process of finding solutions themselves.</p>

        <h3 class="font-heading font-semibold text-lg mt-6 mb-3">Normalize Failure</h3>
        <p class="body-md mb-4">Reframe mistakes as learning opportunities rather than disasters. Share your own experiences of failure and what you learned from them.</p>

        <h3 class="font-heading font-semibold text-lg mt-6 mb-3">Build Strong Relationships</h3>
        <p class="body-md mb-4">Having supportive relationships is one of the most important factors in resilience. Help young people develop healthy friendships and maintain family connections.</p>

        <h3 class="font-heading font-semibold text-lg mt-6 mb-3">Teach Emotional Awareness</h3>
        <p class="body-md mb-4">Help them identify and name their emotions. Understanding what they're feeling is the first step to managing it effectively.</p>

        <h3 class="font-heading font-semibold text-lg mt-6 mb-3">Celebrate Effort, Not Just Outcomes</h3>
        <p class="body-md mb-6">Praise the process—the hard work, persistence, and courage—not just the end result. This builds a growth mindset.</p>

        <p class="body-md mt-8">Building resilience takes time and practice. Be patient with the process, and remember that every challenge overcome is an opportunity for growth.</p>
      `,
    },
  };

  const post = blogPosts[slug] || {
    title: 'Post Not Found',
    content: '<p>This blog post is coming soon. Check back later for more resources and insights.</p>',
    category: 'General',
    date: 'Coming Soon',
    readTime: '— min read',
    author: 'Gilt Counselling Team',
  };

  const relatedPosts = Object.entries(blogPosts)
    .filter(([postSlug]) => postSlug !== slug)
    .slice(0, 3)
    .map(([postSlug, postData]) => ({ slug: postSlug, ...postData }));

  return (
    <div className="min-h-screen bg-off-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-warm-cream via-off-white to-warm-sand py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link href="/blog" className="text-soft-gold hover:text-muted-coral transition-colors duration-200 font-medium">
              ← Back to Resources
            </Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="px-3 py-1 bg-soft-gold text-white rounded-full text-xs font-medium">
                {post.category}
              </span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
            <h1 className="heading-xl">{post.title}</h1>
            <p className="text-gray-600">By {post.author}</p>
          </div>
        </div>
      </section>

      {/* Optional Header Image */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <ImagePlaceholder
            description={`Header Image: ${post.title}`}
            dimensions="400px"
            usageNotes="Optional: Use nature, light, abstract, or workspace visuals that relate to the topic."
            className="mb-12"
          />
        </div>
      </section>

      {/* Article Content */}
      <article className="section-container">
        <div className="max-w-3xl mx-auto">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* CTA */}
      <section className="section-container bg-warm-cream">
        <div className="max-w-3xl mx-auto text-center">
          <Card className="bg-white">
            <h3 className="heading-sm mb-4">Need More Support?</h3>
            <p className="body-md mb-6">
              If you're navigating challenges and could use professional guidance, we're here to help.
            </p>
            <Link href="/book-appointment">
              <Button variant="primary">Book a Counselling Session</Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-container bg-off-white">
          <div className="max-w-6xl mx-auto">
            <h3 className="heading-md mb-8 text-center">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="block group">
                  <Card className="h-full hover:shadow-calm-lg transition-all duration-300">
                    <div className="space-y-3">
                      <span className="px-3 py-1 bg-warm-sand rounded-full text-xs font-medium inline-block">
                        {relatedPost.category}
                      </span>
                      <h4 className="font-heading font-semibold text-lg group-hover:text-soft-gold transition-colors duration-200">
                        {relatedPost.title}
                      </h4>
                      <p className="text-sm text-gray-600">{relatedPost.readTime}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
