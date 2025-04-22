import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllCourses, getUserCertificates } from "@/lib/api"
import { BookOpen, BadgeIcon as Certificate, Clock, BarChart } from "lucide-react"

export const metadata = {
  title: "Dashboard | EduLMS",
  description: "Your personal learning dashboard",
}

export default async function DashboardPage() {
  // Fetch user's enrolled courses and certificates
  const allCourses = await getAllCourses()
  const certificates = await getUserCertificates()

  // In a real app, you would filter courses based on user enrollment
  // For now, we'll use the first 3 courses as "enrolled" courses
  const enrolledCourses = allCourses.slice(0, 3)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrolledCourses.length}</div>
            <p className="text-xs text-muted-foreground">
              {enrolledCourses.length > 0 ? "Continue learning" : "Enroll in a course"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
            <Certificate className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificates.length}</div>
            <p className="text-xs text-muted-foreground">
              {certificates.length > 0 ? "View certificates" : "Complete a course"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Learned</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5</div>
            <p className="text-xs text-muted-foreground">+2.5 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        <TabsContent value="courses" className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">My Courses</h2>
          {enrolledCourses.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
              <Link href="/courses">
                <Button>Browse Courses</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id}>
                  <div className="relative h-48">
                    <Image
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="text-sm text-gray-500 mb-1">Progress: 45%</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                    <Link href={`/courses/${course.slug}`}>
                      <Button className="w-full">Continue Learning</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="certificates" className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">My Certificates</h2>
          {certificates.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-4">You haven't earned any certificates yet.</p>
              <p className="text-gray-600 mb-4">Complete a course to earn your first certificate.</p>
              <Link href="/courses">
                <Button>Browse Courses</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((certificate) => (
                <Card key={certificate.id}>
                  <CardHeader>
                    <CardTitle>{certificate.courseTitle}</CardTitle>
                    <CardDescription>Issued on {new Date(certificate.issueDate).toLocaleDateString()}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center mb-4">
                      <Certificate className="h-16 w-16 text-purple-600" />
                    </div>
                    <Link href={`/certificates/${certificate.id}`}>
                      <Button className="w-full">View Certificate</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="achievements" className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">My Achievements</h2>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600 mb-4">Achievements coming soon!</p>
            <p className="text-gray-600">Complete courses and quizzes to earn badges and achievements.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
