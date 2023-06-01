import React, { FC, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'

import Layout from '../../../components/Layouts/gameLayout'
import Button from '../../../components/Button'
import { StateContext } from '../../../Context/stateProvider'

import { PutSession } from '../../../api/Session'

export const Playing:FC = () => {

  const { query: { session }, push} = useRouter()
  const [_, setState] = useContext(StateContext)
  const handleClick = () => {
    if(session && typeof session == 'string') {
      PutSession(session)
        .then((session) => {
          if(session) {
            setState(() => {
              return {
                '1': 'unanswared',
                '2': 'unanswared',
                '3': 'unanswared',
                '4': 'unanswared',
              }
            })
            push(`${session}/playing`, undefined, { shallow: true })
          }
        })
        .catch(err => console.log({ err }))
    }
  }

  useEffect(() => {
    //TODO PUT request do create/joing session
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