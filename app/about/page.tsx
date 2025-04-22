import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "About Us | EduLMS",
  description: "Learn more about our learning management system and our mission",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-6">About EduLMS</h1>
          <p className="text-xl text-gray-600">
            We're on a mission to provide high-quality education that's accessible to everyone, everywhere.
          </p>
        </div>
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=1200&text=About+Us"
            alt="About EduLMS"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Our Story */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              EduLMS was founded in 2020 with a simple idea: education should be accessible to everyone. We started with
              a small team of educators and developers who were passionate about creating a platform that would make
              learning engaging and effective.
            </p>
            <p className="text-gray-600 mb-4">
              Today, we've grown to serve thousands of students worldwide, offering courses in various subjects from web
              development to data science, design, and more. Our platform continues to evolve with new features and
              improvements based on feedback from our community.
            </p>
            <p className="text-gray-600">
              We believe that education is a lifelong journey, and we're committed to providing the tools and resources
              needed for continuous learning and growth.
            </p>
          </div>
          <div className="relative h-[300px] rounded-xl overflow-hidden">
            <Image
              src="/placeholder.svg?height=300&width=500&text=Our+Story"
              alt="Our Story"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="mb-16 bg-purple-50 p-12 rounded-xl">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 mb-8">
            To empower individuals through accessible, high-quality education that fosters continuous learning and
            personal growth.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
              <p className="text-gray-600">
                Making education accessible to everyone, regardless of location or background.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className="text-gray-600">Providing high-quality content created by industry experts and educators.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-600">
                Continuously improving our platform with innovative learning tools and methods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=200&width=200&text=Team+Member+${i}`}
                  alt={`Team Member ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Team Member {i}</h3>
              <p className="text-gray-600">Position</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center bg-purple-600 text-white p-12 rounded-xl">
        <h2 className="text-3xl font-bold mb-6">Join Our Learning Community</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Start your learning journey today and join thousands of students who are already growing with us.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/courses">
            <Button className="bg-white text-purple-600 hover:bg-gray-100">Browse Courses</Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Sign Up Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
