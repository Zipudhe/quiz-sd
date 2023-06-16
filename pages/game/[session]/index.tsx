import React, { FC, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import Layout from '../../../components/Layouts/gameLayout'
import Button from '../../../components/Button'
import { StateContext } from '../../../Context/stateProvider'

import { PutSession, StartSession } from '../../../api/Session'

export const Playing:FC = () => {
  const { query: { session }, push } = useRouter()
  const [_, setState] = useContext(StateContext)
  
/**
 * This function handles a click event and starts a game session, redirecting the user to the
 * preparation page.
 */
  const handleClick = () => {
    StartSession(session as string)
      .then(() => {
        push({ pathname: `/game/${session}/prepare`, query: { nextQuestion: 1, session } }, `/game/${session}/prepare`)
      })
      .catch(err => {
        console.log('failed to start session')
      })
  }
  
  /* This `useEffect` hook is setting up a subscription to an event source using the `EventSource` API.
  It first checks if the `session` query parameter is defined and of type string, and if so, creates
  a new `EventSource` instance with the URL `http://localhost:5000/subscribe/`. It then
  sets up an event listener for the `joined` event and logs the event object when it is triggered. */
  useEffect(() => {
    if(session != 'undefined' && typeof session == 'string') {
      const subscription = new EventSource(`http://localhost:5000/subscribe/${session}`)

      subscription.onopen = (res) => console.log('Opened subscribe event')
      subscription.addEventListener('joined', (e) => {
        console.log('Joined event listener: ')
        console.log(e)
      })

      const startEvent = new EventSource(`http://localhost:5000/subscribe/start/${session}`)
  
      startEvent.onopen = (res) => console.log('Opened start event')
      startEvent.addEventListener('start', (e) => {
        console.log('start event!')
        // push(`/game/${session}/playing/1`)
        startEvent.close()
      })
  
      PutSession(session)
        .then((id) => {
          console.log({ id })
        })
        .catch(err => {
          console.log('something went wrong creating session. ', err)
        })
  

      subscription.onerror = (error) => console.log({ error })

      return () => {
        console.log('should close connection')
        subscription.close()
        startEvent.close()
      }
    }

  }, [session])

  return (
    <>
      <Layout>
        <h1> Esperando próximos jogadores </h1>
        <Button 
          id='start'
          onClick={handleClick}
          > Start Quiz </Button>
      </Layout>
    </>
  )
}

export default Playing