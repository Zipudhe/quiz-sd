import React, { FC, useContext } from 'react'

import Layout from '../../../components/Layouts/gameLayout'
import Game from '../../../components/GameScreen'

import { StateContext } from '../../../Context/stateProvider'

export const Playing:FC = () => {
  return (
    <Layout>
      <Game />
    </Layout>
  )
}

export default Playing