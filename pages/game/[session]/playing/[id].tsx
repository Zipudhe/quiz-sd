import React, { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Layout from '../../../../components/Layouts/gameLayout'
import Game from '../../../../components/Question'

export const Playing:FC = () => {

  const [timer, setTimer] = useState(20)
  const [preparing, setPreparing] = useState(false)

  console.log({ preparing })
  
  const { query: { id, session } , push } = useRouter()
  //@ts-ignore
  const nextQuestion = Number.parseInt(id) + 1

  useEffect(() => {
    const time = setInterval(() => setTimer(prevTimer => prevTimer > 0 ? prevTimer -= 1 : 0), 1000)
    return () => clearInterval(time)
  }, [timer])

  useEffect(() => {
    setPreparing(false)
  }, [id])

  const mockedOptions = [
    {
      id: 1,
      text: "Texto da opção"
    },
    {
      id: 2,
      text: "Texto da opção"
    },
    {
      id: 3,
      text: "Texto da opção"
    },
    {
      id: 4,
      text: "Texto da opção"
    }
]
  const statement = "Texto de pergunta sobre o tópico de sistemas distribuidos que vem com algumas opções de repostas"

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

  return (
    <Layout>
      <h1> { timer } </h1>
      <Game options={mockedOptions} statement={statement} />
    </Layout>
  )
}

export default Playing