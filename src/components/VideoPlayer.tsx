import { useRef, useState, useEffect } from 'react';

/**
 * Converts a Cloudinary video URL to a high-quality thumbnail image URL.
 * Adds so_2 (start offset 2 seconds) and f_jpg to extract a frame, avoiding black frames.
 */
function getThumbnail(videoUrl: string): string {
  return videoUrl
    .replace(/\/upload\//, '/upload/q_auto,f_auto,so_2,f_jpg/')
    .replace(/\.mp4$/i, '.jpg');
}

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function VideoPlayer({ src, poster, className = '', style = {} }: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const thumbnail = poster ?? getThumbnail(src);

  // Toggle Play/Pause
  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update Progress Bar
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  // Seek Video
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const seekTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  // Toggle Mute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Change Volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume === 0) setIsMuted(true);
      else setIsMuted(false);
    }
  };

  // Toggle Fullscreen
  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Listen for fullscreen change (e.g., via Esc key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Show/Hide Controls on Hover
  const handleMouseEnter = () => setShowControls(true);
  const handleMouseLeave = () => setShowControls(false);

  // Video Ended Reset
  const handleVideoEnded = () => {
    setIsPlaying(false);
    // Controls will vanish because isPlaying is false, matches request
  };

  // Glassmorphism Styles for Controls
  const controlBarStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: isFullscreen ? '40px' : '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90%',
    maxWidth: '800px',
    padding: '12px 20px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    // Logic: Visible if Fullscreen OR (Playing AND Hovered)
    opacity: isFullscreen || (isPlaying && showControls) ? 1 : 0,
    transition: 'opacity 0.4s ease, bottom 0.4s ease',
    // The "Liquid Glass" Effect
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
    pointerEvents: isFullscreen || (isPlaying && showControls) ? 'auto' : 'none',
    zIndex: 100
  };

  const iconButtonStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    opacity: 0.9,
    transition: 'opacity 0.2s'
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: isFullscreen ? '100vh' : 'auto', // Handle container height in fullscreen
        cursor: 'pointer',
        overflow: 'hidden',
        background: 'var(--color-bg-secondary)',
        ...style
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        poster={thumbnail}
        preload="metadata"
        playsInline
        muted={isMuted} // Use state directly
        loop={false}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        style={{
          width: '100%',
          height: '100%',
          objectFit: isFullscreen ? 'contain' : (style.objectFit as any || 'cover'),
          display: 'block',
          ...style
        }}
      />

      {/* Central Play Button Overlay (Only show when paused and controls visible) */}
      {!isPlaying && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            opacity: 1,
            transition: 'opacity var(--transition-hover)',
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.25)', // Glassy play button
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 4 }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Liquid Glass Controls Bar */}
      <div style={controlBarStyle} onClick={(e) => e.stopPropagation()}>
        {/* Play/Pause Button */}
        <button style={iconButtonStyle} onClick={togglePlay} aria-label={isPlaying ? "Pause Video" : "Play Video"}>
          {isPlaying ? (
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
          ) : (
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          )}
        </button>

        {/* Volume Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={iconButtonStyle} onClick={toggleMute} aria-label={isMuted || volume === 0 ? "Unmute" : "Mute"}>
            {isMuted || volume === 0 ? (
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
            ) : (
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
            )}
          </button>
          {/* Volume Slider - styled delicately */}
          <div className="range-wrapper" style={{ width: '60px', height: '16px', display: 'flex', alignItems: 'center' }}>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="Volume Control"
              style={{
                width: '100%',
                accentColor: 'white',
                cursor: 'pointer',
                height: '4px',
                opacity: 0.8
              }}
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ flex: 1, height: '16px', display: 'flex', alignItems: 'center' }}>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            aria-label="Video Progress Bar"
            style={{
              width: '100%',
              accentColor: 'white', // Browser default accent is decent, but CSS override would be better
              cursor: 'pointer',
              height: '4px',
              background: 'rgba(255,255,255,0.3)',
              borderRadius: '2px',
              appearance: 'auto'
            }}
          />
        </div>

        {/* Fullscreen Toggle */}
        <button style={iconButtonStyle} onClick={toggleFullscreen} aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
          {isFullscreen ? (
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" /></svg>
          ) : (
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" /></svg>
          )}
        </button>
      </div>

    </div>
  );
}

export { getThumbnail };
