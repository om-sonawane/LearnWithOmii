// This file contains dummy data to use until the Strapi API is integrated

// Types for our data model
export type HomePageData = {
  hero: {
    title: string
    description: string
    image: string
  }
  featuredCourses: {
    courses: Course[]
  }
}

export type Course = {
  id: string
  title: string
  slug: string
  description: string
  thumbnail: string
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  instructor: string
  rating: number
  totalStudents: number
  videos: Video[]
  quizzes: Quiz[]
  learningPoints: string[]
}

export type Video = {
  id: string
  title: string
  description: string
  videoUrl: string
  duration: number
  order: number
}

export type Quiz = {
  id: string
  title: string
  description: string
  questions: Question[]
}

export type Question = {
  id: string
  text: string
  answers: Answer[]
}

export type Answer = {
  id: string
  text: string
  isCorrect: boolean
}

export type Certificate = {
  id: string
  courseId: string
  courseTitle: string
  userName: string
  issueDate: string
}

// Dummy home page data
export const homePageData: HomePageData = {
  hero: {
    title: "Expand Your Knowledge with Our Online Courses",
    description:
      "Learn at your own pace with our comprehensive library of courses. From programming to design, we've got you covered.",
    image: "learn.jpg",
  },
  featuredCourses: {
    courses: [
      {
        id: "course-1",
        title: "Web Development Fundamentals",
        slug: "web-development-fundamentals",
        description: "Learn the basics of HTML, CSS, and JavaScript to build your first website.",
        thumbnail: "/placeholder.svg?height=200&width=400&text=Web+Development",
        duration: "8 hours",
        level: "Beginner",
        instructor: "John Doe",
        rating: 4.8,
        totalStudents: 1250,
        videos: [],
        quizzes: [],
        learningPoints: [],
      },
      {
        id: "course-2",
        title: "React for Beginners",
        slug: "react-for-beginners",
        description: "Start your journey with React, the popular JavaScript library for building user interfaces.",
        thumbnail: "/placeholder.svg?height=200&width=400&text=React",
        duration: "10 hours",
        level: "Intermediate",
        instructor: "Jane Smith",
        rating: 4.9,
        totalStudents: 980,
        videos: [],
        quizzes: [],
        learningPoints: [],
      },
      {
        id: "course-3",
        title: "Advanced Node.js",
        slug: "advanced-nodejs",
        description: "Take your Node.js skills to the next level with advanced concepts and real-world applications.",
        thumbnail: "/placeholder.svg?height=200&width=400&text=Node.js",
        duration: "12 hours",
        level: "Advanced",
        instructor: "Mike Johnson",
        rating: 4.7,
        totalStudents: 750,
        videos: [],
        quizzes: [],
        learningPoints: [],
      },
    ],
  },
}

// Dummy courses data
export const coursesData: Course[] = [
  {
    id: "course-1",
    title: "Web Development Fundamentals",
    slug: "web-development-fundamentals",
    description:
      "Learn the basics of HTML, CSS, and JavaScript to build your first website. This course covers everything you need to know to get started with web development, from basic HTML tags to CSS styling and JavaScript interactivity.",
    thumbnail: "/placeholder.svg?height=200&width=400&text=Web+Development",
    duration: "8 hours",
    level: "Beginner",
    instructor: "John Doe",
    rating: 4.8,
    totalStudents: 1250,
    videos: [
      {
        id: "video-1-1",
        title: "Introduction to HTML",
        description: "Learn the basics of HTML and how to structure your web pages.",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        duration: 15,
        order: 1,
      },
      {
        id: "video-1-2",
        title: "CSS Fundamentals",
        description: "Learn how to style your HTML with CSS.",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        duration: 20,
        order: 2,
      },
      {
        id: "video-1-3",
        title: "JavaScript Basics",
        description: "Introduction to JavaScript and how to make your websites interactive.",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        duration: 25,
        order: 3,
      },
    ],
    quizzes: [
      {
        id: "quiz-1-1",
        title: "HTML Basics Quiz",
        description: "Test your knowledge of HTML fundamentals",
        questions: [
          {
            id: "q-1-1-1",
            text: "What does HTML stand for?",
            answers: [
              {
                id: "a-1-1-1-1",
                text: "Hyper Text Markup Language",
                isCorrect: true,
              },
              {
                id: "a-1-1-1-2",
                text: "Hyper Transfer Markup Language",
                isCorrect: false,
              },
              {
                id: "a-1-1-1-3",
                text: "Hyper Text Markdown Language",
                isCorrect: false,
              },
              {
                id: "a-1-1-1-4",
                text: "High Tech Markup Language",
                isCorrect: false,
              },
            ],
          },
          {
            id: "q-1-1-2",
            text: "Which tag is used to create a paragraph in HTML?",
            answers: [
              {
                id: "a-1-1-2-1",
                text: "<paragraph>",
                isCorrect: false,
              },
              {
                id: "a-1-1-2-2",
                text: "<p>",
                isCorrect: true,
              },
              {
                id: "a-1-1-2-3",
                text: "<para>",
                isCorrect: false,
              },
              {
                id: "a-1-1-2-4",
                text: "<text>",
                isCorrect: false,
              },
            ],
          },
        ],
      },
    ],
    learningPoints: [
      "Understand HTML structure and semantics",
      "Create responsive layouts with CSS",
      "Add interactivity with JavaScript",
      "Build a complete website from scratch",
    ],
  },
  {
    id: "course-2",
    title: "React for Beginners",
    slug: "react-for-beginners",
    description:
      "Start your journey with React, the popular JavaScript library for building user interfaces. Learn component-based architecture, state management, and how to build modern web applications.",
    thumbnail: "/placeholder.svg?height=200&width=400&text=React",
    duration: "10 hours",
    level: "Intermediate",
    instructor: "Jane Smith",
    rating: 4.9,
    totalStudents: 980,
    videos: [
      {
        id: "video-2-1",
        title: "Introduction to React",
        description: "Learn what React is and why it's so popular.",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        duration: 18,
        order: 1,
      },
      {
        id: "video-2-2",
        title: "Components and Props",
        description: "Learn about React components and how to pass data with props.",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        duration: 22,
        order: 2,
      },
      {
        id: "video-2-3",
        title: "State and Lifecycle",
        description: "Understanding state management and component lifecycle in React.",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        duration: 25,
        order: 3,
      },
    ],
    quizzes: [
      {
        id: "quiz-2-1",
        title: "React Fundamentals Quiz",
        description: "Test your knowledge of React basics",
        questions: [
          {
            id: "q-2-1-1",
            text: "What is JSX?",
            answers: [
              {
                id: "a-2-1-1-1",
                text: "A JavaScript extension that allows writing HTML in React",
                isCorrect: true,
              },
              {
                id: "a-2-1-1-2",
                text: "A JavaScript XML parser",
                isCorrect: false,
              },
              {
                id: "a-2-1-1-3",
                text: "A JavaScript execution engine",
                isCorrect: false,
              },
              {
                id: "a-2-1-1-4",
                text: "A JavaScript framework",
                isCorrect: false,
              },
            ],
          },
        ],
      },
    ],
    learningPoints: [
      "Understand React component architecture",
      "Manage state effectively",
      "Work with React hooks",
      "Build single-page applications",
    ],
  },
  {
    id: "course-3",
    title: "Advanced Node.js",
    slug: "advanced-nodejs",
    description:
      "Take your Node.js skills to the next level with advanced concepts and real-world applications. Learn about asynchronous programming, RESTful APIs, and database integration.",
    thumbnail: "/placeholder.svg?height=200&width=400&text=Node.js",
    duration: "12 hours",
    level: "Advanced",
    instructor: "Mike Johnson",
    rating: 4.7,
    totalStudents: 750,
    videos: [
      {
        id: "video-3-1",
        title: "Asynchronous Programming in Node.js",
        description: "Master callbacks, promises, and async/await in Node.js.",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        duration: 30,
        order: 1,
      },
      {
        id: "video-3-2",
        title: "Building RESTful APIs",
        description: "Learn how to create robust RESTful APIs with Express.js.",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        duration: 35,
        order: 2,
      },
      {
        id: "video-3-3",
        title: "Database Integration",
        description: "Connect your Node.js applications to MongoDB and SQL databases.",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        duration: 40,
        order: 3,
      },
    ],
    quizzes: [
      {
        id: "quiz-3-1",
        title: "Node.js Advanced Concepts",
        description: "Test your knowledge of advanced Node.js concepts",
        questions: [
          {
            id: "q-3-1-1",
            text: "What is the event loop in Node.js?",
            answers: [
              {
                id: "a-3-1-1-1",
                text: "A mechanism that allows Node.js to perform non-blocking I/O operations",
                isCorrect: true,
              },
              {
                id: "a-3-1-1-2",
                text: "A UI component for handling user events",
                isCorrect: false,
              },
              {
                id: "a-3-1-1-3",
                text: "A data structure for storing events",
                isCorrect: false,
              },
              {
                id: "a-3-1-1-4",
                text: "A loop that runs continuously in the background",
                isCorrect: false,
              },
            ],
          },
        ],
      },
    ],
    learningPoints: [
      "Master asynchronous programming patterns",
      "Build scalable RESTful APIs",
      "Integrate with various databases",
      "Deploy Node.js applications to production",
    ],
  },
  {
    id: "course-4",
    title: "UI/UX Design Principles",
    slug: "ui-ux-design-principles",
    description:
      "Learn the fundamentals of UI/UX design and how to create user-friendly interfaces that delight your users.",
    thumbnail: "/placeholder.svg?height=200&width=400&text=UI/UX+Design",
    duration: "9 hours",
    level: "Beginner",
    instructor: "Sarah Williams",
    rating: 4.6,
    totalStudents: 820,
    videos: [
      {
        id: "video-4-1",
        title: "Introduction to UI/UX Design",
        description: "Understand the difference between UI and UX and why both are important.",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        duration: 20,
        order: 1,
      },
      {
        id: "video-4-2",
        title: "User Research Methods",
        description: "Learn various methods for researching user needs and behaviors.",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        duration: 25,
        order: 2,
      },
    ],
    quizzes: [],
    learningPoints: [
      "Understand UI/UX fundamentals",
      "Conduct effective user research",
      "Create wireframes and prototypes",
      "Design user-centered interfaces",
    ],
  },
  {
    id: "course-5",
    title: "Python Data Science",
    slug: "python-data-science",
    description:
      "Learn how to analyze and visualize data using Python and popular libraries like Pandas, NumPy, and Matplotlib.",
    thumbnail: "/placeholder.svg?height=200&width=400&text=Python+Data+Science",
    duration: "15 hours",
    level: "Intermediate",
    instructor: "David Chen",
    rating: 4.9,
    totalStudents: 1100,
    videos: [
      {
        id: "video-5-1",
        title: "Introduction to Python for Data Science",
        description: "Learn the basics of Python programming for data analysis.",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        duration: 30,
        order: 1,
      },
      {
        id: "video-5-2",
        title: "Data Manipulation with Pandas",
        description: "Learn how to manipulate and analyze data using Pandas.",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        duration: 35,
        order: 2,
      },
    ],
    quizzes: [],
    learningPoints: [
      "Master Python for data analysis",
      "Manipulate data with Pandas",
      "Visualize data with Matplotlib",
      "Perform statistical analysis",
    ],
  },
  {
    id: "course-6",
    title: "Mobile App Development with Flutter",
    slug: "mobile-app-development-flutter",
    description: "Build cross-platform mobile apps for iOS and Android using Flutter and Dart.",
    thumbnail: "/placeholder.svg?height=200&width=400&text=Flutter",
    duration: "14 hours",
    level: "Intermediate",
    instructor: "Lisa Johnson",
    rating: 4.8,
    totalStudents: 950,
    videos: [
      {
        id: "video-6-1",
        title: "Introduction to Flutter",
        description: "Learn what Flutter is and why it's great for cross-platform development.",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        duration: 25,
        order: 1,
      },
      {
        id: "video-6-2",
        title: "Dart Programming Basics",
        description: "Learn the fundamentals of Dart programming language.",
        videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
        duration: 30,
        order: 2,
      },
    ],
    quizzes: [],
    learningPoints: [
      "Understand Flutter framework",
      "Master Dart programming",
      "Build cross-platform mobile apps",
      "Implement responsive UI designs",
    ],
  },
]

// Dummy certificates data
export const certificatesData: Certificate[] = [
  {
    id: "cert-1",
    courseId: "course-1",
    courseTitle: "Web Development Fundamentals",
    userName: "Current User",
    issueDate: "2023-05-15",
  },
  {
    id: "cert-2",
    courseId: "course-2",
    courseTitle: "React for Beginners",
    userName: "Current User",
    issueDate: "2023-06-20",
  },
]

// Helper functions to simulate API calls

// Get home page data
export function getHomePageData(): Promise<HomePageData> {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(homePageData)
    }, 500)
  })
}

// Get all courses
export function getAllCourses(): Promise<Course[]> {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(coursesData)
    }, 500)
  })
}

// Get course by slug
export function getCourseBySlug(slug: string): Promise<Course | null> {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const course = coursesData.find((c) => c.slug === slug) || null
      resolve(course)
    }, 500)
  })
}

// Get user certificates
export function getUserCertificates(): Promise<Certificate[]> {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(certificatesData)
    }, 500)
  })
}

// Get certificate by ID
export function getCertificateById(id: string): Promise<Certificate | null> {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const certificate = certificatesData.find((c) => c.id === id) || null
      resolve(certificate)
    }, 500)
  })
}

// Update user progress (store in localStorage)
export function updateUserProgress(courseId: string, videoId: string, completed: boolean): Promise<boolean> {
  return new Promise((resolve) => {
    try {
      // Get existing progress from localStorage
      const progressKey = `course_progress_${courseId}`
      const existingProgress = JSON.parse(localStorage.getItem(progressKey) || "{}")

      // Update progress
      existingProgress[videoId] = completed

      // Save back to localStorage
      localStorage.setItem(progressKey, JSON.stringify(existingProgress))

      resolve(true)
    } catch (error) {
      console.error("Error updating progress:", error)
      resolve(false)
    }
  })
}

// Get user progress for a course
export function getUserProgress(courseId: string): Promise<Record<string, boolean>> {
  return new Promise((resolve) => {
    try {
      // Get progress from localStorage
      const progressKey = `course_progress_${courseId}`
      const progress = JSON.parse(localStorage.getItem(progressKey) || "{}")

      resolve(progress)
    } catch (error) {
      console.error("Error getting progress:", error)
      resolve({})
    }
  })
}

// Generate a certificate for a completed course
export function generateCertificate(courseId: string, userName: string): Promise<Certificate> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const course = coursesData.find((c) => c.id === courseId)

      if (!course) {
        throw new Error("Course not found")
      }

      const certificate: Certificate = {
        id: `cert-${Date.now()}`,
        courseId,
        courseTitle: course.title,
        userName,
        issueDate: new Date().toISOString().split("T")[0],
      }

      // In a real app, you would save this to the database
      // For now, we'll just return it
      resolve(certificate)
    }, 500)
  })
}
