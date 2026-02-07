import { useRef, useState } from 'react';

/**
 * Converts a Cloudinary video URL to a high-quality thumbnail image URL.
 * Adds so_2 (start offset 2 seconds) and f_jpg to extract a frame, avoiding black frames.
 */
function getThumbnail(videoUrl: string): string {
  return videoUrl
    .replace(/\/upload\//, '/upload/so_2,f_jpg/')
    .replace(/\.mp4$/i, '.jpg');
}

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function VideoPlayer({ src, poster, title, className = '', style = {} }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayOverlay, setShowPlayOverlay] = useState(true);
  const thumbnail = poster ?? getThumbnail(src);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setShowPlayOverlay(true);
    } else {
      videoRef.current.play();
      setShowPlayOverlay(false);
    }
    setIsPlaying(!isPlaying);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowPlayOverlay(true);
  };

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        cursor: 'pointer',
        overflow: 'hidden',
        background: 'var(--color-bg-secondary)',
        ...style // Allow overrides
      }}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        poster={thumbnail}
        preload="metadata"
        playsInline
        muted={false}
        loop={false}
        onEnded={handleVideoEnded}
        style={{
          width: '100%',
          height: '100%', // Fill container
          objectFit: 'cover', // Pivot for vertical/square videos
          display: 'block',
          verticalAlign: 'top',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          opacity: showPlayOverlay ? 1 : 0,
          transition: 'opacity var(--transition-hover)',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
          aria-hidden
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ marginLeft: 4 }}
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      {title && (
        <span className="sr-only">{title}</span>
      )}
    </div>
  );
}

export { getThumbnail };
