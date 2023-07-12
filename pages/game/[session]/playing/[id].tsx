import React, { FC, useState, useEffect, useContext, useRef } from 'react'
import { useRouter } from 'next/router'

import Layout from '../../../../components/Layouts/gameLayout'
import Question, { MyQuestion } from '../../../../components/Question'

import { StateContext, StateType, defaultState } from '../../../../Context/stateProvider'
import { Question as IQuestion, GetQuestion } from '../../../../api/Question'


export const Playing:FC = () => {

  const timeRef = useRef<NodeJS.Timer>()

  const [timer, setTimer] = useState(20)
  const [state, setState] = useContext(StateContext)
  //@ts-ignore
  const [question, setQuestion] = useState<MyQuestion>({})

  let qtdAnsers = 0;
  
  const { query: { id, session }, push } = useRouter()
  const nextQuestion = Number.parseInt(id as string) + 1

  //TODO Pass this timer to server
  /* This code block is using the `useEffect` hook to set up a timer that counts down from 30 seconds. It
  sets an interval that updates the `timer` state every 200 milliseconds, decrementing it by 1 until
  it reaches 0. The `useEffect` hook also returns a cleanup function that clears the interval when the
  component unmounts or when the `id` prop changes. */
  useEffect(() => {
    GetQuestion()
    .then(({ question, requestServerTime}) => {
      setQuestion({...question, serverTime: requestServerTime})
      timeRef.current = setInterval(() => setTimer(prevTimer => prevTimer > 0 ? prevTimer -= 1 : 0), 1000)
    })
    .catch(err => {
      console.error({ err })
    })
    return () => clearInterval(timeRef.current)
  }, [])

  /* This code block is using the `useEffect` hook to subscribe to a server-sent event (SSE) stream for
  receiving answers from other players. It creates a new `EventSource` object with a URL that includes
  the `session` and `id` parameters, and sets up event listeners for the `onopen` and `anwser` events.
  The `onopen` listener logs a message to the console when the connection is established, and the
  `anwser` listener logs a message when a user has answered the question. The `useEffect` hook also
  returns a cleanup function that closes the SSE connection when the component unmounts or when the
  `id` or `session` props change. */
  useEffect(() => {
      // Subscribes to another players answers
      console.log('subscribing to question....')
      const awnsered = new EventSource(`http://localhost:5000/subscribe/${session}/question/${id}`)
      awnsered.onopen = () => console.log('subscribed to question')
      awnsered.addEventListener('anwser', () => {
        console.log('a user has anwsered')
        // every time someone awnsers add 1
        if(qtdAnsers < 4) {
          qtdAnsers++
        }
        
        setState(prevState => {
          const currentState = {} as StateType
          for(let i = 1; i <= qtdAnsers; i++) {
            currentState[i] = 'answared'
          }

          return currentState
        })
      })

      return () => {
        setState(defaultState)
        awnsered.close()
      }
  }, [id, session])
        
  /* This code block is checking if the `timer` state has reached 0. If it has, it logs an object to the
  console with the `id` prop parsed as an integer. It then checks if the `id` prop parsed as an
  integer is greater than or equal to 10. If it is, it uses the `push` function from the `useRouter`
  hook to navigate to the `/game//ranking` path. If it is not, it uses the `push` function
  to navigate to the `/game//prepare` path with a `nextQuestion` query parameter and a
  fallback URL of `/game//prepare`. */
  if(timer == 0 ) {
    Number.parseInt(id as string) >= 10 ?
      push({ pathname: `/game/${session}/ranking` })
      :
      push({ pathname: `/game/${session}/prepare`, query: { nextQuestion, session } }, `/game/${session}/prepare`)
  }
  
  return (
    <Layout>
      <h1> { timer } </h1>
      <Question question={question} />
    </Layout>
  )
}

export default Playing