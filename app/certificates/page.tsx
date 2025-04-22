import { getUserCertificates } from "@/lib/api"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Share2 } from "lucide-react"

export const metadata = {
  title: "My Certificates | EduLMS",
  description: "View and download your course completion certificates",
}

export default async function CertificatesPage() {
  // Fetch user certificates
  const certificates = await getUserCertificates()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Certificates</h1>

      {certificates.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <div className="mb-6">
            <Image
              src="/placeholder.svg?height=200&width=200&text=No+Certificates"
              alt="No Certificates"
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
          <h2 className="text-2xl font-semibold mb-4">No Certificates Yet</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Complete a course to earn your first certificate. Certificates are awarded when you finish all videos and
            pass the quizzes.
          </p>
          <Link href="/courses">
            <Button>Browse Courses</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((certificate) => (
            <div key={certificate.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold mb-2">{certificate.courseTitle}</h2>
                <p className="text-gray-600 mb-4">Issued on {new Date(certificate.issueDate).toLocaleDateString()}</p>
                <div className="flex gap-2">
                  <Link href={`/certificates/${certificate.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
              <div className="relative h-40 bg-purple-50">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">Certificate of Completion</div>
                    <div className="text-sm text-gray-600">Click to view full certificate</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
