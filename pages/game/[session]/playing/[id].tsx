import React, { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from '../../../../components/Layouts/gameLayout'
import Question from '../../../../components/Question'

export const Playing:FC = () => {

  const [timer, setTimer] = useState(30)
  //@ts-ignore
  
  const { query: { id, session }, push } = useRouter()
  const nextQuestion = Number.parseInt(id as string) + 1

  //TODO Pass this timer to server
  useEffect(() => {
    const time = setInterval(() => setTimer(prevTimer => prevTimer > 0 ? prevTimer -= 1 : 0), 200)
    return () => clearInterval(time)
  }, [id])

  useEffect(() => {
      // Subscribes to another players answers
      const awnsered = new EventSource(`http://localhost:5000/subscribe/${session}/question/${id}`)
      awnsered.onopen = () => console.log('subscribed to question')
      awnsered.addEventListener('anwser', () => {
        console.log('a user has anwsered')
      })

      return () => {
        awnsered.close()
      }
  }, [id, session])


        
  if(timer == 0 ) {
    console.log({ id: Number.parseInt(id as string) })
    Number.parseInt(id as string) >= 10 ?
      push({ pathname: `/game/${session}/ranking` })
      :
      push({ pathname: `/game/${session}/prepare`, query: { nextQuestion, session } }, `/game/${session}/prepare`)
  }
  
  return (
    <Layout>
      <h1> { timer } </h1>
      <Question />
    </Layout>
  )
}

export default Playing