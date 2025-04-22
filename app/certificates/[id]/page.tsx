import { getCertificateById } from "@/lib/api"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Download, Printer, Share2 } from "lucide-react"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const certificate = await getCertificateById(params.id)

  if (!certificate) {
    return {
      title: "Certificate Not Found | EduLMS",
      description: "The requested certificate could not be found",
    }
  }

  return {
    title: `${certificate.courseTitle} Certificate | EduLMS`,
    description: `Certificate of completion for ${certificate.courseTitle}`,
  }
}

export default async function CertificatePage({ params }: { params: { id: string } }) {
  // Fetch certificate data
  const certificate = await getCertificateById(params.id)

  if (!certificate) {
    notFound()
  }

  const today = new Date(certificate.issueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Certificate</h1>
        <div className="flex gap-4">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="outline">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="bg-white border-8 border-purple-200 rounded-lg p-12 max-w-3xl mx-auto print:border-0">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-purple-800 mb-6">Certificate of Completion</h2>
          <p className="text-xl mb-8">This certifies that</p>
          <p className="text-3xl font-bold mb-8">{certificate.userName}</p>
          <p className="text-xl mb-8">has successfully completed the course</p>
          <p className="text-2xl font-bold text-purple-700 mb-8">{certificate.courseTitle}</p>
          <p className="text-xl mb-12">on {today}</p>

          <div className="flex justify-center mb-8">
            <div className="w-48 h-px bg-gray-300"></div>
          </div>

          <p className="text-lg font-semibold">EduLMS</p>
          <p className="text-sm text-gray-500">Certificate ID: {certificate.id}</p>
        </div>
      </div>
    </div>
  )
}
