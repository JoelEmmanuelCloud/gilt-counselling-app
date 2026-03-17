import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { blogPosts, getBlogPost } from '@/lib/blogPosts';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Gilt Counselling Consult`,
      description: post.excerpt,
      url: `https://giltcounselling.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image
        ? [{ url: post.image, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug) ?? {
    slug,
    title: 'Post Not Found',
    excerpt: '',
    content: '<p>This blog post is coming soon. Check back later for more resources and insights.</p>',
    category: 'General',
    date: 'Coming Soon',
    readTime: '— min read',
    author: 'Gilt Counselling Team',
    image: '',
  };

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

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

      {/* Header Image */}
      {post.image && (
        <section className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden mb-12">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
                quality={60}
                priority
              />
            </div>
          </div>
        </section>
      )}

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
              If you&apos;re navigating challenges and could use professional guidance, we&apos;re here to help.
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
