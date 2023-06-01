import React, { FC, ReactNode, useContext } from 'react'
import { GlobalStyles } from '../../styles/index'

import Indicator from '../Indicator'
import { Wrapper } from './style'

import { StateContext } from '../../Context/stateProvider'

interface ILayout {
  children: ReactNode
}

export const Layout:FC<ILayout> = ({ children }) => {

  const [state, _] = useContext(StateContext)

  return (
    <>
      <GlobalStyles />
      <main 
        style={
          {
            width: '100vw',
            height: '100vh',
            display: 'grid',
            placeItems: 'center',
            background: '#050505',
          }
        } 
      >
        <Indicator id={'1'} style={{ position: 'fixed', bottom: '10px', right: 'calc(width - (width / 2))' }}  state={state['1']} />
        <Indicator id={'2'} style={{ position: 'fixed', left: '0px' }} state={state['2']} />
        <Indicator id={'3'} style={{ position: 'fixed', top: '10px', right: 'calc(width - (width / 2))' }} state={state['3']} />
        <Indicator id={'4'} style={{ position: 'fixed', right: '0px' }} state={state['4']} />
        <Wrapper>
          { children }
        </Wrapper>
      </main>
    </>
  )
}

export default Layout