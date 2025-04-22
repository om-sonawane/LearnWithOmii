import Image from "next/image"
import Link from "next/link"
import { getHomePageData } from "@/lib/api"
import CourseCard from "@/components/course-card"
import { ArrowRight, BookOpen, BadgeIcon as Certificate, Users } from "lucide-react"

export default async function HomePage() {
  // Fetch home page data
  const homeData = await getHomePageData()
  const { hero, featuredCourses } = homeData

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-purple-600 to-blue-500 py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-white mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{hero.title}</h1>
            <p className="text-xl mb-8">{hero.description}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Browse Courses
              </Link>
              <Link
                href="/about"
                className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <Image
              src={hero.image || "/placeholder.svg"}
              alt="Learning Management System"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold mb-2">50+</h3>
              <p className="text-gray-600">Courses Available</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold mb-2">10,000+</h3>
              <p className="text-gray-600">Active Students</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Certificate className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold mb-2">5,000+</h3>
              <p className="text-gray-600">Certificates Issued</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="w-full py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Courses</h2>
            <Link
              href="/courses"
              className="text-purple-600 font-medium flex items-center hover:text-purple-700 transition"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.courses.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/courses"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              Explore All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How Our LMS Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose a Course</h3>
              <p className="text-gray-600">Browse our catalog and find the perfect course for your learning goals.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Complete Lessons</h3>
              <p className="text-gray-600">Watch videos sequentially and unlock new content as you progress.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Certified</h3>
              <p className="text-gray-600">Complete the course and quizzes to earn your certificate of completion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already learning and growing with our courses.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/courses"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Browse Courses
            </Link>
            <Link
              href="/signup"
              className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
