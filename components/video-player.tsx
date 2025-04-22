"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, AlertCircle } from "lucide-react"

type VideoPlayerProps = {
  videoUrl: string
  title: string
  onComplete: () => void
}

export default function VideoPlayer({ videoUrl, title, onComplete }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)
  const [videoError, setVideoError] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      if (!video) return

      const currentProgress = (video.currentTime / video.duration) * 100
      setProgress(currentProgress)
      setCurrentTime(video.currentTime)

      // Mark as complete when 90% watched
      if (currentProgress > 90 && !hasCompleted) {
        setHasCompleted(true)
        onComplete()
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleError = () => {
      console.error("Video error occurred")
      setVideoError(true)
    }

    video.addEventListener("timeupdate", updateProgress)
    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("error", handleError)

    return () => {
      video.removeEventListener("timeupdate", updateProgress)
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("error", handleError)
    }
  }, [hasCompleted, onComplete])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video || videoError) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play().catch((err) => {
        console.error("Error playing video:", err)
        setVideoError(true)
      })
    }

    setIsPlaying(!isPlaying)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video || videoError) return

    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / progressBar.offsetWidth

    video.currentTime = pos * video.duration
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video || videoError) return

    if (isMuted) {
      video.volume = volume
    } else {
      video.volume = 0
    }

    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video || videoError) return

    const newVolume = Number.parseFloat(e.target.value)
    video.volume = newVolume
    setVolume(newVolume)

    if (newVolume === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
    }
  }

  const toggleFullscreen = () => {
    if (!playerRef.current) return

    if (!isFullscreen) {
      if (playerRef.current.requestFullscreen) {
        playerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }

    setIsFullscreen(!isFullscreen)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  if (videoError || !videoUrl) {
    return (
      <div className="relative w-full aspect-video bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center p-6">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <h3 className="text-xl font-semibold mb-2">Video Unavailable</h3>
          <p className="text-gray-400">The video could not be loaded. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={playerRef} className="relative w-full aspect-video bg-black">
      <video ref={videoRef} src={videoUrl} className="w-full h-full" onClick={togglePlay} playsInline />

      {/* Video Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-600 rounded-full mb-4 cursor-pointer" onClick={handleProgressClick}>
          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Play/Pause Button */}
            <button onClick={togglePlay} className="text-white hover:text-purple-400 transition">
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>

            {/* Time Display */}
            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Volume Control */}
            <div className="flex items-center space-x-2">
              <button onClick={toggleMute} className="text-white hover:text-purple-400 transition">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 accent-purple-500"
              />
            </div>

            {/* Fullscreen Button */}
            <button onClick={toggleFullscreen} className="text-white hover:text-purple-400 transition">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
