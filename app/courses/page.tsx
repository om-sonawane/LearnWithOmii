import { getAllCourses } from "@/lib/api"
import CourseCard from "@/components/course-card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export const metadata = {
  title: "All Courses | EduLMS",
  description: "Browse all available courses on our learning platform",
}

export default async function CoursesPage() {
  // Fetch all courses
  const courses = await getAllCourses()

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">All Courses</h1>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option value="">All Categories</option>
            <option value="web-development">Web Development</option>
            <option value="data-science">Data Science</option>
            <option value="mobile-development">Mobile Development</option>
            <option value="design">Design</option>
          </select>
          <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Course Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Course Categories</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="rounded-full">
            All
          </Button>
          <Button variant="outline" className="rounded-full">
            Web Development
          </Button>
          <Button variant="outline" className="rounded-full">
            Data Science
          </Button>
          <Button variant="outline" className="rounded-full">
            Mobile Development
          </Button>
          <Button variant="outline" className="rounded-full">
            UI/UX Design
          </Button>
          <Button variant="outline" className="rounded-full">
            Business
          </Button>
        </div>
      </div>

      {/* Course Carousel - Featured */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      {/* All Courses Grid */}
      <h2 className="text-2xl font-semibold mb-6">All Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
