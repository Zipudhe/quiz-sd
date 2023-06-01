import React, { FC, ReactNode } from 'react'
import Layout from '../../../components/Layouts/gameLayout'
import Points from '../../../components/Points'


export const Ranking:FC = () => {

  const mockedData = {
    '1': 100,
    '2': 200,
    '3': 500,
    '4': 700,
  }

  return (
    <Layout>
      <h1> Você ficou em 1° Lugar </h1>
      <Points data={mockedData} />
    </Layout>
  )
}

export default Ranking