import { getPostById, getFeaturedImage, extractImagesFromContent, stripHtml } from '@/lib/wordpress';
import EthereaClient from './EthereaClient';
import { notFound } from 'next/navigation';

// WordPress post ID for Etherea
const ETHEREA_POST_ID = 3236;

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default async function EthereaPage() {
  // Fetch the WordPress post
  const post = await getPostById(ETHEREA_POST_ID);

  if (!post) {
    notFound();
  }

  // Get featured image
  const featuredImage = await getFeaturedImage(post);

  // Extract images from content
  const contentImages = extractImagesFromContent(post.content.rendered);

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
          caption: featuredImage.caption?.rendered
            ? stripHtml(featuredImage.caption.rendered)
            : undefined,
        }
      : null,
    contentImages,
  };

  return <EthereaClient data={pageData} />;
}
