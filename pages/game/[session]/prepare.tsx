import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '../../../components/Layouts/gameLayout'

export const Prepare: FC = () => {

  const { query: { nextQuestion, session }, push } = useRouter()
  const [timer, setTimer] = useState(5)


  useEffect(() => {
    // Should sync with server
    const time = setInterval(() => setTimer(prevTimer => prevTimer > 0 ? prevTimer -= 1 : 0), 1000)
    return () => clearInterval(time)
  }, [nextQuestion])

  timer == 0 && push(`/game/${session}/playing/${nextQuestion}`)

  return(
    <Layout>
      { nextQuestion == '1' ? <h1> Bom Jogo! </h1> : <h1> Prepare-se para próxima pergunta </h1>}
      <h1 style={{ color: 'white' }} > { timer } </h1>
    </Layout>
  )
}

export default Prepare