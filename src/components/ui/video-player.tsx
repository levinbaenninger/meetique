"use client";

import {
  MaximizeIcon,
  MinimizeIcon,
  PauseIcon,
  PlayIcon,
  Volume2Icon,
  VolumeXIcon,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

// Type definitions for webkit fullscreen APIs
interface WebkitDocument extends Document {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?(): Promise<void>;
}

interface WebkitElement extends HTMLElement {
  webkitRequestFullscreen?(): Promise<void>;
}

interface VideoPlayerProps {
  src: string;
  className?: string;
}

export const VideoPlayer = ({ src, className }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    }
    if (isPlaying) {
      hideControlsTimeout.current = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      setShowControls(true);
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
      return;
    }
    resetControlsTimer();

    return () => {
      if (hideControlsTimeout.current) {
        clearTimeout(hideControlsTimeout.current);
      }
    };
  }, [isPlaying, resetControlsTimer]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFs =
        document.fullscreenElement === containerRef.current ||
        (document as WebkitDocument).webkitFullscreenElement ===
          containerRef.current;
      setIsFullscreen(isFs);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (isFullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as WebkitDocument).webkitExitFullscreen) {
        (document as WebkitDocument).webkitExitFullscreen?.();
      }
    } else if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if ((el as unknown as WebkitElement).webkitRequestFullscreen) {
      (el as unknown as WebkitElement).webkitRequestFullscreen?.();
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const handleSeek = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (value[0] / 100) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const video = videoRef.current;
    if (!video) return;

    const newVolume = value[0] / 100;
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={cn("group relative", className)}
      onFocus={resetControlsTimer}
      onMouseEnter={resetControlsTimer}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onMouseMove={resetControlsTimer}
      ref={containerRef}
      tabIndex={0}
    >
      <video
        className="h-full w-full rounded-lg object-contain"
        onClick={togglePlay}
        ref={videoRef}
        src={src}
        tabIndex={-1}
      />

      <div
        aria-hidden={!showControls}
        className={cn(
          "absolute right-0 bottom-0 left-0 rounded-b-lg bg-gradient-to-t from-muted-foreground/80 to-transparent p-4 transition-opacity duration-300 ease-in-out",
          showControls
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
      >
        <div className="mb-3">
          <Slider
            className="w-full"
            max={100}
            onValueChange={handleSeek}
            step={0.1}
            value={[progressPercentage]}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              className="text-white hover:bg-white/20"
              onClick={togglePlay}
              size="sm"
              variant="ghost"
            >
              {isPlaying ? (
                <PauseIcon className="h-4 w-4" />
              ) : (
                <PlayIcon className="h-4 w-4" />
              )}
            </Button>

            <div className="flex items-center gap-2">
              <Button
                className="text-white hover:bg-white/20"
                onClick={toggleMute}
                size="sm"
                variant="ghost"
              >
                {isMuted ? (
                  <VolumeXIcon className="h-4 w-4" />
                ) : (
                  <Volume2Icon className="h-4 w-4" />
                )}
              </Button>

              <Slider
                className="w-20"
                max={100}
                onValueChange={handleVolumeChange}
                value={[isMuted ? 0 : volume * 100]}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-white">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            <Button
              aria-label={isFullscreen ? "Exit full screen" : "Full screen"}
              className="text-white hover:bg-white/20"
              onClick={toggleFullscreen}
              size="sm"
              variant="ghost"
            >
              {isFullscreen ? (
                <MinimizeIcon className="h-4 w-4" />
              ) : (
                <MaximizeIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
