import { getCourse } from "@/lib/api"
import { notFound } from "next/navigation"
import Image from "next/image"
import CourseContent from "@/components/course-content"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star, Award, CheckCircle } from "lucide-react"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const course = await getCourse(params.slug)

  if (!course) {
    return {
      title: "Course Not Found | EduLMS",
      description: "The requested course could not be found",
    }
  }

  return {
    title: `${course.title} | EduLMS`,
    description: course.description,
  }
}

export default async function CoursePage({ params }: { params: { slug: string } }) {
  // Fetch course data
  const course = await getCourse(params.slug)

  if (!course) {
    notFound()
  }

  return (
    <div>
      {/* Course Header */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-6 max-w-3xl">{course.description}</p>
          <div className="flex flex-wrap gap-6 mb-4">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-2" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-gray-500 mr-2" />
              <span>{course.level}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-gray-500 mr-2" />
              <span>{course.totalStudents} students</span>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 mr-2" />
              <span>{course.rating} rating</span>
            </div>
          </div>
          <div className="flex items-center">
            <Image
              src="/placeholder.svg?height=50&width=50&text=Instructor"
              alt={course.instructor}
              width={50}
              height={50}
              className="rounded-full mr-3"
            />
            <span>
              Instructor: <strong>{course.instructor}</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2">
            <CourseContent courseId={course.id} videos={course.videos} />
          </div>

          {/* Course Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-6">
                <Image
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  width={400}
                  height={200}
                  className="w-full rounded-lg"
                />
              </div>

              <Button className="w-full mb-4">Enroll Now</Button>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Course Details</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Videos:</span>
                    <span className="font-medium">{course.videos.length}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{course.duration}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-medium">{course.level}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Students:</span>
                    <span className="font-medium">{course.totalStudents}</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">What You'll Learn</h3>
                <ul className="space-y-2">
                  {course.learningPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Course Quizzes */}
            {course.quizzes.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Course Quizzes</h3>
                <ul className="space-y-3">
                  {course.quizzes.map((quiz) => (
                    <li key={quiz.id} className="border-b pb-3 last:border-0 last:pb-0">
                      <h4 className="font-medium">{quiz.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{quiz.description}</p>
                      <Button variant="outline" size="sm">
                        Take Quiz
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
