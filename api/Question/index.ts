import axios, { AxiosResponse } from 'axios'
import api from "../index";

export type Question = {
  statment: string,
  options: string[],
  answer: 1 | 2 | 3 | 4
}

interface QuestionResponse {
  question: Question
}

export const PostAnswer = (answer: string, session: string, question: string) => {
  return api.post('/answer', { session, question, answer })
}

export const GetQuestion = async () => {
  return api.get<QuestionResponse>('/question')
    .then(({ data }) => {
      return data.question
    })
    .then(question => question)
}