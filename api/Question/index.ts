import axios, { AxiosResponse } from 'axios'
import api from "../index";

export type Question = {
  statment: string,
  options: string[],
  answer: 1 | 2 | 3 | 4
}

interface QuestionResponse {
  question: Question,
  requestServerTime: number
}

interface IPostAnswer {
  correct: boolean,
  session: string,
  question: string,
  user_id: string
}

export const PostAnswer = (answer: IPostAnswer) => {
  return api.post('/answer', answer)
}

export const GetQuestion = async () => {
  return api.get<QuestionResponse>('/question')
    .then(({ data }) => {
      return data
    })
}