import Image from "next/image"
import Link from "next/link"
import { Clock, Users, Star } from "lucide-react"
import type { Course } from "@/lib/dummy-data"

type CourseCardProps = {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
      <div className="relative h-48">
        <Image src={course.thumbnail || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
            {course.level}
          </span>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{course.rating}</span>
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{course.totalStudents} students</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">By {course.instructor}</span>
          <Link
            href={`/courses/${course.slug}`}
            className="text-purple-600 font-medium hover:text-purple-700 transition"
          >
            View Course →
          </Link>
        </div>
      </div>
    </div>
  )
}
