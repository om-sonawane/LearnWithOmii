"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { getUserProgress, updateUserProgress } from "@/lib/api"
import VideoPlayer from "./video-player"
import { Button } from "@/components/ui/button"
import { CheckCircle, Lock, PlayCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Video } from "@/lib/dummy-data"

type CourseContentProps = {
  courseId: string
  videos: Video[]
}

export default function CourseContent({ courseId, videos }: CourseContentProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [completedVideos, setCompletedVideos] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Handle empty videos array
  if (!videos || videos.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <p className="text-gray-500">No videos available for this course yet.</p>
        <p className="text-gray-500 mt-2">Check back soon for new content!</p>
      </div>
    )
  }

  // Sort videos by order
  const sortedVideos = [...videos].sort((a, b) => a.order - b.order)

  useEffect(() => {
    let isMounted = true

    const fetchProgress = async () => {
      setIsLoading(true)
      try {
        const progress = await getUserProgress(courseId)
        if (isMounted) {
          setCompletedVideos(progress)
        }
      } catch (error) {
        console.error("Error fetching progress:", error)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchProgress()

    return () => {
      isMounted = false
    }
  }, [courseId])

  const handleVideoComplete = async () => {
    const currentVideo = sortedVideos[currentVideoIndex]

    try {
      await updateUserProgress(courseId, currentVideo.id, true)

      setCompletedVideos((prev) => ({
        ...prev,
        [currentVideo.id]: true,
      }))

      toast({
        title: "Progress saved",
        description: "Video marked as completed",
      })

      // Check if all videos are completed
      const allCompleted = sortedVideos.every((video) => completedVideos[video.id] || video.id === currentVideo.id)

      if (allCompleted) {
        toast({
          title: "Congratulations!",
          description: "You've completed all videos in this course. Your certificate is ready!",
        })

        // Navigate to certificate page
        router.push(`/certificates/generate?courseId=${courseId}`)
      } else {
        // Move to next video if available
        if (currentVideoIndex < sortedVideos.length - 1) {
          setCurrentVideoIndex(currentVideoIndex + 1)
        }
      }
    } catch (error) {
      console.error("Error updating progress:", error)
      toast({
        title: "Error",
        description: "Failed to update progress",
        variant: "destructive",
      })
    }
  }

  const isVideoUnlocked = (index: number) => {
    if (index === 0) return true

    // Check if previous video is completed
    const previousVideo = sortedVideos[index - 1]
    return completedVideos[previousVideo.id]
  }

  const currentVideo = sortedVideos[currentVideoIndex]

  if (isLoading) {
    return <div className="flex justify-center p-12">Loading course content...</div>
  }

  return (
    <div className="space-y-8">
      <div className="bg-black rounded-lg overflow-hidden">
        <VideoPlayer videoUrl={currentVideo.videoUrl} title={currentVideo.title} onComplete={handleVideoComplete} />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">{currentVideo.title}</h2>
        <p className="text-gray-600">{currentVideo.description}</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4">Course Content</h3>
        <div className="space-y-4">
          {sortedVideos.map((video, index) => {
            const isCompleted = completedVideos[video.id]
            const unlocked = isVideoUnlocked(index)

            return (
              <div
                key={video.id}
                className={`p-4 rounded-lg border ${
                  currentVideoIndex === index ? "border-purple-500 bg-purple-50" : "border-gray-200"
                } ${unlocked ? "cursor-pointer" : "opacity-70"}`}
                onClick={() => unlocked && setCurrentVideoIndex(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    ) : unlocked ? (
                      <PlayCircle className="w-5 h-5 text-purple-500 mr-3" />
                    ) : (
                      <Lock className="w-5 h-5 text-gray-400 mr-3" />
                    )}
                    <div>
                      <h4 className="font-medium">{video.title}</h4>
                      <p className="text-sm text-gray-500">{video.duration} min</p>
                    </div>
                  </div>
                  {currentVideoIndex === index && !isCompleted && (
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleVideoComplete()
                      }}
                    >
                      Mark as Complete
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
