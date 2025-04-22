"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { generateCertificate } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function GenerateCertificatePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState("Student")
  const [certificateId, setCertificateId] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const courseId = searchParams.get("courseId")

  useEffect(() => {
    if (!courseId) {
      toast({
        title: "Error",
        description: "Course ID is required to generate a certificate",
        variant: "destructive",
      })
      router.push("/courses")
      return
    }

    // In a real app, you would get the user's name from authentication
    // For now, we'll use a dummy name
    const user = { name: "Current User" }
    setUserName(user.name)

    const generateUserCertificate = async () => {
      setIsLoading(true)
      try {
        const certificate = await generateCertificate(courseId, user.name)

        if (certificate) {
          setCertificateId(certificate.id)
          toast({
            title: "Success",
            description: "Your certificate has been generated",
          })
        } else {
          throw new Error("Failed to generate certificate")
        }
      } catch (error) {
        console.error("Error generating certificate:", error)
        toast({
          title: "Error",
          description: "Failed to generate certificate",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    generateUserCertificate()
  }, [courseId, router, toast])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Generating Your Certificate</h1>
          <p className="text-gray-600 mb-8">Please wait while we prepare your certificate...</p>
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  if (certificateId) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Certificate Generated!</h1>
          <p className="text-gray-600 mb-8">Your certificate has been successfully generated.</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => router.push(`/certificates/${certificateId}`)}>View Certificate</Button>
            <Button variant="outline" onClick={() => router.push("/certificates")}>
              View All Certificates
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Something Went Wrong</h1>
        <p className="text-gray-600 mb-8">We couldn't generate your certificate. Please try again later.</p>
        <div className="flex gap-4 justify-center">
          <Button onClick={() => router.push("/courses")}>Back to Courses</Button>
        </div>
      </div>
    </div>
  )
}
