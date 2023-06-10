import React, { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from '../../../../components/Layouts/gameLayout'
import Question from '../../../../components/Question'

import { GetQuestion, Question as TypeQuestion } from '../../../../api/Question'

export const Playing:FC = () => {

  const [timer, setTimer] = useState(20)
  const [preparing, setPreparing] = useState(false)
  //@ts-ignore
  const [question, setQuestion] = useState<TypeQuestion>({})
  
  const { query: { id, session } , push } = useRouter()
  //@ts-ignore
  const nextQuestion = Number.parseInt(id) + 1

  useEffect(() => {
    const time = setInterval(() => setTimer(prevTimer => prevTimer > 0 ? prevTimer -= 1 : 0), 1000)
    return () => clearInterval(time)
  }, [timer])

  useEffect(() => {
    setPreparing(false)
    if(!preparing) {
      // Subscribes to another players answers
      const awnsered = new EventSource(`http://localhost:5000/subscribe/${session}/question/${id}`)
      awnsered.onopen = () => console.log('subscribed to question')
      awnsered.addEventListener('anwser', () => {
        console.log('a user has anwsered')
      })

      // get questions
      GetQuestion()
        .then((question) => {
          setQuestion(question)
          console.log(question.answer)
        })
        .catch(err => {
          console.error({ err })
        })

      return () => awnsered.close()
    }
  }, [id, preparing, session])


  if(timer == 0 && !preparing) {
    setPreparing(true)
    setTimer(10)
  }

  if(timer == 0 && preparing) {
    //@ts-ignore
    if(Number.parseInt(id) == 10) {
      push(`/game/${session}/ranking`)
    }
    console.log('Should push to next question')
    // fetch data
    push(`/game/${session}/playing/${nextQuestion}`)
  }

  if(preparing) {
    return (
      <Layout>
        <h1> { timer } </h1>
        <h1> Computando resultados... </h1>
      </Layout>
    )
  }

  if(!question) {
    return (
      <Layout>
        <h1> Loading... </h1>
        <h1> Computando resultados... </h1>
      </Layout>
    )
  }

  return (
    <Layout>
      <h1> { timer } </h1>
      <Question questao={question} />
    </Layout>
  )
}

export default Playing