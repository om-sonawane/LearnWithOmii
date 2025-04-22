"use client"

import { useState } from "react"
import { getQuiz } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

type QuizComponentProps = {
  quizId: string
}

export default function QuizComponent({ quizId }: QuizComponentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [quiz, setQuiz] = useState<any>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const { toast } = useToast()

  const loadQuiz = async () => {
    try {
      const quizData = await getQuiz(quizId)
      setQuiz(quizData.data)
      setIsOpen(true)
      setCurrentQuestionIndex(0)
      setSelectedAnswers({})
      setQuizCompleted(false)
    } catch (error) {
      console.error("Error loading quiz:", error)
      toast({
        title: "Error",
        description: "Failed to load quiz",
        variant: "destructive",
      })
    }
  }

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: answerId,
    })
  }

  const handleNext = () => {
    if (currentQuestionIndex < quiz.attributes.questions.data.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      submitQuiz()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const submitQuiz = () => {
    setIsSubmitting(true)

    // Calculate score
    let correctAnswers = 0
    quiz.attributes.questions.data.forEach((question, index) => {
      const correctAnswerId = question.attributes.answers.data.find((answer) => answer.attributes.isCorrect)?.id

      if (selectedAnswers[index] === correctAnswerId) {
        correctAnswers++
      }
    })

    const finalScore = Math.round((correctAnswers / quiz.attributes.questions.data.length) * 100)

    setScore(finalScore)
    setQuizCompleted(true)
    setIsSubmitting(false)
  }

  const closeQuiz = () => {
    setIsOpen(false)
    setQuiz(null)
  }

  const currentQuestion = quiz?.attributes.questions.data[currentQuestionIndex]

  return (
    <>
      <Button onClick={loadQuiz}>Start Quiz</Button>

      {quiz && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{quizCompleted ? "Quiz Results" : quiz.attributes.title}</DialogTitle>
            </DialogHeader>

            {quizCompleted ? (
              <div className="py-6 text-center">
                <div className="text-4xl font-bold mb-4">{score}%</div>
                <p className="mb-4">
                  You answered {Math.round((score / 100) * quiz.attributes.questions.data.length)} out of{" "}
                  {quiz.attributes.questions.data.length} questions correctly.
                </p>
                {score >= 70 ? (
                  <div className="text-green-600 font-semibold">Congratulations! You passed the quiz.</div>
                ) : (
                  <div className="text-red-600 font-semibold">
                    You didn't pass. Try again after reviewing the course material.
                  </div>
                )}
                <DialogFooter className="mt-6">
                  <Button onClick={closeQuiz}>Close</Button>
                </DialogFooter>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">
                    Question {currentQuestionIndex + 1} of {quiz.attributes.questions.data.length}
                  </div>
                  <h3 className="text-lg font-medium mb-4">{currentQuestion?.attributes.text}</h3>

                  <RadioGroup
                    value={selectedAnswers[currentQuestionIndex]}
                    onValueChange={handleAnswerSelect}
                    className="space-y-3"
                  >
                    {currentQuestion?.attributes.answers.data.map((answer) => (
                      <div key={answer.id} className="flex items-center space-x-2 border p-3 rounded-md">
                        <RadioGroupItem id={answer.id} value={answer.id} />
                        <Label htmlFor={answer.id} className="flex-grow cursor-pointer">
                          {answer.attributes.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <DialogFooter className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                    Previous
                  </Button>
                  <Button onClick={handleNext} disabled={!selectedAnswers[currentQuestionIndex] || isSubmitting}>
                    {currentQuestionIndex < quiz.attributes.questions.data.length - 1 ? "Next" : "Submit"}
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
