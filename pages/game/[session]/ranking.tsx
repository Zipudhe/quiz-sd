import React, { FC, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Layout from '../../../components/Layouts/gameLayout'
import Points from '../../../components/Points'
import { GetRanking, User } from '../../../api/Session'

type RankingData = {
  [x: string]: number
}



export const Ranking:FC = () => {
  const { query: { session } } = useRouter()
  const defaultValues = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
  }
  const [ranking, setRanking] = useState<RankingData>(defaultValues)
  const [pos, setPos] = useState(0)

  useEffect(() => {
    if(session && typeof session == 'string') {
      GetRanking(session)
        .then(data => {
          const upadatedRanking = {} as RankingData
          data.forEach(userPoints => {
            const key = Object.keys(userPoints)[0]
            upadatedRanking[key] = userPoints[key]
          })
          setRanking(upadatedRanking)
  
          data.forEach((user, index) => {
            if(Object.keys(user)[0] == me) {
              setPos(index + 1)
            }
          })
        })
    }
  }, [])


  // const me = localStorage.getItem('id')
  const me = '4ba1ce60-4a5a-48d5-b3d7-b080d206bd29'

  return (
    <Layout>
      <h1> Você ficou em {pos}° Lugar </h1>
      <Points data={ranking} />
    </Layout>
  )
}

export default Ranking