"use client"

import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import { getCourse, generateCertificate } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Download, Printer } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CertificatePage() {
  const params = useParams()
  const slug = params.slug as string
  const [course, setCourse] = useState<any>(null)
  const [userName, setUserName] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [certificateData, setCertificateData] = useState<any>(null)
  const certificateRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get course data
        const courseData = await getCourse(slug)
        setCourse(courseData)

        // Get user data from localStorage
        const user = JSON.parse(localStorage.getItem("user") || "{}")
        setUserName(user.name || "Student")

        // Get token
        const token = localStorage.getItem("token")

        if (token && courseData) {
          // Generate certificate
          const certificate = await generateCertificate(courseData.id, token)
          setCertificateData(certificate.data)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Failed to generate certificate",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [slug, toast])

  const handleDownload = () => {
    if (!certificateRef.current) return

    // This is a simplified version - in a real app, you'd use a library like html2canvas or jspdf
    const certificateContent = certificateRef.current.innerHTML
    const blob = new Blob([certificateContent], { type: "text/html" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `${course.attributes.title.replace(/\s+/g, "-")}-Certificate.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const handlePrint = () => {
    window.print()
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <p>Generating your certificate...</p>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">Certificate Not Available</h1>
        <p>The course could not be found or you haven't completed it yet.</p>
      </div>
    )
  }

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Certificate</h1>
        <div className="flex gap-4">
          <Button onClick={handleDownload} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      <div
        ref={certificateRef}
        className="bg-white border-8 border-purple-200 rounded-lg p-12 max-w-3xl mx-auto print:border-0"
      >
        <div className="text-center">
          <h2 className="text-4xl font-bold text-purple-800 mb-6">Certificate of Completion</h2>
          <p className="text-xl mb-8">This certifies that</p>
          <p className="text-3xl font-bold mb-8">{userName}</p>
          <p className="text-xl mb-8">has successfully completed the course</p>
          <p className="text-2xl font-bold text-purple-700 mb-8">{course.attributes.title}</p>
          <p className="text-xl mb-12">on {today}</p>

          <div className="flex justify-center mb-8">
            <div className="w-48 h-px bg-gray-300"></div>
          </div>

          <p className="text-lg font-semibold">LMS Platform</p>
          <p className="text-sm text-gray-500">
            Certificate ID: {certificateData?.id || "CERT-" + Math.random().toString(36).substring(2, 10).toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  )
}
