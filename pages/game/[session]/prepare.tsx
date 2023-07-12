import React, { FC, useEffect, useState, useContext } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '../../../components/Layouts/gameLayout'
import { StateContext, StateType } from '../../../Context/stateProvider'


export const Prepare: FC = () => {

  const defaultState = {
    '1': 'unanswared',
    '2': 'unanswared',
    '3': 'unanswared',
    '4': 'unanswared'
  } as StateType

  const { query: { nextQuestion, session }, push } = useRouter()
  const [_, setSate] = useContext(StateContext)
  const [timer, setTimer] = useState(5)

  // reset players indicators and push to next question
  const handleNextQuestion = () => {
    setSate(defaultState)
    // window.history.pushState(null, '', `/game/${session}/playing/${nextQuestion}`)
    push(`/game/${session}/playing/${nextQuestion}`)
    setTimer(5)
  }


  useEffect(() => {
    // Should sync with server
    const time = setInterval(() => setTimer(prevTimer => prevTimer > 0 ? prevTimer -= 1 : 0), 1000)
    return () => clearInterval(time)
  }, [])

  if(timer == 0) {
    handleNextQuestion()
  }

  return(
    <Layout>
      { nextQuestion == '1' ? <h1> Bom Jogo! </h1> : <h1> Prepare-se para próxima pergunta </h1>}
      <h1 style={{ color: 'white' }} > { timer } </h1>
    </Layout>
  )
}

export default Prepare