// This file will contain the actual API integration with Strapi
// For now, we're using the dummy data from dummy-data.ts

import {
  getHomePageData as getDummyHomePageData,
  getAllCourses as getDummyCourses,
  getCourseBySlug as getDummyCourseBySlug,
  getUserCertificates as getDummyCertificates,
  getCertificateById as getDummyCertificateById,
  updateUserProgress as updateDummyProgress,
  getUserProgress as getDummyProgress,
  generateCertificate as generateDummyCertificate,
  type HomePageData,
  type Course,
  type Certificate,
} from "./dummy-data"

// Base URL for Strapi API - will be used when integrating with real API
const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
  // TODO: Implement real API fetching when Strapi is ready
  console.log(`[API Mock] Fetching from: ${path}`)
  return null
}

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the file
 * @returns {string} Full Strapi URL
 */
export function getStrapiMedia(path: string | null) {
  if (!path) return null
  if (path.startsWith("http") || path.startsWith("//")) return path
  // TODO: Return actual Strapi media URL when integrated
  return path
}

// Get home page data
export async function getHomePageData(): Promise<HomePageData> {
  // TODO: Replace with actual API call to Strapi
  // Example of how the real implementation would look:
  /*
  const data = await fetchAPI('/home', {
    populate: {
      hero: {
        populate: '*',
      },
      featuredCourses: {
        populate: {
          courses: {
            populate: '*',
          },
        },
      },
    },
  });
  
  if (!data) {
    throw new Error('Failed to fetch home page data');
  }
  
  return data.data.attributes;
  */

  return getDummyHomePageData()
}

// Get all courses
export async function getAllCourses(): Promise<Course[]> {
  // TODO: Replace with actual API call to Strapi
  /*
  const data = await fetchAPI('/courses', {
    populate: {
      thumbnail: {
        populate: '*',
      },
      categories: {
        populate: '*',
      },
    },
  });
  
  if (!data) {
    return [];
  }
  
  return data.data;
  */

  return getDummyCourses()
}

// Get course by slug
export async function getCourse(slug: string): Promise<Course | null> {
  // TODO: Replace with actual API call to Strapi
  /*
  const data = await fetchAPI(`/courses`, {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      thumbnail: {
        populate: '*',
      },
      videos: {
        populate: '*',
      },
      quizzes: {
        populate: '*',
      },
    },
  });
  
  if (!data || !data.data || data.data.length === 0) {
    return null;
  }
  
  return data.data[0];
  */

  return getDummyCourseBySlug(slug)
}

// Get user certificates
export async function getUserCertificates(): Promise<Certificate[]> {
  // TODO: Replace with actual API call to Strapi
  return getDummyCertificates()
}

// Get certificate by ID
export async function getCertificateById(id: string): Promise<Certificate | null> {
  // TODO: Replace with actual API call to Strapi
  return getDummyCertificateById(id)
}

// Update user progress
export async function updateUserProgress(
  courseId: string,
  videoId: string,
  completed: boolean,
  token?: string,
): Promise<boolean> {
  // TODO: Replace with actual API call to Strapi
  /*
  const response = await fetch(`${API_URL}/api/progress`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify({
      data: {
        courseId,
        videoId,
        completed,
      },
    }),
  });
  
  const data = await response.json();
  return !!data;
  */

  return updateDummyProgress(courseId, videoId, completed)
}

// Get user progress for a course
export async function getUserProgress(courseId: string, token?: string): Promise<Record<string, boolean>> {
  // TODO: Replace with actual API call to Strapi
  /*
  const data = await fetchAPI(`/progress`, {
    filters: {
      course: {
        id: {
          $eq: courseId,
        },
      },
    },
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  
  if (!data || !data.data) {
    return {};
  }
  
  // Transform the data into a more usable format
  const progress: Record<string, boolean> = {};
  data.data.forEach((item) => {
    progress[item.attributes.videoId] = item.attributes.completed;
  });
  
  return progress;
  */

  return getDummyProgress(courseId)
}

// Generate certificate
export async function generateCertificate(
  courseId: string,
  userName: string,
  token?: string,
): Promise<Certificate | null> {
  // TODO: Replace with actual API call to Strapi
  /*
  const response = await fetch(`${API_URL}/api/certificates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify({
      data: {
        courseId,
        userName,
      },
    }),
  });
  
  const data = await response.json();
  return data.data;
  */

  return generateDummyCertificate(courseId, userName)
}

// Get quiz by ID
export async function getQuiz(quizId: string): Promise<any> {
  console.log(`[API Mock] Fetching quiz with ID: ${quizId}`)
  return new Promise((resolve) => {
    setTimeout(() => {
      const dummyQuizData = {
        data: {
          id: quizId,
          attributes: {
            title: "Sample Quiz",
            description: "A sample quiz for testing purposes",
            questions: {
              data: [
                {
                  id: "question-1",
                  attributes: {
                    text: "What is the capital of France?",
                    answers: {
                      data: [
                        { id: "answer-1", attributes: { text: "Paris", isCorrect: true } },
                        { id: "answer-2", attributes: { text: "London", isCorrect: false } },
                        { id: "answer-3", attributes: { text: "Berlin", isCorrect: false } },
                        { id: "answer-4", attributes: { text: "Rome", isCorrect: false } },
                      ],
                    },
                  },
                },
                {
                  id: "question-2",
                  attributes: {
                    text: "What is 2 + 2?",
                    answers: {
                      data: [
                        { id: "answer-5", attributes: { text: "3", isCorrect: false } },
                        { id: "answer-6", attributes: { text: "4", isCorrect: true } },
                        { id: "answer-7", attributes: { text: "5", isCorrect: false } },
                        { id: "answer-8", attributes: { text: "6", isCorrect: false } },
                      ],
                    },
                  },
                },
              ],
            },
          },
        },
      }
      resolve(dummyQuizData)
    }, 500)
  })
}
