import React, { FC, useEffect, useContext, useState } from 'react'
import { useRouter } from 'next/router'

import Layout from '../../../components/Layouts/gameLayout'
import Button from '../../../components/Button'
import ClipBoardSpan from '../../../components/ClipBoardLink'
import { StateContext, StateType, defaultState } from '../../../Context/stateProvider'

import { PutSession, StartSession } from '../../../api/Session'

export const Playing:FC = () => {
  const { query: { session }, push, locale }   = useRouter()
  const [_, setState] = useContext(StateContext)
  const [clipboardState, setClipboardState] = useState('Copiar link')


  const handleClipboard = () => {
    navigator.clipboard.writeText(`http://localhost:3000/game/${session}`)
      .then(() => setClipboardState('Link Copiado!'))
  }
  
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
      const userId = localStorage.getItem('id')
      let subscription: EventSource
      let startEvent: EventSource
      
      // creates or check session
      PutSession(session, userId)
        .then((id) => {
          localStorage.setItem('id', id)
          // subscribes do event of joining players
          subscription = new EventSource(`http://localhost:5000/subscribe/${session}/${id}`)
          
          // Provavelment vai ter que seperar os useEffects pra cada evento,
          // nesse caso terá que atualizar a inscrição para cara vez que um
          // usuario diferente se insrever no evento
          subscription.onopen = (res) => console.log('Opened subscribe event')
          subscription.addEventListener('joined', (event) => {
            const numberOfPlayers = Number.parseInt(event.data) as number

            setState(prevState => {
              const currentState = {} as StateType
              for(let i = 1; i <= numberOfPlayers; i++) {
                currentState[i] = 'connected'
              }

              return currentState
            })
          })
          
          startEvent = new EventSource(`http://localhost:5000/subscribe/start/${session}`)
          startEvent.onopen = (res) => console.log('Opened start event')
          startEvent.addEventListener('start', (e) => {
            console.log('start event!')
            startEvent.close()
          })

          subscription.onerror = (error) => console.log({ error })
        })
        .catch(err => {
          console.log('something went wrong creating session. ', err)
        })



      return () => {
        setState(defaultState)
        subscription && subscription.close()
        startEvent && startEvent.close()
      }
    }

  }, [session])

  return (
      <Layout>
        <h1> Quando estiver pronto clique no botão abaixo </h1>
        <Button 
          id='start'
          onClick={handleClick}
          > Start Quiz </Button>
          <ClipBoardSpan style={{ color: 'white', textDecoration: 'underline' }} onClick={handleClipboard} > { clipboardState } </ClipBoardSpan>
      </Layout>
  )
}

export default Playing