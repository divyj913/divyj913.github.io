const { useRef, useEffect, useCallback } = React;

const FadingVideo = ({ src, className, style }) => {
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const fadingOutRef = useRef(false);

  const fadeTo = useCallback((target, duration) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    const video = videoRef.current;
    if (!video) return;

    let startOpacity = parseFloat(video.style.opacity);
    if (isNaN(startOpacity)) {
      startOpacity = 0;
    }

    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = startOpacity + (target - startOpacity) * progress;
      video.style.opacity = current;

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.style.opacity = '0';

    const handleLoadedData = () => {
      video.style.opacity = '0';
      video.play().catch(err => console.log("Play blocked/interrupted:", err));
      fadeTo(1, 500);
    };

    const handleTimeUpdate = () => {
      const duration = video.duration;
      const currentTime = video.currentTime;
      if (!duration || isNaN(duration)) return;

      const timeLeft = duration - currentTime;
      if (!fadingOutRef.current && timeLeft <= 0.55 && timeLeft > 0) {
        fadingOutRef.current = true;
        fadeTo(0, 500);
      }
    };

    const handleEnded = () => {
      video.style.opacity = '0';
      setTimeout(() => {
        if (!videoRef.current) return;
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(err => console.log("Play blocked/interrupted:", err));
        fadingOutRef.current = false;
        fadeTo(1, 500);
      }, 100);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    if (video.readyState >= 2) {
      handleLoadedData();
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, [src, fadeTo]);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      style={{ ...style, opacity: 0 }}
      muted
      autoPlay
      playsInline
      preload="auto"
    />
  );
};

window.FadingVideo = FadingVideo;
