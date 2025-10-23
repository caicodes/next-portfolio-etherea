# Fullscreen Slider - WordPress Post Type Setup

## Custom Post Type: `slide`

### Registration Code (functions.php)

```php
function register_slider_post_type() {
    register_post_type('slide', [
        'labels' => [
            'name' => 'Slides',
            'singular_name' => 'Slide',
        ],
        'public' => true,
        'has_archive' => false,
        'show_in_rest' => true, // Required for REST API
        'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
        'menu_icon' => 'dashicons-slides',
    ]);
}
add_action('init', 'register_slider_post_type');
```

## Native WordPress Custom Fields (No Plugins Required!)

### Register Post Meta (functions.php)

```php
function register_slide_meta_fields() {
    // Background Image ID
    register_post_meta('slide', 'background_image_id', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'integer',
        'default' => 0,
    ]);

    // Video Type
    register_post_meta('slide', 'video_type', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'default' => 'none',
    ]);

    // YouTube URL
    register_post_meta('slide', 'youtube_url', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'default' => '',
    ]);

    // Local Video ID
    register_post_meta('slide', 'local_video_id', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'integer',
        'default' => 0,
    ]);

    // Heading
    register_post_meta('slide', 'heading', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'default' => '',
    ]);

    // Subheading
    register_post_meta('slide', 'subheading', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'default' => '',
    ]);

    // Text Color
    register_post_meta('slide', 'text_color', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'default' => '#ffffff',
    ]);

    // Button Text
    register_post_meta('slide', 'button_text', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'default' => '',
    ]);

    // Button URL
    register_post_meta('slide', 'button_url', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'string',
        'default' => '',
    ]);

    // Slide Order
    register_post_meta('slide', 'slide_order', [
        'show_in_rest' => true,
        'single' => true,
        'type' => 'integer',
        'default' => 0,
    ]);
}
add_action('init', 'register_slide_meta_fields');
```

### Custom Meta Box UI (functions.php)

```php
function add_slide_meta_boxes() {
    add_meta_box(
        'slide_settings',
        'Slide Settings',
        'render_slide_meta_box',
        'slide',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'add_slide_meta_boxes');

function render_slide_meta_box($post) {
    wp_nonce_field('slide_meta_box', 'slide_meta_box_nonce');

    $video_type = get_post_meta($post->ID, 'video_type', true) ?: 'none';
    $youtube_url = get_post_meta($post->ID, 'youtube_url', true);
    $bg_image_id = get_post_meta($post->ID, 'background_image_id', true);
    $local_video_id = get_post_meta($post->ID, 'local_video_id', true);
    $heading = get_post_meta($post->ID, 'heading', true);
    $subheading = get_post_meta($post->ID, 'subheading', true);
    $text_color = get_post_meta($post->ID, 'text_color', true) ?: '#ffffff';
    $button_text = get_post_meta($post->ID, 'button_text', true);
    $button_url = get_post_meta($post->ID, 'button_url', true);
    $slide_order = get_post_meta($post->ID, 'slide_order', true) ?: 0;

    ?>
    <style>
        .slide-meta-field { margin-bottom: 20px; }
        .slide-meta-field label { display: block; font-weight: 600; margin-bottom: 5px; }
        .slide-meta-field input[type="text"],
        .slide-meta-field input[type="url"],
        .slide-meta-field input[type="number"],
        .slide-meta-field textarea,
        .slide-meta-field select { width: 100%; }
        .slide-meta-field textarea { height: 60px; }
        .media-button { margin-top: 5px; }
    </style>

    <div class="slide-meta-field">
        <label>Heading</label>
        <input type="text" name="heading" value="<?php echo esc_attr($heading); ?>" />
    </div>

    <div class="slide-meta-field">
        <label>Subheading</label>
        <textarea name="subheading"><?php echo esc_textarea($subheading); ?></textarea>
    </div>

    <div class="slide-meta-field">
        <label>Text Color</label>
        <input type="color" name="text_color" value="<?php echo esc_attr($text_color); ?>" />
    </div>

    <div class="slide-meta-field">
        <label>Background Image</label>
        <input type="hidden" id="background_image_id" name="background_image_id" value="<?php echo esc_attr($bg_image_id); ?>" />
        <button type="button" class="button media-button" id="upload_background_image">Select Background Image</button>
        <div id="background_image_preview"></div>
    </div>

    <div class="slide-meta-field">
        <label>Video Background Type</label>
        <select name="video_type" id="video_type">
            <option value="none" <?php selected($video_type, 'none'); ?>>None</option>
            <option value="youtube" <?php selected($video_type, 'youtube'); ?>>YouTube</option>
            <option value="local" <?php selected($video_type, 'local'); ?>>Local Video</option>
        </select>
    </div>

    <div class="slide-meta-field" id="youtube_url_field" style="display: <?php echo $video_type === 'youtube' ? 'block' : 'none'; ?>;">
        <label>YouTube URL</label>
        <input type="url" name="youtube_url" value="<?php echo esc_attr($youtube_url); ?>" placeholder="https://www.youtube.com/watch?v=..." />
    </div>

    <div class="slide-meta-field" id="local_video_field" style="display: <?php echo $video_type === 'local' ? 'block' : 'none'; ?>;">
        <label>Local Video</label>
        <input type="hidden" id="local_video_id" name="local_video_id" value="<?php echo esc_attr($local_video_id); ?>" />
        <button type="button" class="button media-button" id="upload_local_video">Select Video File</button>
        <div id="local_video_preview"></div>
    </div>

    <div class="slide-meta-field">
        <label>Button Text</label>
        <input type="text" name="button_text" value="<?php echo esc_attr($button_text); ?>" />
    </div>

    <div class="slide-meta-field">
        <label>Button URL</label>
        <input type="url" name="button_url" value="<?php echo esc_attr($button_url); ?>" />
    </div>

    <div class="slide-meta-field">
        <label>Slide Order</label>
        <input type="number" name="slide_order" value="<?php echo esc_attr($slide_order); ?>" />
    </div>

    <script>
    jQuery(document).ready(function($) {
        // Video type toggle
        $('#video_type').on('change', function() {
            const type = $(this).val();
            $('#youtube_url_field').toggle(type === 'youtube');
            $('#local_video_field').toggle(type === 'local');
        });

        // Media uploader for background image
        $('#upload_background_image').on('click', function(e) {
            e.preventDefault();
            const frame = wp.media({
                title: 'Select Background Image',
                multiple: false,
                library: { type: 'image' }
            });
            frame.on('select', function() {
                const attachment = frame.state().get('selection').first().toJSON();
                $('#background_image_id').val(attachment.id);
                $('#background_image_preview').html('<img src="' + attachment.url + '" style="max-width: 200px; margin-top: 10px;" />');
            });
            frame.open();
        });

        // Media uploader for local video
        $('#upload_local_video').on('click', function(e) {
            e.preventDefault();
            const frame = wp.media({
                title: 'Select Video File',
                multiple: false,
                library: { type: 'video' }
            });
            frame.on('select', function() {
                const attachment = frame.state().get('selection').first().toJSON();
                $('#local_video_id').val(attachment.id);
                $('#local_video_preview').html('<p>Video selected: ' + attachment.filename + '</p>');
            });
            frame.open();
        });

        // Show existing images
        <?php if ($bg_image_id): ?>
        const bgImgUrl = '<?php echo wp_get_attachment_image_url($bg_image_id, 'medium'); ?>';
        if (bgImgUrl) {
            $('#background_image_preview').html('<img src="' + bgImgUrl + '" style="max-width: 200px; margin-top: 10px;" />');
        }
        <?php endif; ?>

        <?php if ($local_video_id): ?>
        const videoFilename = '<?php echo basename(get_attached_file($local_video_id)); ?>';
        if (videoFilename) {
            $('#local_video_preview').html('<p>Video selected: ' + videoFilename + '</p>');
        }
        <?php endif; ?>
    });
    </script>
    <?php
}

function save_slide_meta_box($post_id) {
    if (!isset($_POST['slide_meta_box_nonce']) || !wp_verify_nonce($_POST['slide_meta_box_nonce'], 'slide_meta_box')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $fields = ['background_image_id', 'video_type', 'youtube_url', 'local_video_id',
               'heading', 'subheading', 'text_color', 'button_text', 'button_url', 'slide_order'];

    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, $field, sanitize_text_field($_POST[$field]));
        }
    }
}
add_action('save_post_slide', 'save_slide_meta_box');
```

## REST API Endpoint

### Custom Endpoint (functions.php)

```php
// Custom endpoint for slider data with all meta fields
add_action('rest_api_init', function() {
    register_rest_route('portfolio/v1', '/slider-slides', [
        'methods' => 'GET',
        'callback' => function() {
            $slides = get_posts([
                'post_type' => 'slide',
                'posts_per_page' => -1,
                'orderby' => 'meta_value_num',
                'meta_key' => 'slide_order',
                'order' => 'ASC',
            ]);

            return array_map(function($slide) {
                $bg_image_id = get_post_meta($slide->ID, 'background_image_id', true);
                $local_video_id = get_post_meta($slide->ID, 'local_video_id', true);

                // Get background image data
                $background_image = null;
                if ($bg_image_id) {
                    $img_url = wp_get_attachment_image_url($bg_image_id, 'full');
                    $img_meta = wp_get_attachment_metadata($bg_image_id);
                    if ($img_url) {
                        $background_image = [
                            'url' => $img_url,
                            'alt' => get_post_meta($bg_image_id, '_wp_attachment_image_alt', true),
                            'width' => $img_meta['width'] ?? 0,
                            'height' => $img_meta['height'] ?? 0,
                        ];
                    }
                }

                // Get local video data
                $local_video = null;
                if ($local_video_id) {
                    $video_url = wp_get_attachment_url($local_video_id);
                    if ($video_url) {
                        $local_video = [
                            'url' => $video_url,
                            'mime_type' => get_post_mime_type($local_video_id),
                        ];
                    }
                }

                return [
                    'id' => $slide->ID,
                    'title' => $slide->post_title,
                    'content' => $slide->post_content,
                    'background_image' => $background_image,
                    'video_type' => get_post_meta($slide->ID, 'video_type', true) ?: 'none',
                    'youtube_url' => get_post_meta($slide->ID, 'youtube_url', true) ?: '',
                    'local_video' => $local_video,
                    'heading' => get_post_meta($slide->ID, 'heading', true) ?: '',
                    'subheading' => get_post_meta($slide->ID, 'subheading', true) ?: '',
                    'text_color' => get_post_meta($slide->ID, 'text_color', true) ?: '#ffffff',
                    'button_text' => get_post_meta($slide->ID, 'button_text', true) ?: '',
                    'button_url' => get_post_meta($slide->ID, 'button_url', true) ?: '',
                    'slide_order' => (int) get_post_meta($slide->ID, 'slide_order', true),
                ];
            }, $slides);
        },
        'permission_callback' => '__return_true',
    ]);
});
```

## Sample Data Structure (TypeScript)

```typescript
interface SlideData {
  id: number;
  title: string;
  content: string;
  background_image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  } | null;
  video_type: 'none' | 'youtube' | 'local';
  youtube_url: string;
  local_video: {
    url: string;
    mime_type: string;
  } | null;
  heading: string;
  subheading: string;
  text_color: string;
  button_text: string;
  button_url: string;
  slide_order: number;
}
```

## Usage Example

Fetch slides from WordPress:
```bash
GET https://your-wordpress-site.com/wp-json/portfolio/v1/slider-slides
```

Response:
```json
[
  {
    "id": 123,
    "title": "Slide 1",
    "heading": "Welcome to Our Portfolio",
    "subheading": "Discover amazing work",
    "background_image": {
      "url": "https://example.com/wp-content/uploads/slide-1.jpg",
      "alt": "Slide 1 background"
    },
    "video_type": "none",
    "text_color": "#ffffff",
    "button_text": "Learn More",
    "button_url": "/about",
    "slide_order": 1
  }
]
```
