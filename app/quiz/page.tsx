import { Suspense } from "react"
import { fetchAPI } from "@/lib/api"
import QuizComponent from "@/components/quiz-component"

export const metadata = {
  title: "Quizzes | LMS Platform",
  description: "Test your knowledge with our interactive quizzes",
}

async function getQuizzes() {
  const data = await fetchAPI("/quizzes", {
    populate: {
      course: {
        populate: "*",
      },
    },
  })

  // Return empty array if API request fails
  if (!data) {
    return []
  }

  return data.data || []
}

export default async function QuizPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Quizzes</h1>

      <Suspense fallback={<div>Loading quizzes...</div>}>
        <QuizList />
      </Suspense>
    </div>
  )
}

async function QuizList() {
  const quizzes = await getQuizzes()

  if (quizzes.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <p className="text-gray-500">No quizzes available at the moment.</p>
        <p className="text-gray-500 mt-2">Check back soon for new content!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map((quiz) => (
        <div key={quiz.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{quiz.attributes.title}</h2>
            <p className="text-gray-600 mb-4">{quiz.attributes.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{quiz.attributes.questions?.data?.length || 0} questions</span>
              <QuizComponent quizId={quiz.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
