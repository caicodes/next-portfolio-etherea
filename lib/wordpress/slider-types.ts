/**
 * Fullscreen Slider - TypeScript Types
 *
 * Data structure for WordPress slider posts
 */

export interface SlideImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface SlideVideo {
  url: string;
  mime_type: string;
}

export type VideoType = 'none' | 'youtube' | 'local';

export interface SlideData {
  id: number;
  title: string;
  content: string;
  background_image: SlideImage | null;
  video_type: VideoType;
  youtube_url: string;
  local_video: SlideVideo | null;
  heading: string;
  subheading: string;
  text_color: string;
  button_text: string;
  button_url: string;
  slide_order: number;
}

export interface FullscreenSliderProps {
  slides: SlideData[];
  className?: string;
}

export interface SlidePanelProps {
  slide: SlideData;
  index: number;
  total: number;
}
