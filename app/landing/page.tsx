import { getPostById, getFeaturedImage, stripHtml } from '@/lib/wordpress';
import LandingClient from './LandingClient';
import { notFound } from 'next/navigation';

// WordPress post ID for Landing page
const LANDING_POST_ID = 3239;

export const revalidate = 60; // ISR: revalidate every 60 seconds

export const metadata = {
  title: "Landing | Portfolio",
  description: "WordPress-powered landing page with GSAP animations",
};

export default async function LandingPage() {
  // Fetch the WordPress post
  const post = await getPostById(LANDING_POST_ID);

  if (!post) {
    notFound();
  }

  // Get featured image
  const featuredImage = await getFeaturedImage(post);

  // Prepare data for client component
  const pageData = {
    title: post.title.rendered,
    excerpt: stripHtml(post.excerpt.rendered),
    content: post.content.rendered,
    featuredImage: featuredImage
      ? {
          url: featuredImage.source_url,
          alt: featuredImage.alt_text || post.title.rendered,
          width: featuredImage.media_details?.width || 1920,
          height: featuredImage.media_details?.height || 1080,
        }
      : undefined,
  };

  return <LandingClient data={pageData} />;
}
