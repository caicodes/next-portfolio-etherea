// WordPress REST API utilities
const WP_API_URL = 'https://portfolio.caitoy.com/wp-json/wp/v2';

// TypeScript interfaces for WordPress data
export interface WordPressPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
    protected: boolean;
  };
  excerpt: {
    rendered: string;
    protected: boolean;
  };
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: WordPressMedia[];
    'wp:term'?: WordPressTerm[][];
  };
}

export interface WordPressMedia {
  id: number;
  date: string;
  slug: string;
  type: string;
  link: string;
  title: {
    rendered: string;
  };
  caption: {
    rendered: string;
  };
  alt_text: string;
  media_type: string;
  mime_type: string;
  media_details: {
    width: number;
    height: number;
    file: string;
    sizes: {
      [key: string]: {
        file: string;
        width: number;
        height: number;
        mime_type: string;
        source_url: string;
      };
    };
  };
  source_url: string;
}

export interface WordPressTerm {
  id: number;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface WordPressCategory {
  id: number;
  count: number;
  description: string;
  link: string;
  name: string;
  slug: string;
  taxonomy: string;
  parent: number;
}

/**
 * Fetch a single post by ID with embedded media and terms
 */
export async function getPostById(postId: number): Promise<WordPressPost | null> {
  try {
    const response = await fetch(
      `${WP_API_URL}/posts/${postId}?_embed`,
      {
        next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch post ${postId}: ${response.statusText}`);
    }

    const post: WordPressPost = await response.json();
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

/**
 * Fetch posts by category ID
 */
export async function getPostsByCategory(categoryId: number): Promise<WordPressPost[]> {
  try {
    const response = await fetch(
      `${WP_API_URL}/posts?categories=${categoryId}&_embed`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch posts for category ${categoryId}`);
    }

    const posts: WordPressPost[] = await response.json();
    return posts;
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

/**
 * Fetch a specific media item by ID
 */
export async function getMediaById(mediaId: number): Promise<WordPressMedia | null> {
  try {
    const response = await fetch(
      `${WP_API_URL}/media/${mediaId}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch media ${mediaId}`);
    }

    const media: WordPressMedia = await response.json();
    return media;
  } catch (error) {
    console.error('Error fetching media:', error);
    return null;
  }
}

/**
 * Fetch category by ID
 */
export async function getCategoryById(categoryId: number): Promise<WordPressCategory | null> {
  try {
    const response = await fetch(
      `${WP_API_URL}/categories/${categoryId}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch category ${categoryId}`);
    }

    const category: WordPressCategory = await response.json();
    return category;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

/**
 * Extract featured image from embedded data or fetch separately
 */
export async function getFeaturedImage(post: WordPressPost): Promise<WordPressMedia | null> {
  // Try to get from embedded data first
  if (post._embedded?.['wp:featuredmedia']?.[0]) {
    return post._embedded['wp:featuredmedia'][0];
  }

  // Fallback: fetch separately if not embedded
  if (post.featured_media) {
    return await getMediaById(post.featured_media);
  }

  return null;
}

/**
 * Get the best image size for a given width
 */
export function getBestImageSize(
  media: WordPressMedia,
  targetWidth: number
): { url: string; width: number; height: number } {
  const sizes = media.media_details?.sizes || {};
  const availableSizes = Object.entries(sizes);

  // Find the smallest size that's larger than target width
  let bestSize = availableSizes
    .filter(([_, size]) => size.width >= targetWidth)
    .sort((a, b) => a[1].width - b[1].width)[0];

  // If no size is large enough, use the largest available
  if (!bestSize) {
    bestSize = availableSizes.sort((a, b) => b[1].width - a[1].width)[0];
  }

  if (bestSize) {
    return {
      url: bestSize[1].source_url,
      width: bestSize[1].width,
      height: bestSize[1].height,
    };
  }

  // Fallback to source URL
  return {
    url: media.source_url,
    width: media.media_details?.width || 0,
    height: media.media_details?.height || 0,
  };
}

/**
 * Strip HTML tags from content (useful for excerpts)
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Extract images from post content HTML
 */
export function extractImagesFromContent(content: string): Array<{
  url: string;
  alt: string;
  caption?: string;
}> {
  const images: Array<{ url: string; alt: string; caption?: string }> = [];

  // Match WordPress image blocks and figure elements
  const figureRegex = /<figure[^>]*class="[^"]*wp-block-image[^"]*"[^>]*>([\s\S]*?)<\/figure>/gi;
  const figures = content.match(figureRegex) || [];

  figures.forEach((figure) => {
    const imgMatch = figure.match(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/i);
    const captionMatch = figure.match(/<figcaption[^>]*>([\s\S]*?)<\/figcaption>/i);

    if (imgMatch) {
      images.push({
        url: imgMatch[1],
        alt: imgMatch[2] || '',
        caption: captionMatch ? stripHtml(captionMatch[1]) : undefined,
      });
    }
  });

  return images;
}
