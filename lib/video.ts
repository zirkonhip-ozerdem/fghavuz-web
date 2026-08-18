export type VideoSource =
  | {type: "youtube"; embedUrl: string}
  | {type: "vimeo"; embedUrl: string}
  | {type: "file"; url: string};

const YOUTUBE_PATTERN = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]+)/;
const VIMEO_PATTERN = /vimeo\.com\/(?:video\/)?(\d+)/;

export function resolveVideoSource(
  videoUrl: string | null,
  videoMedia: string | null,
): VideoSource | null {
  if (videoMedia) {
    return {type: "file", url: videoMedia};
  }

  if (!videoUrl) {
    return null;
  }

  const youtubeMatch = videoUrl.match(YOUTUBE_PATTERN);
  if (youtubeMatch) {
    return {type: "youtube", embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}`};
  }

  const vimeoMatch = videoUrl.match(VIMEO_PATTERN);
  if (vimeoMatch) {
    return {type: "vimeo", embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`};
  }

  return {type: "file", url: videoUrl};
}
