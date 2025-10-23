# Fullscreen Slider - WordPress Setup (100% Native!)

## No Plugins Required! 🎉

This slider uses **only native WordPress features**:
- Regular Posts
- Featured Images
- Excerpts
- Custom Fields (post meta)

## WordPress Setup (functions.php)

Add this code to your theme's `functions.php`:

```php
<?php
/**
 * Fullscreen Slider - Native WordPress Setup
 *
 * Expose custom fields in REST API for slider functionality
 */

// Register post meta fields for REST API
function register_slider_meta_fields() {
    // YouTube Video URL
    register_post_meta('post', 'youtube_url', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
    ]);

    // Text Color
    register_post_meta('post', 'text_color', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'default' => '#ffffff',
        'sanitize_callback' => 'sanitize_hex_color',
    ]);

    // Button Text
    register_post_meta('post', 'button_text', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ]);

    // Button URL
    register_post_meta('post', 'button_url', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'default' => '',
        'sanitize_callback' => 'esc_url_raw',
    ]);
}
add_action('init', 'register_slider_meta_fields');

// Optional: Add simple meta box UI
function add_slider_meta_box() {
    add_meta_box(
        'slider_settings',
        'Slider Settings',
        'render_slider_meta_box',
        'post',
        'side',
        'default'
    );
}
add_action('add_meta_boxes', 'add_slider_meta_box');

function render_slider_meta_box($post) {
    wp_nonce_field('slider_meta_nonce', 'slider_meta_nonce');

    $youtube_url = get_post_meta($post->ID, 'youtube_url', true);
    $text_color = get_post_meta($post->ID, 'text_color', true) ?: '#ffffff';
    $button_text = get_post_meta($post->ID, 'button_text', true);
    $button_url = get_post_meta($post->ID, 'button_url', true);
    ?>
    <p>
        <label><strong>YouTube URL:</strong></label><br>
        <input type="url" name="youtube_url" value="<?php echo esc_attr($youtube_url); ?>" class="widefat" placeholder="https://youtube.com/watch?v=...">
        <small>Leave empty to use featured image only</small>
    </p>
    <p>
        <label><strong>Text Color:</strong></label><br>
        <input type="color" name="text_color" value="<?php echo esc_attr($text_color); ?>">
    </p>
    <p>
        <label><strong>Button Text:</strong></label><br>
        <input type="text" name="button_text" value="<?php echo esc_attr($button_text); ?>" class="widefat" placeholder="Learn More">
    </p>
    <p>
        <label><strong>Button URL:</strong></label><br>
        <input type="url" name="button_url" value="<?php echo esc_attr($button_url); ?>" class="widefat" placeholder="/about">
    </p>
    <?php
}

function save_slider_meta_box($post_id) {
    if (!isset($_POST['slider_meta_nonce']) || !wp_verify_nonce($_POST['slider_meta_nonce'], 'slider_meta_nonce')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    if (isset($_POST['youtube_url'])) {
        update_post_meta($post_id, 'youtube_url', esc_url_raw($_POST['youtube_url']));
    }

    if (isset($_POST['text_color'])) {
        update_post_meta($post_id, 'text_color', sanitize_hex_color($_POST['text_color']));
    }

    if (isset($_POST['button_text'])) {
        update_post_meta($post_id, 'button_text', sanitize_text_field($_POST['button_text']));
    }

    if (isset($_POST['button_url'])) {
        update_post_meta($post_id, 'button_url', esc_url_raw($_POST['button_url']));
    }
}
add_action('save_post', 'save_slider_meta_box');
?>
```

## Creating Slider Posts in WordPress

### 1. Create a New Post

1. Go to **Posts** → **Add New**
2. Set the **title** (this becomes the slide heading)
3. Set the **excerpt** (this becomes the subheading)
4. Set the **featured image** (this becomes the background)

### 2. Configure Slider Settings (Sidebar)

In the "Slider Settings" meta box:

- **YouTube URL**: (Optional) Add YouTube video URL for video background
- **Text Color**: Choose text color (default: white)
- **Button Text**: (Optional) CTA button text
- **Button URL**: (Optional) CTA button link

### 3. Get the Post ID

After publishing, note the post ID from the URL:
```
https://your-site.com/wp-admin/post.php?post=3239&action=edit
                                             ^^^^
```

## Usage in Next.js

### Server Component (Recommended):

```typescript
// app/slider-demo/page.tsx
import FullscreenSlider from "@/components/FullscreenSlider";
import { fetchSliderPosts } from "@/lib/wordpress/slider-api";

export default async function SliderPage() {
  const slides = await fetchSliderPosts({
    wpUrl: "https://portfolio.caitoy.com",
    postIds: [3239, 3240, 3241], // Your post IDs in order
    cacheTime: 300, // Cache for 5 minutes
  });

  return <FullscreenSlider slides={slides} />;
}
```

### Client Component:

```typescript
"use client";

import FullscreenSlider from "@/components/FullscreenSlider";
import { useSliderPosts } from "@/lib/wordpress/slider-api";

export default function SliderPageClient() {
  const { slides, loading, error } = useSliderPosts({
    wpUrl: "https://portfolio.caitoy.com",
    postIds: [3239, 3240, 3241],
  });

  if (loading) return <div>Loading slides...</div>;
  if (error) return <div>Error loading slides</div>;

  return <FullscreenSlider slides={slides} />;
}
```

## Example Post Setup

**Post #1: "Welcome"**
- Title: `Welcome to Our Portfolio`
- Excerpt: `Discover stunning design and development work`
- Featured Image: `hero-background.jpg`
- Slider Settings:
  - YouTube URL: (empty - use image only)
  - Text Color: `#ffffff`
  - Button Text: `View Projects`
  - Button URL: `/work`

**Post #2: "About Us"**
- Title: `Creative Design Studio`
- Excerpt: `Crafting digital experiences since 2020`
- Featured Image: `office-photo.jpg`
- Slider Settings:
  - YouTube URL: `https://youtube.com/watch?v=dQw4w9WgXcQ`
  - Text Color: `#ffffff`
  - Button Text: `Learn More`
  - Button URL: `/about`

**Post #3: "Contact"**
- Title: `Let's Work Together`
- Excerpt: `Ready to bring your ideas to life?`
- Featured Image: `contact-background.jpg`
- Slider Settings:
  - YouTube URL: (empty)
  - Text Color: `#000000` (dark text for light background)
  - Button Text: `Get in Touch`
  - Button URL: `/contact`

## REST API Response Example

Fetching `https://your-site.com/wp-json/wp/v2/posts?include=3239&_embed`:

```json
[
  {
    "id": 3239,
    "title": {
      "rendered": "Welcome to Our Portfolio"
    },
    "excerpt": {
      "rendered": "<p>Discover stunning design and development work</p>"
    },
    "meta": {
      "youtube_url": "",
      "text_color": "#ffffff",
      "button_text": "View Projects",
      "button_url": "/work"
    },
    "_embedded": {
      "wp:featuredmedia": [
        {
          "source_url": "https://example.com/wp-content/uploads/hero.jpg",
          "alt_text": "Hero background",
          "media_details": {
            "width": 1920,
            "height": 1080
          }
        }
      ]
    }
  }
]
```

## Benefits of This Approach

✅ **No plugins required** - 100% native WordPress
✅ **Simple content management** - Just create regular posts
✅ **Built-in media library** - Use WordPress's media uploader
✅ **Flexible** - Easy to extend with more fields
✅ **Performance** - Lightweight, no plugin overhead
✅ **Modern** - Uses WordPress REST API
✅ **Type-safe** - Full TypeScript support
