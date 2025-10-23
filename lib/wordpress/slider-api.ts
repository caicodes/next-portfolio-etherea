/**
 * Fullscreen Slider - WordPress API Integration (Simplified)
 *
 * Uses regular WordPress posts with:
 * - Featured Image = Background Image
 * - Title = Heading
 * - Excerpt = Subheading
 * - Optional custom fields: youtube_url, text_color, button_text, button_url
 *
 * NO PLUGINS REQUIRED!
 */

import type { SlideData } from "./slider-types";

export interface SliderConfig {
  wpUrl: string;
  postIds: number[];
  cacheTime?: number; // Cache duration in seconds (default: 300 = 5 minutes)
}

/**
 * Fetch slider posts from WordPress REST API
 *
 * @param config - Slider configuration with WP URL and post IDs
 * @returns Array of slide data
 *
 * @example
 * const slides = await fetchSliderPosts({
 *   wpUrl: 'https://your-wordpress.com',
 *   postIds: [3239, 3240, 3241]
 * });
 */
export async function fetchSliderPosts(
  config: SliderConfig
): Promise<SlideData[]> {
  const { wpUrl, postIds, cacheTime = 300 } = config;

  if (postIds.length === 0) {
    return [];
  }

  try {
    // Fetch posts by IDs using WordPress REST API
    const idsQuery = postIds.join(",");
    const url = `${wpUrl}/wp-json/wp/v2/posts?include=${idsQuery}&_embed&per_page=100`;

    const response = await fetch(url, {
      next: { revalidate: cacheTime },
    });

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.statusText}`);
    }

    const posts = await response.json();

    // Transform WordPress posts into SlideData format
    const slides: SlideData[] = posts.map((post: any, index: number) => {
      // Get featured image from _embedded media
      const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0];
      const backgroundImage = featuredMedia
        ? {
            url:
              featuredMedia.media_details?.sizes?.full?.source_url ||
              featuredMedia.source_url,
            alt: featuredMedia.alt_text || post.title.rendered,
            width: featuredMedia.media_details?.width || 1920,
            height: featuredMedia.media_details?.height || 1080,
          }
        : null;

      // Get custom fields from meta (if exposed in REST API)
      const meta = post.meta || {};
      const youtubeUrl = meta.youtube_url || "";
      const videoType = youtubeUrl ? "youtube" : "none";

      return {
        id: post.id,
        title: post.title.rendered,
        content: post.content.rendered,
        background_image: backgroundImage,
        video_type: videoType,
        youtube_url: youtubeUrl,
        local_video: null, // Can be added later if needed
        heading: post.title.rendered,
        subheading: post.excerpt.rendered.replace(/<[^>]*>/g, ""), // Strip HTML
        text_color: meta.text_color || "#ffffff",
        button_text: meta.button_text || "",
        button_url: meta.button_url || "",
        slide_order: postIds.indexOf(post.id), // Preserve order from postIds array
      };
    });

    // Sort by the original postIds order
    slides.sort((a, b) => a.slide_order - b.slide_order);

    return slides;
  } catch (error) {
    console.error("Error fetching slider posts:", error);
    return [];
  }
}

/**
 * Client-side hook for fetching slider posts
 * Use this in client components
 */
export function useSliderPosts(config: SliderConfig) {
  const [slides, setSlides] = React.useState<SlideData[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    fetchSliderPosts(config)
      .then(setSlides)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [config.wpUrl, config.postIds.join(",")]);

  return { slides, loading, error };
}

// Export for React import
import React from "react";
